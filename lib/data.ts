import type { LifeStory } from "./types";
import { totalDistanceKm } from "./utils";

/**
 * Fictional but biologically plausible life of "Timmie" – a North Pacific
 * humpback whale (Megaptera novaeangliae). The route alternates between
 * Hawaiian breeding grounds and Alaskan / Bering Sea feeding grounds, with
 * occasional excursions, threats and social encounters.
 *
 * Coordinates are [latitude, longitude]. Lengths and weights follow real
 * humpback growth curves: ~4.5 m / 1 t at birth, ~14 m / 30 t at maturity.
 */
const events: LifeStory["events"] = [
  {
    id: "birth",
    date: "2003-12-18",
    chapter: "Chapter I — The First Breath",
    title: "Born under a Maui moon",
    location: "Auau Channel, Maui, Hawaii",
    coordinates: [20.79, -156.74],
    type: "birth",
    narrative:
      "Beneath a silver moon, in the warm shelter of the Auau Channel, a calf surfaces for the very first time. His mother lifts him gently with her rostrum. The first breath is shaky, the second is sure. They name him, in the way oceans name things, by the song that carries above the reef: Timmie.",
    scientific:
      "Birth recorded in primary humpback breeding grounds (20.79 N, 156.74 W). Calf mass ~1.0 t, length ~4.5 m. Sea surface temperature 25.4 C. Calf-mother pair observed in shallow lee waters typical for parturition.",
    bio: { ageYears: 0, lengthM: 4.5, weightT: 1.0, health: 92 },
    env: { waterTempC: 25.4, diveDepthM: 4, speedKmh: 1.2 },
    interactions: ["Mother (cow)", "Escort male"]
  },
  {
    id: "first-strokes",
    date: "2004-02-20",
    chapter: "Chapter I — The First Breath",
    title: "Learning to swim against the current",
    location: "Penguin Bank, Hawaii",
    coordinates: [21.03, -157.55],
    type: "social",
    narrative:
      "Two months in, Timmie can hold his breath for ten minutes. He copies his mother's tail-slaps with comical splashes. The pod hums lullabies he does not yet understand, but already remembers.",
    scientific:
      "Calf observed at Penguin Bank, exhibiting surface-active behaviour (tail-slapping, pec-slaps). Nursing rate ~40 L/day of high-fat milk. Dive duration ~10 min.",
    bio: { ageYears: 0.18, lengthM: 5.4, weightT: 1.6, health: 94 },
    env: { waterTempC: 25.0, diveDepthM: 18, speedKmh: 3.0 },
    interactions: ["Mother", "Two juvenile cousins"]
  },
  {
    id: "first-migration-start",
    date: "2004-04-05",
    chapter: "Chapter II — The Long Journey North",
    title: "Setting out across the open ocean",
    location: "Kauai Channel, Hawaii",
    coordinates: [22.10, -159.20],
    type: "migration",
    narrative:
      "The water cools. The mother turns north. Timmie does not yet know it, but he is beginning the longest journey any mammal makes — 4,800 kilometres of empty Pacific, swum on fat and instinct.",
    scientific:
      "Departure from Hawaiian breeding grounds. Heading 015 deg. Mother-calf pair joined a loose convoy of three other cow-calf pairs. Estimated transit speed 6 km/h.",
    bio: { ageYears: 0.30, lengthM: 6.1, weightT: 2.2, health: 93 },
    env: { waterTempC: 23.6, diveDepthM: 30, speedKmh: 6.2 },
    interactions: ["Mother", "Three cow-calf pairs"]
  },
  {
    id: "open-pacific",
    date: "2004-05-12",
    chapter: "Chapter II — The Long Journey North",
    title: "A small voice in a vast blue",
    location: "Mid North Pacific",
    coordinates: [33.20, -155.40],
    type: "migration",
    narrative:
      "There is no land for a thousand kilometres in any direction. Timmie surfaces. Breathes. Dives. Repeats. The ocean keeps no clocks, only currents.",
    scientific:
      "Open-ocean transit. No bathymetric features. Light scattering layer indicates poor prey density; whale subsisting on stored blubber reserves. Heart rate 14 bpm at depth.",
    bio: { ageYears: 0.40, lengthM: 6.5, weightT: 2.5, health: 90 },
    env: { waterTempC: 18.7, diveDepthM: 80, speedKmh: 7.0 },
    interactions: ["Mother"]
  },
  {
    id: "first-feeding",
    date: "2004-07-08",
    chapter: "Chapter III — Songs of Summer",
    title: "First taste of cold, alive water",
    location: "Frederick Sound, Southeast Alaska",
    coordinates: [57.15, -134.10],
    type: "feeding",
    narrative:
      "Glacial water, the colour of bottle-glass, alive with krill. Timmie watches his mother lunge into a silver shoal and copies her on the next pass. He swallows mostly water and a little wonder.",
    scientific:
      "First observed lunge-feeding event. Prey: euphausiids (Thysanoessa spp.) and juvenile herring. Bubble-net cooperative behaviour observed nearby (5-whale group). Sea temperature 11.2 C.",
    bio: { ageYears: 0.55, lengthM: 7.0, weightT: 3.1, health: 95 },
    env: { waterTempC: 11.2, diveDepthM: 45, speedKmh: 4.5 },
    interactions: ["Mother", "5-whale bubble-net cooperative"]
  },
  {
    id: "glacier-bay",
    date: "2004-08-22",
    chapter: "Chapter III — Songs of Summer",
    title: "The blue cathedral of Glacier Bay",
    location: "Glacier Bay, Alaska",
    coordinates: [58.50, -136.00],
    type: "feeding",
    narrative:
      "Ice creaks like an old wooden ship. Timmie learns that thunder can come from above, when seracs calve into the sea. He learns the taste of capelin. He learns to listen for engines, and to be still.",
    scientific:
      "Foraging in Glacier Bay (peak summer productivity). Daily intake ~140 kg. First documented avoidance of vessel noise (250 m lateral deviation from cruise-ship lane).",
    bio: { ageYears: 0.68, lengthM: 7.6, weightT: 3.8, health: 96 },
    env: { waterTempC: 9.4, diveDepthM: 60, speedKmh: 3.8 },
    interactions: ["Mother", "Resident pod (12 individuals)"]
  },
  {
    id: "return-south",
    date: "2004-11-30",
    chapter: "Chapter IV — Return to Paradise",
    title: "Following the song home",
    location: "Approaching Hawaiian waters",
    coordinates: [25.40, -157.90],
    type: "migration",
    narrative:
      "On the way back, Timmie hears it for the first time without his mother needing to lead him: the long, descending hum of the breeding chorus. He turns toward it as if pulled by a tide of his own.",
    scientific:
      "Southbound transit. Whale heard low-frequency male display song (40-200 Hz) at est. 600 km range. Course corrected by 8 deg toward acoustic source.",
    bio: { ageYears: 0.95, lengthM: 8.1, weightT: 4.3, health: 95 },
    env: { waterTempC: 20.8, diveDepthM: 50, speedKmh: 7.5 },
    interactions: ["Mother"]
  },
  {
    id: "weaning",
    date: "2005-05-04",
    chapter: "Chapter V — Independence",
    title: "The day his mother turned away",
    location: "Off Kodiak Island, Alaska",
    coordinates: [57.24, -152.43],
    type: "social",
    narrative:
      "He surfaces, expecting her. The water is empty. Somewhere ahead, she is teaching another calf to breathe. Timmie is alone for the first time in his life. He dives, and finds krill on his own.",
    scientific:
      "Weaning event documented (~17 months). Calf separated from cow during feeding aggregation. Independent foraging confirmed. Body condition index 0.84 (healthy).",
    bio: { ageYears: 1.38, lengthM: 8.9, weightT: 5.4, health: 91 },
    env: { waterTempC: 10.0, diveDepthM: 70, speedKmh: 5.0 },
    interactions: ["Mother (last sighting)"]
  },
  {
    id: "juvenile-years",
    date: "2007-07-15",
    chapter: "Chapter VI — Coming of Age",
    title: "Three summers, three thousand miles",
    location: "Aleutian Shelf",
    coordinates: [54.80, -165.20],
    type: "feeding",
    narrative:
      "Timmie has grown lean and confident. He travels with no one in particular and everyone briefly. He is learning the map only whales hold — written in salinity, magnetism, and old, old songs.",
    scientific:
      "Juvenile foraging across Aleutian shelf-break. Dive depth profile: 120 m mean, 280 m max. Estimated prey biomass density 0.42 g/m3 (high). No reproductive activity yet observed.",
    bio: { ageYears: 3.58, lengthM: 10.2, weightT: 11.0, health: 94 },
    env: { waterTempC: 8.8, diveDepthM: 120, speedKmh: 6.0 },
    interactions: ["Loose juvenile aggregation (8 individuals)"]
  },
  {
    id: "bering-storm",
    date: "2009-09-02",
    chapter: "Chapter VII — Storm-Tossed",
    title: "Twelve-metre seas in the Bering",
    location: "Southern Bering Sea",
    coordinates: [57.40, -174.50],
    type: "threat",
    narrative:
      "The wind goes vertical. Waves stack like grey walls. Timmie dives deep — and stays deep — for nearly forty minutes, the longest of his life. When he surfaces, the world has been rearranged. He keeps swimming.",
    scientific:
      "Tropical storm remnant; sustained winds 95 km/h, sea state 8. Whale executed deep avoidance dive (38 min, 310 m). Heart rate during apnea 6 bpm. No injury.",
    bio: { ageYears: 5.71, lengthM: 11.4, weightT: 18.2, health: 88 },
    env: { waterTempC: 6.5, diveDepthM: 310, speedKmh: 2.0 },
    interactions: []
  },
  {
    id: "ship-near-miss",
    date: "2011-04-18",
    chapter: "Chapter VIII — The Iron Whales",
    title: "The container ship that did not see him",
    location: "Off the Farallon Islands, California",
    coordinates: [37.70, -123.00],
    type: "threat",
    narrative:
      "He surfaces to breathe. A wall of red steel passes seven metres from his flank, dragging a wake that flips him sideways. He dives, shaken, ribs aching from the bow-pressure wave. He will avoid this latitude for two years.",
    scientific:
      "Vessel-strike near-miss with 320 m container ship (AIS confirmed). Lateral clearance ~7 m. Acoustic exposure 178 dB re 1 uPa. Behavioural avoidance for 19 months observed via fluke-ID resights.",
    bio: { ageYears: 7.34, lengthM: 12.3, weightT: 23.5, health: 80 },
    env: { waterTempC: 12.4, diveDepthM: 8, speedKmh: 4.0 },
    interactions: ["Container ship 'Maersk Halifax'"]
  },
  {
    id: "first-song",
    date: "2013-02-09",
    chapter: "Chapter IX — The Songs of Maui",
    title: "His first song",
    location: "Off Lahaina, Maui",
    coordinates: [20.86, -156.71],
    type: "social",
    narrative:
      "He hangs head-down, twenty metres beneath the surface. He sings. The song lasts twenty-three minutes. Other males a hundred kilometres away pause, listen, and answer. Timmie has become someone the ocean recognises.",
    scientific:
      "First confirmed mature male song, recorded by hydrophone array. 23-minute song cycle, 7 themes, 12 phrases. Frequency range 30 Hz - 4 kHz. Marks attainment of sexual maturity (~9 yr).",
    bio: { ageYears: 9.15, lengthM: 13.0, weightT: 28.0, health: 95 },
    env: { waterTempC: 24.6, diveDepthM: 22, speedKmh: 0.4 },
    interactions: ["3 listening males", "1 cow-calf pair"]
  },
  {
    id: "courtship",
    date: "2014-03-04",
    chapter: "Chapter X — Finding Her",
    title: "The chase that did not end in glory",
    location: "Maui Nui Basin",
    coordinates: [20.55, -156.80],
    type: "social",
    narrative:
      "Five males, one female, one battle written in bubble screens and full-body breaches. Timmie is fast but not the fastest. He returns to the deep alone, but with the memory of her singing back at him.",
    scientific:
      "Competitive group of 5 mature males (~14 m) escorting one female. Surface-active group, head-lunges and bubble streams observed. Timmie ranked secondary escort. No copulation confirmed.",
    bio: { ageYears: 10.21, lengthM: 13.3, weightT: 29.5, health: 93 },
    env: { waterTempC: 24.9, diveDepthM: 35, speedKmh: 18.0 },
    interactions: ["Female 'Aolani'", "4 rival males"]
  },
  {
    id: "bubble-net-leader",
    date: "2015-08-12",
    chapter: "Chapter XI — The Conductor",
    title: "Leading the spiral",
    location: "Chatham Strait, Alaska",
    coordinates: [57.50, -134.80],
    type: "feeding",
    narrative:
      "Twelve whales, one circle of bubbles rising like a chandelier. Timmie blows the wall. The others time the lunge to his trumpet call. Herring boil up into the trap. It is the closest a whale comes to choreography.",
    scientific:
      "Cooperative bubble-net feeding event. Timmie identified as bubble-blower and call-leader (signature 'feeding call' 500 Hz). Group size 12. Estimated yield 1.8 t herring per dive cycle.",
    bio: { ageYears: 11.65, lengthM: 13.7, weightT: 31.0, health: 96 },
    env: { waterTempC: 11.0, diveDepthM: 28, speedKmh: 9.5 },
    interactions: ["11 cooperating humpbacks"]
  },
  {
    id: "first-calf-sired",
    date: "2017-01-22",
    chapter: "Chapter XII — A Father's Song",
    title: "He hears himself in another voice",
    location: "Off the Big Island, Hawaii",
    coordinates: [19.65, -156.05],
    type: "social",
    narrative:
      "A small calf surfaces beside an old acquaintance. Her flukes carry the same notch he remembers. The calf sings a fragment Timmie has never taught anyone — and yet. He stays nearby for a week, then turns north.",
    scientific:
      "Genetic confirmation (skin biopsy) of paternity. Calf 'Kai' born to female 'Aolani' (cf. 2014 courtship). Timmie observed in non-aggressive proximity for 6 days before northbound departure.",
    bio: { ageYears: 13.10, lengthM: 14.0, weightT: 32.5, health: 95 },
    env: { waterTempC: 25.1, diveDepthM: 18, speedKmh: 2.0 },
    interactions: ["Female 'Aolani'", "Calf 'Kai'"]
  },
  {
    id: "ghost-net",
    date: "2019-06-10",
    chapter: "Chapter XIII — The Ghost Net",
    title: "Wrapped in a thing without a hand",
    location: "Off Vancouver Island, BC",
    coordinates: [49.00, -127.20],
    type: "threat",
    narrative:
      "Drifting nylon, a hundred metres of it, knotted around his right pectoral. He cannot dive deep. He cannot feed. For nineteen days he drags the ocean's garbage, growing thinner, heart slowing.",
    scientific:
      "Entanglement in derelict gillnet (est. 110 m monofilament + lead line). Right pectoral fin deeply abraded; tissue necrosis stage 2. Body condition dropped from 0.91 to 0.74. Reduced dive duration 6 min max.",
    bio: { ageYears: 15.48, lengthM: 14.2, weightT: 30.0, health: 58 },
    env: { waterTempC: 13.2, diveDepthM: 18, speedKmh: 1.8 },
    interactions: ["Derelict fishing gear"]
  },
  {
    id: "rescue",
    date: "2019-06-29",
    chapter: "Chapter XIV — The Quiet Rescue",
    title: "Hands that meant no harm",
    location: "Strait of Juan de Fuca",
    coordinates: [48.30, -124.50],
    type: "social",
    narrative:
      "A small inflatable. Two divers with curved blades. Cold human hands on his fin. He does not understand what they are, only that the weight is gone. He takes the deepest breath in nineteen days.",
    scientific:
      "Disentanglement performed by Cascadia Marine Mammal Rescue. All synthetic line removed. Wound debrided; antibiotic dart administered. Whale resighted 14 days later, condition recovering to 0.81.",
    bio: { ageYears: 15.53, lengthM: 14.2, weightT: 29.6, health: 66 },
    env: { waterTempC: 13.8, diveDepthM: 12, speedKmh: 2.4 },
    interactions: ["Rescue team (2 divers)", "Spotter vessel crew"]
  },
  {
    id: "orca-encounter",
    date: "2020-05-17",
    chapter: "Chapter XV — Defender",
    title: "Standing between the orcas and a stranger's calf",
    location: "Monterey Submarine Canyon",
    coordinates: [36.80, -122.10],
    type: "threat",
    narrative:
      "Eight transient orcas. One terrified gray-whale calf. Timmie does not know either of them. He charges anyway, trumpeting, slamming his flukes. By dusk the orcas have moved on. The calf's mother circles him once before she leaves.",
    scientific:
      "Interspecific defence behaviour. Timmie joined defending humpbacks (3 individuals) against transient (Bigg's) orca pod (8). Trumpet calls and tail-strikes recorded. No fatal predation observed.",
    bio: { ageYears: 16.41, lengthM: 14.4, weightT: 32.0, health: 87 },
    env: { waterTempC: 13.0, diveDepthM: 60, speedKmh: 14.0 },
    interactions: ["Orca pod (8)", "Gray-whale cow + calf", "2 allied humpbacks"]
  },
  {
    id: "el-nino-shift",
    date: "2021-08-04",
    chapter: "Chapter XVI — A Warmer Sea",
    title: "Where the krill used to be",
    location: "Gulf of Alaska",
    coordinates: [58.10, -147.30],
    type: "feeding",
    narrative:
      "The water is two degrees warmer than he remembers. The krill have thinned. Timmie swims further west than any summer before, hunting cold pockets like memories. He finds enough. Just.",
    scientific:
      "Marine heatwave (anomaly +1.9 C). Euphausiid biomass reduced 38 percent vs decadal mean. Whale extended foraging range 410 km westward. Body condition end-of-season 0.79 (below average).",
    bio: { ageYears: 17.63, lengthM: 14.5, weightT: 31.2, health: 84 },
    env: { waterTempC: 12.4, diveDepthM: 140, speedKmh: 5.5 },
    interactions: ["Loose feeding aggregation (4 individuals)"]
  },
  {
    id: "second-calf-sired",
    date: "2023-02-14",
    chapter: "Chapter XVII — Old Songs, New Voices",
    title: "A duet across twenty years",
    location: "Penguin Bank, Hawaii",
    coordinates: [21.05, -157.60],
    type: "social",
    narrative:
      "He sings the song his fathers sang, with one phrase that is entirely his own — a long, falling note that the young males will copy by next season without knowing where it came from. A female answers.",
    scientific:
      "Song cultural transmission documented: Timmie's signature falling glissando (180-90 Hz) adopted by 9 of 14 sampled males in 2024 season. Second confirmed paternity (calf 'Mahina', via biopsy).",
    bio: { ageYears: 19.16, lengthM: 14.6, weightT: 33.0, health: 89 },
    env: { waterTempC: 25.0, diveDepthM: 24, speedKmh: 1.0 },
    interactions: ["Female 'Lehua'", "9 listening males"]
  },
  {
    id: "old-bones",
    date: "2024-07-30",
    chapter: "Chapter XVIII — The Wise One",
    title: "The slow dives of an old whale",
    location: "Icy Strait, Alaska",
    coordinates: [58.25, -135.70],
    type: "feeding",
    narrative:
      "Younger whales follow him now. He blows the bubble-net more slowly, but the spiral is perfect. They do not know he is teaching them; he does not know either. The herring rise. The whales lunge. The water laughs.",
    scientific:
      "Senior individual (~20.6 yr). Reduced lunge frequency (-22 percent vs 2015) but improved coordination index 0.94. Apprentice juveniles (3) attached to feeding group.",
    bio: { ageYears: 20.61, lengthM: 14.7, weightT: 32.8, health: 82 },
    env: { waterTempC: 10.4, diveDepthM: 32, speedKmh: 6.5 },
    interactions: ["3 juvenile humpbacks", "Resident feeding pod"]
  },
  {
    id: "winter-storm-2025",
    date: "2025-01-12",
    chapter: "Chapter XVIII — The Wise One",
    title: "A heart that skips at depth",
    location: "Off Cabo San Lucas, Mexico",
    coordinates: [22.89, -109.91],
    type: "threat",
    narrative:
      "He goes deeper than he should and comes up slower than he should. Something in him is changing — quietly, the way large things change. He sings shorter songs and listens longer.",
    scientific:
      "Cardiac arrhythmia inferred from biologger ECG (premature ventricular contractions, 4 per hour at depth). Dive recovery time +35 percent vs baseline. Whale tracked off Baja during exploratory southern excursion.",
    bio: { ageYears: 21.07, lengthM: 14.8, weightT: 32.4, health: 71 },
    env: { waterTempC: 22.6, diveDepthM: 220, speedKmh: 3.2 },
    interactions: []
  },
  {
    id: "last-migration",
    date: "2025-05-20",
    chapter: "Chapter XIX — The Last Long Swim",
    title: "Heading north, one more time",
    location: "Off Point Conception, California",
    coordinates: [34.45, -120.95],
    type: "migration",
    narrative:
      "He passes through old waters as if reading them. He recognises the cold seam where the current turns. He does not hurry. The journey, this time, is the destination.",
    scientific:
      "Final northbound migration. Transit speed reduced to 4.1 km/h (vs lifetime mean 6.3). Repeated long surface intervals (2.3x normal). Heart-rate variability increased.",
    bio: { ageYears: 21.42, lengthM: 14.8, weightT: 32.0, health: 68 },
    env: { waterTempC: 14.8, diveDepthM: 60, speedKmh: 4.1 },
    interactions: []
  },
  {
    id: "last-feeding",
    date: "2025-09-08",
    chapter: "Chapter XIX — The Last Long Swim",
    title: "One last summer of silver fish",
    location: "Sitka Sound, Alaska",
    coordinates: [57.05, -135.35],
    type: "feeding",
    narrative:
      "The herring come in clouds. He eats less than he used to and more slowly. The young ones bring fish toward him in what almost looks like courtesy. He sleeps near the surface, his blowhole catching starlight.",
    scientific:
      "Final foraging season. Daily intake reduced to ~95 kg (vs prime ~210 kg). Resting behaviour 38 percent of activity budget. Whale frequently logged (motionless surface rest).",
    bio: { ageYears: 21.72, lengthM: 14.8, weightT: 30.8, health: 62 },
    env: { waterTempC: 9.8, diveDepthM: 30, speedKmh: 2.4 },
    interactions: ["Resident pod"]
  },
  {
    id: "final-southbound",
    date: "2026-02-04",
    chapter: "Chapter XX — The Last Song",
    title: "Turning toward warm water, slowly",
    location: "Off Cape Mendocino, California",
    coordinates: [40.45, -124.55],
    type: "migration",
    narrative:
      "He sings only at dawn now, soft phrases nobody answers. He swims south because that is what one does. The water gets warmer in the way an old room gets warmer when you remember a fire was there.",
    scientific:
      "Final southbound transit. Reduced song output (12 min/day vs lifetime mean 240). Body condition 0.61. Tag indicates persistent cardiac irregularity.",
    bio: { ageYears: 22.13, lengthM: 14.8, weightT: 29.0, health: 48 },
    env: { waterTempC: 12.0, diveDepthM: 40, speedKmh: 3.0 },
    interactions: []
  },
  {
    id: "death",
    date: "2026-04-07",
    chapter: "Chapter XX — The Last Song",
    title: "Resting in Monterey Bay",
    location: "Monterey Bay, California",
    coordinates: [36.62, -121.92],
    type: "death",
    narrative:
      "At dawn, in water the colour of pewter, Timmie surfaces, breathes once, and does not dive. The pod stays with him through the morning. By afternoon he has slipped beneath, and his great body begins its slow, generous fall — feeding the deep for decades to come.",
    scientific:
      "Cardiac failure at age 22.30. Carcass tracked via implanted tag to seafloor (depth 980 m, Monterey Submarine Canyon). Whale-fall ecosystem expected to support deep-sea fauna for 30-50 years.",
    bio: { ageYears: 22.30, lengthM: 14.8, weightT: 28.0, health: 0 },
    env: { waterTempC: 12.6, diveDepthM: 980, speedKmh: 0 },
    interactions: ["Pod (5 individuals attending)"]
  }
];

const distance = totalDistanceKm(events);

export const lifeStory: LifeStory = {
  whale: {
    name: "Timmie",
    species: "Humpback whale",
    scientificName: "Megaptera novaeangliae",
    sex: "male",
    bornAt: events[0].date,
    diedAt: events[events.length - 1].date,
    bornLocation: events[0].location,
    diedLocation: events[events.length - 1].location,
    totalDistanceKm: distance,
    tagline:
      "Twenty-two years between two oceans, written in song, krill, and salt."
  },
  events
};

export default lifeStory;
