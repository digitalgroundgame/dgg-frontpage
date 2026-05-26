export type RegionConfig = {
  slug: string;
  name: string;
  dispatchName: string;
  dispatchDescription: string;
  email: string;
  emailLabel: string;
  contentCollection: string;
  stateIds: string[];
};

const westStateIds = [
  "02",
  "04",
  "06",
  "08",
  "15",
  "16",
  "30",
  "32",
  "35",
  "41",
  "49",
  "53",
  "56",
];

const northeastStateIds = [
  "09",
  "10",
  "11",
  "23",
  "24",
  "25",
  "33",
  "34",
  "36",
  "42",
  "44",
  "50",
  "51",
];

export const regions = {
  west: {
    slug: "west",
    name: "West",
    dispatchName: "West Region Dispatch",
    dispatchDescription:
      "A running blog for regional updates and practical ways to get involved.",
    email: "west-squad@digitalgroundgame.org",
    emailLabel: "West Squad Email",
    contentCollection: "regions/west/news",
    stateIds: westStateIds,
  },
  northeast: {
    slug: "northeast",
    name: "Northeast",
    dispatchName: "Northeast News",
    dispatchDescription:
      "A running blog for regional updates and practical ways to get involved.",
    email: "northeast-squad@digitalgroundgame.org",
    emailLabel: "Northeast Squad Email",
    contentCollection: "regions/northeast/news",
    stateIds: northeastStateIds,
  },
} satisfies Record<string, RegionConfig>;
