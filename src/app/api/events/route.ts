import { loadPublicCalendar } from "@/lib/events-calendar";
import { NextResponse } from "next/server";

const maximumRangeMs = 62 * 24 * 60 * 60 * 1000;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const start = new Date(searchParams.get("start") || "");
  const end = new Date(searchParams.get("end") || "");

  if (
    Number.isNaN(start.valueOf()) ||
    Number.isNaN(end.valueOf()) ||
    end <= start ||
    end.valueOf() - start.valueOf() > maximumRangeMs
  ) {
    return NextResponse.json(
      { error: "A valid calendar range of 62 days or fewer is required." },
      { status: 400 },
    );
  }

  try {
    return NextResponse.json({
      events: await loadPublicCalendar(start, end),
    });
  } catch (error) {
    console.error("Unable to load public events calendar", error);
    return NextResponse.json(
      { error: "The events calendar is temporarily unavailable." },
      { status: 502 },
    );
  }
}
