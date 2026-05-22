"use client";

type LocalDateProps = {
  className?: string;
  dateTime: string;
  fallback: string;
};

function formatLocalDate(dateTime: string, fallback: string): string {
  if (!dateTime) {
    return fallback;
  }

  const date = new Date(dateTime);

  if (Number.isNaN(date.getTime())) {
    return fallback;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function LocalDate({ className, dateTime, fallback }: LocalDateProps) {
  const formattedDate = formatLocalDate(dateTime, fallback);

  return (
    <time className={className} dateTime={dateTime} suppressHydrationWarning>
      {formattedDate}
    </time>
  );
}
