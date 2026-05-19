"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { LifeEvent } from "@/lib/types";
import { formatDate, eventTypeLabel } from "@/lib/utils";
import { BookOpen, Beaker, ChevronLeft, ChevronRight, Sparkle } from "./Icons";

interface EventCardProps {
  event: LifeEvent;
  index: number;
  total: number;
  mode: "story" | "scientific";
  onPrev: () => void;
  onNext: () => void;
  onToggleMode: () => void;
}

const TYPE_COLORS: Record<LifeEvent["type"], string> = {
  birth: "#1ec48c",
  migration: "#4fb6ff",
  feeding: "#ffc857",
  threat: "#ff5470",
  social: "#c084fc",
  death: "#ff7e7e"
};

export default function EventCard({
  event,
  index,
  total,
  mode,
  onPrev,
  onNext,
  onToggleMode
}: EventCardProps) {
  const accent = TYPE_COLORS[event.type];

  return (
    <div className="glass p-5 sm:p-6 relative overflow-hidden">
      {/* Accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-30 blur-3xl"
        style={{ background: accent }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="chip"
              style={{
                background: `${accent}1a`,
                borderColor: `${accent}55`,
                color: "white"
              }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: accent }}
              />
              {eventTypeLabel(event.type)}
            </span>
            <span className="chip">
              <Sparkle width={12} height={12} />
              {event.chapter}
            </span>
          </div>
          <h3 className="mt-3 font-display text-xl sm:text-2xl font-semibold leading-tight tracking-tight text-white">
            {event.title}
          </h3>
          <p className="mt-1 text-xs text-ink-300">
            {formatDate(event.date)} · {event.location}
          </p>
        </div>

        {/* Mode toggle */}
        <button
          onClick={onToggleMode}
          className="btn-ghost shrink-0"
          title="Toggle storytelling / scientific mode"
        >
          {mode === "story" ? <BookOpen /> : <Beaker />}
          <span className="hidden sm:inline">
            {mode === "story" ? "Story" : "Scientific"}
          </span>
        </button>
      </div>

      {/* Body */}
      <div className="relative mt-4 min-h-[7rem]">
        <AnimatePresence mode="wait">
          <motion.p
            key={`${event.id}-${mode}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className={
              "text-[15px] leading-relaxed " +
              (mode === "story"
                ? "font-display text-ink-100 italic"
                : "font-sans text-ink-200")
            }
          >
            {mode === "story" ? event.narrative : event.scientific}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Interactions */}
      {event.interactions && event.interactions.length > 0 && (
        <div className="mt-4">
          <div className="label mb-1.5">Encounters</div>
          <div className="flex flex-wrap gap-1.5">
            {event.interactions.map((i) => (
              <span key={i} className="chip">
                {i}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer nav */}
      <div className="mt-5 flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={index === 0}
          className="btn-ghost"
          aria-label="Previous event"
        >
          <ChevronLeft />
          <span>Previous</span>
        </button>
        <span className="text-[11px] tracking-[0.2em] uppercase text-ink-400">
          {index + 1} / {total}
        </span>
        <button
          onClick={onNext}
          disabled={index === total - 1}
          className="btn-ghost"
          aria-label="Next event"
        >
          <span>Next</span>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
