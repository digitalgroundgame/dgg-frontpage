// Snapshot transcribed from the 2026 midterms graphics, as of November 4, 2026.
export const midtermReach = { doors: 125253, races: 42, states: 20 };
export const midtermOutcomes = { wins: 29, leading: 5, flips: 18, states: 14 };

export const doorSources = [
  { label: "Fellowship houses", doors: 62254, detail: "2 houses", color: "bg-brand-blue" },
  { label: "Canvass events", doors: 43594, detail: "4 events", color: "bg-accent-red" },
  { label: "Regional squads", doors: 19405, detail: "4 squads", color: "bg-charcoal" },
];

export const fieldOperations = [
  { name: "Lansing house", race: "MI-7", doors: 33213, type: "Fellowship house" },
  { name: "Toledo house", race: "OH-9", doors: 29041, type: "Fellowship house" },
  { name: "Detroit event", race: "MI-10", doors: 17312, type: "Canvass event" },
  { name: "Cleveland event", race: "OH-7", doors: 12726, type: "Canvass event" },
  { name: "San Antonio event", race: "TX-35", doors: 10092, type: "Canvass event" },
  { name: "Phoenix event", race: "AZ-1", doors: 3464, type: "Canvass event" },
];

export type MidtermRaceResult = {
  race: string;
  candidate: string;
  level?: "state-local";
  flip?: boolean;
  leading?: boolean;
  organizing?: string;
  doors?: number;
};

export type MidtermResultGroup = {
  name: string;
  doors: number;
  summary: string;
  races: MidtermRaceResult[];
};

export const midtermResultGroups: MidtermResultGroup[] = [
  {
    name: "Houses + events", doors: 105848, summary: "7 wins · 1 leading",
    races: [
      { race: "MI Senate", candidate: "Abdul El-Sayed", organizing: "Lansing house + Detroit event", doors: 50525 },
      { race: "OH Senate", candidate: "Sherrod Brown", flip: true, organizing: "Toledo house + Cleveland event", doors: 41767 },
      { race: "MI-7", candidate: "William Lawrence", flip: true, organizing: "Lansing house", doors: 33213 },
      { race: "OH-9", candidate: "Marcy Kaptur", organizing: "Toledo house", doors: 29041 },
      { race: "MI-10", candidate: "Christina Hines", flip: true, organizing: "Detroit event", doors: 17312 },
      { race: "OH-7", candidate: "Brian Poindexter", flip: true, organizing: "Cleveland event + Midwest squad", doors: 12726 },
      { race: "TX-35", candidate: "Johnny Garcia", organizing: "San Antonio event", doors: 10092 },
      { race: "AZ-1", candidate: "Amish Shah", flip: true, leading: true, organizing: "Phoenix event", doors: 3464 },
    ],
  },
  {
    name: "Northeast squad", doors: 5975, summary: "12 wins · 1 leading",
    races: [
      { race: "ME Senate", candidate: "Troy Jackson", flip: true },
      { race: "NH Senate", candidate: "Chris Pappas" },
      { race: "NJ-7", candidate: "Rebecca Bennett", flip: true },
      { race: "NY-3", candidate: "Tom Suozzi" },
      { race: "NY-17", candidate: "Cait Conley", flip: true },
      { race: "NY-19", candidate: "Josh Riley" },
      { race: "PA-1", candidate: "Bob Harvie", flip: true, organizing: "Bucks County canvass", doors: 2299 },
      { race: "PA-8", candidate: "Paige Cognetti", flip: true },
      { race: "PA-10", candidate: "Janelle Stelson", flip: true },
      { race: "VA-1", candidate: "Shannon Taylor", flip: true },
      { race: "VA-2", candidate: "Elaine Luria", flip: true },
      { race: "ME Governor", candidate: "Hannah Pingree", level: "state-local" },
      { race: "ME House 98", candidate: "Kilton Webb", level: "state-local", leading: true, organizing: "DGG member" },
    ],
  },
  {
    name: "Midwest squad", doors: 4650, summary: "2 wins · + OH-7",
    races: [
      { race: "MN Senate", candidate: "Peggy Flanagan" },
      { race: "IA Governor", candidate: "Rob Sand", level: "state-local", flip: true },
    ],
  },
  {
    name: "South squad", doors: 4497, summary: "6 wins",
    races: [
      { race: "FL-25", candidate: "Jared Moskowitz" },
      { race: "TX Senate", candidate: "James Talarico", flip: true },
      { race: "NC House 105", candidate: "Ken McCool", level: "state-local", flip: true },
      { race: "TX Governor", candidate: "Gina Hinojosa", level: "state-local", flip: true },
      { race: "TX Lt. Governor", candidate: "Vikki Goodwin", level: "state-local", flip: true },
      { race: "FL Casselberry Seat 1", candidate: "Tyler Knight", level: "state-local", organizing: "DGG member" },
    ],
  },
  {
    name: "West squad", doors: 4283, summary: "2 wins · 3 leading",
    races: [
      { race: "CA-22", candidate: "Randy Villegas", flip: true },
      { race: "CA-45", candidate: "Derek Tran" },
      { race: "CO-5", candidate: "Jessica Killin", flip: true, leading: true },
      { race: "WA House 5", candidate: "Zach Hall & Lisa Callan", level: "state-local", leading: true, organizing: "Both seats" },
      { race: "WA House 12, Pos. 1", candidate: "Stacy Willoughby", level: "state-local", flip: true, leading: true },
    ],
  },
];

export const statewideRaces = [
  "Maine Senate & Governor",
  "New Hampshire Senate",
  "Minnesota Senate",
  "Alaska Senate",
  "Iowa Governor",
  "Florida Governor",
  "Texas Senate, Governor & Lt. Governor",
];
