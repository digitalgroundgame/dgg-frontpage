export type RegionConfig = {
  slug: string;
  name: string;
  tagline?: string;
  dispatchName?: string;
  dispatchDescription?: string;
  email: string;
  emailLabel: string;
  contentCollection?: string;
  stateIds: string[];
};

export type RegionDispatchConfig = RegionConfig & {
  dispatchName: string;
  dispatchDescription: string;
  contentCollection: string;
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

const midwestStateIds = [
  "17",
  "18",
  "19",
  "20",
  "21",
  "26",
  "27",
  "29",
  "31",
  "38",
  "39",
  "46",
  "54",
  "55",
];

const southStateIds = [
  "01",
  "05",
  "12",
  "13",
  "22",
  "28",
  "37",
  "40",
  "45",
  "47",
  "48",
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
  midwest: {
    slug: "midwest",
    name: "Midwest",
    tagline:
      '"Because it is the Midwest, no one really glitters because no one has to, it\'s more of a dull shine, like frequently used silverware." - Charles Baxter',
    email: "midwest-squad@digitalgroundgame.org",
    emailLabel: "Midwest Squad Email",
    stateIds: midwestStateIds,
  },
  south: {
    slug: "south",
    name: "South",
    email: "south-squad@digitalgroundgame.org",
    emailLabel: "South Squad Email",
    stateIds: southStateIds,
  },
} satisfies Record<string, RegionConfig>;
