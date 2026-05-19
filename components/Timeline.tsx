"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { LifeEvent } from "@/lib/types";
import { toMs, formatMonthYear } from "@/lib/utils";
import { Play, Pause, Skip, Rewind } from "./Icons";

interface TimelineProps {
  events: LifeEvent[];
  startMs: number;
  endMs: number;
  currentMs: number;
  currentIndex: number;
  isPlaying: boolean;
  speed: 0.5 | 1 | 2 | 4 | 8;
  onSeek: (ms: number) => void;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onChangeSpeed: (s: 0.5 | 1 | 2 | 4 | 8) => void;
  onSelectEvent: (index: number) => void;
}

const TYPE_COLORS: Record<LifeEvent["type"], string> = {
  birth: "#1ec48c",
  migration: "#4fb6ff",
  feeding: "#ffc857",
  threat: "#ff5470",
  social: "#c084fc",
  death: "#ff7e7e"
};

export default function Timeline({
  events,
  startMs,
  endMs,
  currentMs,
  currentIndex,
  isPlaying,
  speed,
  onSeek,
  onTogglePlay,
  onPrev,
  onNext,
  onChangeSpeed,
  onSelectEvent
}: TimelineProps) {
  const totalSpan = endMs - startMs;
  const progress = totalSpan === 0 ? 0 : (currentMs - startMs) / totalSpan;

  const yearTicks = useMemo(() => {
    const startYear = new Date(startMs).getUTCFullYear();
    const endYear = new Date(endMs).getUTCFullYear();
    const arr: { year: number; pct: number }[] = [];
    for (let y = startYear; y <= endYear; y++) {
      const ms = Date.UTC(y, 0, 1);
      const pct = ((ms - startMs) / totalSpan) * 100;
      if (pct >= 0 && pct <= 100) arr.push({ year: y, pct });
    }
    return arr;
  }, [startMs, endMs, totalSpan]);

  return (
    <div className="glass p-4 sm:p-5">
      {/* Controls + speed */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            className="btn-icon"
            onClick={onPrev}
            aria-label="Previous event"
            title="Previous event"
          >
            <Rewind />
          </button>
          <button
            className="btn-primary px-5"
            onClick={onTogglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause /> : <Play />}
            <span>{isPlaying ? "Pause" : "Play life"}</span>
          </button>
          <button
            className="btn-icon"
            onClick={onNext}
            aria-label="Next event"
            title="Next event"
          >
            <Skip />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="label">Speed</span>
          <div className="flex items-center gap-1 rounded-full bg-white/5 p-1 border border-white/10">
            {[0.5, 1, 2, 4, 8].map((s) => (
              <button
                key={s}
                onClick={() => onChangeSpeed(s as 0.5 | 1 | 2 | 4 | 8)}
                className={
                  "px-2.5 py-1 text-xs rounded-full transition " +
                  (speed === s
                    ? "bg-ocean-500 text-white shadow-glow"
                    : "text-ink-200 hover:bg-white/5")
                }
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Track */}
      <div className="mt-5 px-1">
        <div className="relative">
          {/* Range slider */}
          <input
            type="range"
            className="timmie-range"
            min={startMs}
            max={endMs}
            step={86_400_000}
            value={Math.round(currentMs)}
            onChange={(e) => onSeek(Number(e.target.value))}
            style={
              {
                ["--progress" as string]: `${(progress * 100).toFixed(2)}%`
              } as React.CSSProperties
            }
            aria-label="Life progress"
          />

          {/* Event markers overlay */}
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 h-6">
            {events.map((e, i) => {
              const ms = toMs(e.date);
              const pct = ((ms - startMs) / totalSpan) * 100;
              const active = i === currentIndex;
              return (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => onSelectEvent(i)}
                  className="pointer-events-auto absolute -translate-x-1/2 group"
                  style={{ left: `${pct}%`, top: 0 }}
                  aria-label={`${e.title} (${formatMonthYear(e.date)})`}
                >
                  <span
                    className="block h-3 w-3 rounded-full ring-2 ring-ink-950 transition group-hover:scale-125"
                    style={{
                      background: TYPE_COLORS[e.type],
                      boxShadow: active
                        ? "0 0 0 4px rgba(31,155,255,0.35)"
                        : undefined,
                      transform: active ? "scale(1.25)" : undefined
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Year ticks */}
        <div className="relative mt-3 h-4">
          {yearTicks.map((t, idx) => (
            <div
              key={t.year}
              className="absolute -translate-x-1/2 text-[10px] tracking-wider text-ink-400"
              style={{ left: `${t.pct}%` }}
            >
              {idx === 0 || idx === yearTicks.length - 1 || t.year % 2 === 0
                ? t.year
                : "·"}
            </div>
          ))}
        </div>
      </div>

      {/* Event chips strip */}
      <div className="mt-3 -mx-1 overflow-x-auto scroll-thin">
        <div className="flex gap-2 px-1 pb-1">
          {events.map((e, i) => {
            const active = i === currentIndex;
            return (
              <motion.button
                key={e.id}
                onClick={() => onSelectEvent(i)}
                whileHover={{ y: -2 }}
                className={
                  "shrink-0 rounded-xl border px-3 py-2 text-left transition " +
                  (active
                    ? "border-ocean-400/60 bg-ocean-500/15 text-white"
                    : "border-white/5 bg-white/[0.03] text-ink-200 hover:border-white/10 hover:bg-white/5")
                }
              >
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: TYPE_COLORS[e.type] }}
                  />
                  <span className="text-[10px] uppercase tracking-[0.16em] opacity-70">
                    {formatMonthYear(e.date)}
                  </span>
                </div>
                <div className="mt-1 text-xs font-medium leading-tight max-w-[180px] truncate">
                  {e.title}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
