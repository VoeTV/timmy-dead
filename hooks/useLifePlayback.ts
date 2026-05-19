"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { LifeEvent } from "@/lib/types";
import { toMs, locateOnTimeline } from "@/lib/utils";

type Speed = 0.5 | 1 | 2 | 4 | 8;

interface UseLifePlaybackOptions {
  events: LifeEvent[];
  /** Lifetime should play across approximately this many seconds at speed 1. */
  lifetimeSeconds?: number;
}

export interface LifePlaybackState {
  /** Current ms timestamp on the timeline. */
  currentMs: number;
  /** Set the current timestamp directly (e.g. from slider). */
  setCurrentMs: (ms: number) => void;
  /** Lifetime bounds. */
  startMs: number;
  endMs: number;
  /** 0..1 progress through life. */
  progress: number;
  /** Play / pause controls. */
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  /** Speed controls. */
  speed: Speed;
  setSpeed: (s: Speed) => void;
  /** Index of the most recent event. */
  currentIndex: number;
  currentEvent: LifeEvent;
  jumpToEvent: (index: number) => void;
  jumpToStart: () => void;
  jumpToEnd: () => void;
}

export function useLifePlayback({
  events,
  lifetimeSeconds = 60
}: UseLifePlaybackOptions): LifePlaybackState {
  const startMs = useMemo(() => toMs(events[0].date), [events]);
  const endMs = useMemo(
    () => toMs(events[events.length - 1].date),
    [events]
  );
  const totalSpan = endMs - startMs;

  const [currentMs, setCurrentMs] = useState<number>(startMs);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<Speed>(1);

  // Animation loop
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTickRef.current = null;
      return;
    }

    const tick = (now: number) => {
      if (lastTickRef.current == null) lastTickRef.current = now;
      const deltaSec = (now - lastTickRef.current) / 1000;
      lastTickRef.current = now;

      // ms of life advanced per real second at speed 1
      const lifeMsPerSec = totalSpan / lifetimeSeconds;
      setCurrentMs((prev) => {
        const next = prev + deltaSec * lifeMsPerSec * speed;
        if (next >= endMs) {
          setIsPlaying(false);
          return endMs;
        }
        return next;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTickRef.current = null;
    };
  }, [isPlaying, speed, totalSpan, endMs, lifetimeSeconds]);

  const { currentIndex } = useMemo(
    () => locateOnTimeline(events, currentMs),
    [events, currentMs]
  );
  const currentEvent = events[currentIndex];

  const play = useCallback(() => {
    // If we've reached the end, restart from beginning.
    setCurrentMs((prev) => (prev >= endMs ? startMs : prev));
    setIsPlaying(true);
  }, [endMs, startMs]);

  const pause = useCallback(() => setIsPlaying(false), []);
  const toggle = useCallback(() => {
    setIsPlaying((p) => {
      if (!p) {
        setCurrentMs((prev) => (prev >= endMs ? startMs : prev));
      }
      return !p;
    });
  }, [endMs, startMs]);

  const jumpToEvent = useCallback(
    (index: number) => {
      const safe = Math.max(0, Math.min(events.length - 1, index));
      setCurrentMs(toMs(events[safe].date));
    },
    [events]
  );

  const jumpToStart = useCallback(() => setCurrentMs(startMs), [startMs]);
  const jumpToEnd = useCallback(() => setCurrentMs(endMs), [endMs]);

  return {
    currentMs,
    setCurrentMs,
    startMs,
    endMs,
    progress: totalSpan === 0 ? 0 : (currentMs - startMs) / totalSpan,
    isPlaying,
    play,
    pause,
    toggle,
    speed,
    setSpeed,
    currentIndex,
    currentEvent,
    jumpToEvent,
    jumpToStart,
    jumpToEnd
  };
}
