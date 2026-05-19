"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { lifeStory } from "@/lib/data";
import { useLifePlayback } from "@/hooks/useLifePlayback";
import Timeline from "./Timeline";
import EventCard from "./EventCard";
import WhaleStatsPanel from "./WhaleStatsPanel";
import { Beaker, BookOpen, Download, Sparkle, Whale } from "./Icons";
import { formatDate } from "@/lib/utils";

// Leaflet must be client-only — no SSR.
const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center text-ink-300">
      <div className="flex items-center gap-3">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-ocean-400 animate-pulse" />
        <span className="text-sm">Charting Pacific…</span>
      </div>
    </div>
  )
});

export default function AppShell() {
  const { whale, events } = lifeStory;

  const playback = useLifePlayback({ events, lifetimeSeconds: 60 });
  const {
    currentMs,
    setCurrentMs,
    startMs,
    endMs,
    isPlaying,
    speed,
    setSpeed,
    toggle,
    currentIndex,
    currentEvent,
    jumpToEvent
  } = playback;

  const [mode, setMode] = useState<"story" | "scientific">("story");
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [intro, setIntro] = useState(true);

  const handlePrev = useCallback(
    () => jumpToEvent(currentIndex - 1),
    [jumpToEvent, currentIndex]
  );
  const handleNext = useCallback(
    () => jumpToEvent(currentIndex + 1),
    [jumpToEvent, currentIndex]
  );

  const exportJson = useCallback(() => {
    const blob = new Blob([JSON.stringify(lifeStory, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "timmie-life.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const lifespan = useMemo(() => {
    const years =
      (endMs - startMs) / (365.25 * 24 * 60 * 60 * 1000);
    return years.toFixed(1);
  }, [startMs, endMs]);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-ink-950/40 border-b border-white/5">
        <div className="mx-auto flex max-w-[1680px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-ocean-500/15 border border-ocean-400/30 text-ocean-200">
              <Whale width={18} height={18} />
            </div>
            <div>
              <div className="font-display text-sm font-semibold tracking-tight text-white">
                Timmie
              </div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-400">
                A life in the North Pacific
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <span className="chip">
              <Sparkle width={12} height={12} />
              {whale.scientificName}
            </span>
            <span className="chip">
              {formatDate(whale.bornAt)} → {formatDate(whale.diedAt)}
            </span>
            <span className="chip">{lifespan} yr · {whale.totalDistanceKm.toLocaleString()} km</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="btn-ghost"
              onClick={() => setShowHeatmap((v) => !v)}
              title="Toggle activity heatmap"
            >
              <span
                className={
                  "inline-block h-1.5 w-1.5 rounded-full " +
                  (showHeatmap ? "bg-amber-400" : "bg-ink-400")
                }
              />
              <span className="hidden sm:inline">Heatmap</span>
            </button>
            <button
              className="btn-ghost"
              onClick={() =>
                setMode((m) => (m === "story" ? "scientific" : "story"))
              }
              title="Toggle storytelling / scientific mode"
            >
              {mode === "story" ? <BookOpen /> : <Beaker />}
              <span className="hidden sm:inline capitalize">{mode}</span>
            </button>
            <button
              className="btn-ghost"
              onClick={exportJson}
              title="Export the full life dataset as JSON"
            >
              <Download />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main grid */}
      <main className="mx-auto w-full max-w-[1680px] flex-1 px-4 py-4 sm:px-6 sm:py-6">
        <div className="grid gap-4 lg:gap-5 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* Map area */}
          <div className="relative">
            <div className="glass-strong relative h-[58vh] min-h-[460px] lg:h-[calc(100vh-220px)] overflow-hidden">
              <MapView
                events={events}
                currentMs={currentMs}
                currentIndex={currentIndex}
                showHeatmap={showHeatmap}
                onSelectEvent={jumpToEvent}
              />

              {/* Overlay: chapter & date */}
              <div className="pointer-events-none absolute left-4 top-4 right-4 flex items-start justify-between gap-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentEvent.id}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35 }}
                    className="pointer-events-auto max-w-md"
                  >
                    <div className="glass px-3.5 py-2.5">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-ocean-200">
                        {currentEvent.chapter}
                      </div>
                      <div className="mt-0.5 font-display text-sm sm:text-base font-semibold text-white leading-tight">
                        {currentEvent.title}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="hidden sm:block pointer-events-auto">
                  <div className="glass px-3 py-2 text-right">
                    <div className="label">Coordinates</div>
                    <div className="font-mono text-xs text-ink-100">
                      {currentEvent.coordinates[0].toFixed(2)}°,{" "}
                      {currentEvent.coordinates[1].toFixed(2)}°
                    </div>
                  </div>
                </div>
              </div>

              {/* Map legend */}
              <div className="pointer-events-none absolute left-4 bottom-4 right-4 flex flex-wrap gap-1.5 justify-end">
                {[
                  ["birth", "Birth", "#1ec48c"],
                  ["migration", "Migration", "#4fb6ff"],
                  ["feeding", "Feeding", "#ffc857"],
                  ["social", "Social", "#c084fc"],
                  ["threat", "Threat", "#ff5470"],
                  ["death", "Death", "#ff7e7e"]
                ].map(([k, l, c]) => (
                  <div
                    key={k}
                    className="pointer-events-auto chip backdrop-blur"
                  >
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: c }}
                    />
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side panel */}
          <aside className="flex flex-col gap-4 lg:gap-5 lg:max-h-[calc(100vh-220px)] lg:overflow-y-auto scroll-thin pr-1">
            <WhaleStatsPanel
              whale={whale}
              events={events}
              currentMs={currentMs}
              currentEvent={currentEvent}
            />
            <EventCard
              event={currentEvent}
              index={currentIndex}
              total={events.length}
              mode={mode}
              onPrev={handlePrev}
              onNext={handleNext}
              onToggleMode={() =>
                setMode((m) => (m === "story" ? "scientific" : "story"))
              }
            />
          </aside>
        </div>

        {/* Timeline */}
        <div className="mt-4 lg:mt-5">
          <Timeline
            events={events}
            startMs={startMs}
            endMs={endMs}
            currentMs={currentMs}
            currentIndex={currentIndex}
            isPlaying={isPlaying}
            speed={speed}
            onSeek={setCurrentMs}
            onTogglePlay={toggle}
            onPrev={handlePrev}
            onNext={handleNext}
            onChangeSpeed={setSpeed}
            onSelectEvent={jumpToEvent}
          />
        </div>
      </main>

      <footer className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 py-6 text-center text-[11px] text-ink-400">
        A fictional life, drawn from real humpback science. Made with care for{" "}
        <span className="text-ink-200">{whale.name}</span>.
      </footer>

      {/* Intro overlay */}
      <AnimatePresence>
        {intro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 grid place-items-center bg-ink-950/85 backdrop-blur-sm p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="glass-strong max-w-lg p-7 text-center relative overflow-hidden"
            >
              <div
                className="pointer-events-none absolute -top-32 -right-24 h-72 w-72 rounded-full bg-ocean-500/30 blur-3xl"
                aria-hidden
              />
              <div className="relative">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-ocean-500/15 border border-ocean-400/30 text-ocean-200">
                  <Whale width={22} height={22} />
                </div>
                <h1 className="mt-4 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                  The life of Timmie
                </h1>
                <p className="mt-2 text-sm text-ink-300 leading-relaxed">
                  A {lifespan}-year journey across the North Pacific, told one
                  chapter at a time. Press play and follow him from a Maui
                  moonlit calf to a final, quiet breath in Monterey Bay.
                </p>
                <div className="mt-5 flex items-center justify-center gap-2">
                  <button className="btn-primary" onClick={() => setIntro(false)}>
                    <Sparkle width={14} height={14} />
                    Begin the journey
                  </button>
                  <button
                    className="btn-ghost"
                    onClick={() => {
                      setIntro(false);
                      setTimeout(() => toggle(), 200);
                    }}
                  >
                    Autoplay
                  </button>
                </div>
                <p className="mt-4 text-[11px] text-ink-400">
                  Tip: switch between <em>storytelling</em> and{" "}
                  <em>scientific</em> mode in the top bar.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
