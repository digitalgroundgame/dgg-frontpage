import "server-only";

import { unstable_cache } from "next/cache";

const ACTION_NETWORK_API_ORIGIN = "https://actionnetwork.org";
const ACTION_NETWORK_API_PATH = "/api/v2/";
const MAX_COLLECTION_PAGES = 100;
const PERSON_FETCH_CONCURRENCY = 4;
const REPORT_STALE_AFTER_MS = 24 * 60 * 60 * 1_000;
const SUSTAINER_CACHE_SECONDS = 24 * 60 * 60;
const TEST_TIER_IV_SUSTAINER_NAMES = [
  "Test Sustainer One",
  "Test Sustainer Two",
  "Test Sustainer Three",
] as const;

type ActionNetworkLink = {
  href?: unknown;
};

type ActionNetworkItem = {
  _links?: {
    "osdi:person"?: ActionNetworkLink;
  };
};

type ActionNetworkItemsResponse = {
  _embedded?: {
    "osdi:items"?: unknown;
  };
  _links?: {
    next?: ActionNetworkLink;
  };
};

type ActionNetworkListResponse = {
  modified_date?: unknown;
  _links?: {
    "osdi:items"?: ActionNetworkLink;
  };
};

type ActionNetworkPerson = {
  custom_fields?: unknown;
};

function isActionNetworkApiUrl(value: unknown): value is string {
  if (typeof value !== "string") {
    return false;
  }

  try {
    const url = new URL(value);

    return (
      url.origin === ACTION_NETWORK_API_ORIGIN &&
      url.pathname.startsWith(ACTION_NETWORK_API_PATH)
    );
  } catch {
    return false;
  }
}

async function fetchActionNetworkJson<T>(url: string, apiKey: string): Promise<T> {
  if (!isActionNetworkApiUrl(url)) {
    throw new Error("Action Network returned an unexpected API URL.");
  }

  const response = await fetch(url, {
    headers: {
      Accept: "application/hal+json",
      "OSDI-API-Token": apiKey,
    },
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Action Network request failed with status ${response.status}.`);
  }

  return (await response.json()) as T;
}

async function fetchReport(
  apiKey: string,
  listId: string,
): Promise<ActionNetworkListResponse> {
  const reportUrl =
    `${ACTION_NETWORK_API_ORIGIN}${ACTION_NETWORK_API_PATH}lists/${listId}`;

  return fetchActionNetworkJson<ActionNetworkListResponse>(reportUrl, apiKey);
}

function warnIfReportIsStale(modifiedDate: unknown): void {
  if (typeof modifiedDate !== "string") {
    console.warn("The Action Network Tier IV report has no modified_date.");
    return;
  }

  const modifiedAt = Date.parse(modifiedDate);

  if (!Number.isFinite(modifiedAt)) {
    console.warn("The Action Network Tier IV report has an invalid modified_date.");
    return;
  }

  if (Date.now() - modifiedAt > REPORT_STALE_AFTER_MS) {
    console.warn(
      `The Action Network Tier IV report is stale (last updated ${modifiedDate}). ` +
        "Action Network lists are read-only through the API; rerun the report in Action Network.",
    );
  }
}

async function fetchPersonUrls(apiKey: string, itemsUrl: string): Promise<string[]> {
  let nextUrl: string | undefined = itemsUrl;
  const personUrls = new Set<string>();
  const visitedPages = new Set<string>();

  while (nextUrl) {
    if (visitedPages.size >= MAX_COLLECTION_PAGES || visitedPages.has(nextUrl)) {
      throw new Error("Action Network list pagination did not terminate safely.");
    }

    visitedPages.add(nextUrl);

    const page: ActionNetworkItemsResponse =
      await fetchActionNetworkJson<ActionNetworkItemsResponse>(nextUrl, apiKey);
    const items = page._embedded?.["osdi:items"];

    if (Array.isArray(items)) {
      for (const item of items as ActionNetworkItem[]) {
        const personUrl = item._links?.["osdi:person"]?.href;

        if (isActionNetworkApiUrl(personUrl)) {
          personUrls.add(personUrl);
        }
      }
    }

    const candidateNextUrl = page._links?.next?.href;
    nextUrl = isActionNetworkApiUrl(candidateNextUrl)
      ? candidateNextUrl
      : undefined;
  }

  return [...personUrls];
}

function getWebsiteCreditName(person: ActionNetworkPerson): string | null {
  if (!person.custom_fields || typeof person.custom_fields !== "object") {
    return null;
  }

  const customFields = person.custom_fields as Record<string, unknown>;
  const websiteCreditName = customFields.Website_Credit_Name;

  if (typeof websiteCreditName !== "string") {
    return null;
  }

  return websiteCreditName.trim() || null;
}

async function fetchNamesInBatches(
  personUrls: string[],
  apiKey: string,
): Promise<string[]> {
  const names: string[] = [];

  for (let index = 0; index < personUrls.length; index += PERSON_FETCH_CONCURRENCY) {
    const batch = personUrls.slice(index, index + PERSON_FETCH_CONCURRENCY);
    const people = await Promise.all(
      batch.map((url) => fetchActionNetworkJson<ActionNetworkPerson>(url, apiKey)),
    );

    for (const person of people) {
      const name = getWebsiteCreditName(person);

      if (name) {
        names.push(name);
      }
    }
  }

  return names;
}

const getCachedTierIvSustainerNames = unstable_cache(
  async (): Promise<string[]> => {
    const apiKey = process.env.ACTION_NETWORK_API_KEY?.trim();
    const listId = process.env.ACTION_NETWORK_TIER_IV_LIST_ID?.trim();

    if (!apiKey || !listId) {
      return [];
    }

    const report = await fetchReport(apiKey, listId);
    const itemsUrl = report._links?.["osdi:items"]?.href;

    if (!isActionNetworkApiUrl(itemsUrl)) {
      throw new Error("The Action Network report has no valid items URL.");
    }

    warnIfReportIsStale(report.modified_date);

    const personUrls = await fetchPersonUrls(apiKey, itemsUrl);
    const names = await fetchNamesInBatches(personUrls, apiKey);
    const uniqueNames = new Map<string, string>();

    for (const name of names) {
      uniqueNames.set(name.toLocaleLowerCase("en-US"), name);
    }

    return [...uniqueNames.values()].sort((left, right) =>
      left.localeCompare(right, "en-US"),
    );
  },
  ["action-network-tier-iv-sustainer-names"],
  { revalidate: SUSTAINER_CACHE_SECONDS },
);

export async function getTierIvSustainerNames(): Promise<string[]> {
  const apiKey = process.env.ACTION_NETWORK_API_KEY?.trim();
  const listId = process.env.ACTION_NETWORK_TIER_IV_LIST_ID?.trim();

  if (!apiKey || !listId) {
    return [...TEST_TIER_IV_SUSTAINER_NAMES];
  }

  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      listId,
    )
  ) {
    console.error("ACTION_NETWORK_TIER_IV_LIST_ID must be a UUID.");
    return [];
  }

  try {
    return await getCachedTierIvSustainerNames();
  } catch (error) {
    console.error("Unable to load Tier IV sustainers from Action Network.", error);
    return [];
  }
}
