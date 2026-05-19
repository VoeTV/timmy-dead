"use client";

import { motion } from "framer-motion";
import type { LifeEvent, WhaleProfile } from "@/lib/types";
import {
  formatAge,
  formatDate,
  interpolateValue
} from "@/lib/utils";
import {
  Compass,
  Drop,
  Heart,
  Pin,
  Ruler,
  Speed,
  Thermo,
  Weight,
  Whale
} from "./Icons";

interface WhaleStatsPanelProps {
  whale: WhaleProfile;
  events: LifeEvent[];
  currentMs: number;
  currentEvent: LifeEvent;
}

function Stat({
  icon,
  label,
  value,
  unit,
  accent
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit?: string;
  accent?: string;
}) {
  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/5 p-3">
      <div className="flex items-center gap-2 text-ink-300">
        <span style={{ color: accent }} className="opacity-90">
          {icon}
        </span>
        <span className="label">{label}</span>
      </div>
      <div className="mt-1.5 flex items-baseline gap-1">
        <span className="stat-value">{value}</span>
        {unit && <span className="text-xs text-ink-300">{unit}</span>}
      </div>
    </div>
  );
}

export default function WhaleStatsPanel({
  whale,
  events,
  currentMs,
  currentEvent
}: WhaleStatsPanelProps) {
  const age = interpolateValue(events, currentMs, (e) => e.bio.ageYears);
  const length = interpolateValue(events, currentMs, (e) => e.bio.lengthM);
  const weight = interpolateValue(events, currentMs, (e) => e.bio.weightT);
  const health = interpolateValue(events, currentMs, (e) => e.bio.health);
  const temp = interpolateValue(events, currentMs, (e) => e.env.waterTempC);
  const depth = interpolateValue(events, currentMs, (e) => e.env.diveDepthM);
  const speed = interpolateValue(events, currentMs, (e) => e.env.speedKmh);

  const healthColor =
    health > 80 ? "#1ec48c" : health > 55 ? "#ffc857" : "#ff5470";

  return (
    <motion.div
      layout
      className="glass p-5 flex flex-col gap-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-ocean-300">
          <Whale width={20} height={20} />
          <span className="label">Subject</span>
        </div>
        <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-white">
          {whale.name}
        </h2>
        <p className="text-sm text-ink-300">
          {whale.species} · <span className="italic">{whale.scientificName}</span>
        </p>
        <p className="mt-2 text-xs text-ink-400 leading-relaxed">
          {whale.tagline}
        </p>
      </div>

      <div className="divider" />

      {/* Biological stats */}
      <div>
        <div className="label mb-2">Biological signature</div>
        <div className="grid grid-cols-2 gap-2.5">
          <Stat
            icon={<Compass />}
            label="Age"
            value={formatAge(age)}
            accent="#4fb6ff"
          />
          <Stat
            icon={<Ruler />}
            label="Length"
            value={length.toFixed(1)}
            unit="m"
            accent="#4fb6ff"
          />
          <Stat
            icon={<Weight />}
            label="Weight"
            value={weight.toFixed(1)}
            unit="t"
            accent="#4fb6ff"
          />
          <Stat
            icon={<Heart />}
            label="Health"
            value={Math.round(health).toString()}
            unit="/ 100"
            accent={healthColor}
          />
        </div>

        {/* Health bar */}
        <div className="mt-3">
          <div className="flex justify-between text-[10px] uppercase tracking-[0.18em] text-ink-400">
            <span>Vitals</span>
            <span style={{ color: healthColor }}>
              {health > 80
                ? "Strong"
                : health > 55
                  ? "Strained"
                  : health > 5
                    ? "Critical"
                    : "—"}
            </span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full"
              style={{ background: healthColor }}
              animate={{ width: `${Math.max(health, 0)}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* Environment */}
      <div>
        <div className="label mb-2">Environment</div>
        <div className="grid grid-cols-3 gap-2.5">
          <Stat
            icon={<Thermo />}
            label="Water"
            value={temp.toFixed(1)}
            unit="°C"
            accent="#ffc857"
          />
          <Stat
            icon={<Drop />}
            label="Depth"
            value={Math.round(depth).toString()}
            unit="m"
            accent="#1f9bff"
          />
          <Stat
            icon={<Speed />}
            label="Speed"
            value={speed.toFixed(1)}
            unit="km/h"
            accent="#46d6a8"
          />
        </div>
      </div>

      <div className="divider" />

      {/* Now */}
      <div>
        <div className="label mb-2">Now</div>
        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
          <div className="flex items-center gap-2 text-ink-300">
            <Pin />
            <span className="text-xs">{currentEvent.location}</span>
          </div>
          <div className="mt-1 text-xs text-ink-400">
            {formatDate(currentEvent.date)} · {currentEvent.coordinates[0].toFixed(2)}°,{" "}
            {currentEvent.coordinates[1].toFixed(2)}°
          </div>
        </div>
      </div>
    </motion.div>
  );
}
