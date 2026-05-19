import type { LifeEvent } from "./types";

/** Convert ISO date string to ms since epoch. */
export function toMs(iso: string): number {
  return new Date(iso + "T00:00:00Z").getTime();
}

/** Linear interpolation between two values. */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Clamp a number into a [min, max] range. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Given a list of events sorted by date and a target ms timestamp, return:
 *   - currentIndex: index of the latest event whose date <= timestamp
 *   - nextIndex: the following event index, or null if at the end
 *   - segmentT: 0..1 progress between current and next event
 */
export function locateOnTimeline(
  events: LifeEvent[],
  ms: number
): { currentIndex: number; nextIndex: number | null; segmentT: number } {
  if (events.length === 0) {
    return { currentIndex: 0, nextIndex: null, segmentT: 0 };
  }
  const first = toMs(events[0].date);
  if (ms <= first) {
    return { currentIndex: 0, nextIndex: events.length > 1 ? 1 : null, segmentT: 0 };
  }
  const last = toMs(events[events.length - 1].date);
  if (ms >= last) {
    return { currentIndex: events.length - 1, nextIndex: null, segmentT: 0 };
  }
  for (let i = 0; i < events.length - 1; i++) {
    const a = toMs(events[i].date);
    const b = toMs(events[i + 1].date);
    if (ms >= a && ms < b) {
      const t = (ms - a) / (b - a);
      return { currentIndex: i, nextIndex: i + 1, segmentT: t };
    }
  }
  return { currentIndex: events.length - 1, nextIndex: null, segmentT: 0 };
}

/** Interpolate the whale's position along the polyline between two events. */
export function interpolatePosition(
  events: LifeEvent[],
  ms: number
): [number, number] {
  const { currentIndex, nextIndex, segmentT } = locateOnTimeline(events, ms);
  const a = events[currentIndex].coordinates;
  if (nextIndex == null) return a;
  const b = events[nextIndex].coordinates;
  return [lerp(a[0], b[0], segmentT), lerp(a[1], b[1], segmentT)];
}

/**
 * Interpolate a numeric biological/environmental value at a given moment.
 */
export function interpolateValue(
  events: LifeEvent[],
  ms: number,
  selector: (e: LifeEvent) => number
): number {
  const { currentIndex, nextIndex, segmentT } = locateOnTimeline(events, ms);
  const a = selector(events[currentIndex]);
  if (nextIndex == null) return a;
  const b = selector(events[nextIndex]);
  return lerp(a, b, segmentT);
}

/** Format a date in a friendly, premium way (e.g. "Aug 14, 2017"). */
export function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC"
  });
}

/** Format a date with month/year only ("Aug 2017"). */
export function formatMonthYear(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    timeZone: "UTC"
  });
}

/** Format a fractional-year age into "X yr Y mo". */
export function formatAge(ageYears: number): string {
  const totalMonths = Math.max(0, Math.round(ageYears * 12));
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (years === 0) return `${months} mo`;
  if (months === 0) return `${years} yr`;
  return `${years} yr ${months} mo`;
}

/** Approximate great-circle distance between two [lat, lon] points (km). */
export function haversineKm(
  a: [number, number],
  b: [number, number]
): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Total polyline distance in km. */
export function totalDistanceKm(events: LifeEvent[]): number {
  let sum = 0;
  for (let i = 1; i < events.length; i++) {
    sum += haversineKm(events[i - 1].coordinates, events[i].coordinates);
  }
  return Math.round(sum);
}

/** Friendly type label. */
export function eventTypeLabel(type: LifeEvent["type"]): string {
  const map: Record<LifeEvent["type"], string> = {
    birth: "Birth",
    migration: "Migration",
    feeding: "Feeding",
    threat: "Threat",
    social: "Social",
    death: "Death"
  };
  return map[type];
}
