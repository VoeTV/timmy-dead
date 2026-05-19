export type EventType =
  | "birth"
  | "migration"
  | "feeding"
  | "threat"
  | "social"
  | "death";

export interface BiologicalSnapshot {
  /** Age in fractional years at the moment of the event */
  ageYears: number;
  /** Body length in metres */
  lengthM: number;
  /** Body weight in metric tonnes */
  weightT: number;
  /** Health on a 0–100 scale */
  health: number;
}

export interface EnvironmentSnapshot {
  /** Sea surface temperature in °C */
  waterTempC: number;
  /** Dive depth at the moment, in metres */
  diveDepthM: number;
  /** Travel speed in km/h */
  speedKmh: number;
}

export interface LifeEvent {
  id: string;
  /** ISO date string (YYYY-MM-DD) */
  date: string;
  /** Story chapter this event belongs to */
  chapter: string;
  /** Short, evocative title */
  title: string;
  /** Human-readable place name */
  location: string;
  /** [latitude, longitude] */
  coordinates: [number, number];
  type: EventType;
  /** Story-mode narrative */
  narrative: string;
  /** Scientific-mode description */
  scientific: string;
  bio: BiologicalSnapshot;
  env: EnvironmentSnapshot;
  /** Other animals or actors involved */
  interactions?: string[];
}

export interface WhaleProfile {
  name: string;
  species: string;
  scientificName: string;
  sex: "male" | "female";
  bornAt: string;
  diedAt: string;
  bornLocation: string;
  diedLocation: string;
  totalDistanceKm: number;
  tagline: string;
}

export interface LifeStory {
  whale: WhaleProfile;
  events: LifeEvent[];
}
