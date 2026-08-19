"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const SEEN_COOKIE_NAME = "dgg-email-signup-popup-seen";
const SEEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
const OPEN_EMAIL_SIGNUP_EVENT = "dgg:open-email-signup-popup";

type SubmissionState = "idle" | "submitting" | "success" | "error";

function hasSeenPopup(): boolean {
  return document.cookie.split("; ").some((cookie) =>
    cookie.startsWith(`${SEEN_COOKIE_NAME}=1`),
  );
}

function rememberPopupSeen(): void {
  document.cookie = `${SEEN_COOKIE_NAME}=1; Max-Age=${SEEN_MAX_AGE_SECONDS}; Path=/; SameSite=Lax`;
}

export function openEmailSignupPopup(): void {
  window.dispatchEvent(new Event(OPEN_EMAIL_SIGNUP_EVENT));
}

export function EmailSignupPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");
  const [submissionError, setSubmissionError] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (hasSeenPopup()) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      rememberPopupSeen();
      setIsOpen(true);
    }, 10_000);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    emailInputRef.current?.focus();

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    function handleOpenRequest() {
      rememberPopupSeen();
      setIsOpen(true);
    }

    window.addEventListener(OPEN_EMAIL_SIGNUP_EVENT, handleOpenRequest);

    return () => {
      window.removeEventListener(OPEN_EMAIL_SIGNUP_EVENT, handleOpenRequest);
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState("submitting");
    setSubmissionError("");

    try {
      const response = await fetch("/api/email-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to sign you up.");
      }

      setSubmissionState("success");
    } catch (error) {
      setSubmissionError(
        error instanceof Error ? error.message : "Unknown signup error.",
      );
      setSubmissionState("error");
    }
  }

  function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  }

  return (
    <div
      aria-labelledby="email-signup-title"
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/75 p-4 sm:p-6"
      onClick={handleBackdropClick}
      role="dialog"
    >
      <div className="relative w-full max-w-lg overflow-hidden bg-near-white-blue text-charcoal shadow-2xl">
        <div className="h-3 bg-accent-red" />
        <div className="p-6 sm:p-10">
          {submissionState === "success" ? (
            <div className="pr-6">
              <p className="type-kicker text-brand-blue">You’re in.</p>
              <h2 className="type-section-title mt-3" id="email-signup-title">
                Thanks for joining us.
              </h2>
              <p className="type-small-body mt-4">
                We’ll keep you posted on practical ways to defend democracy.
              </p>
              <button
                className="type-button mt-7 cursor-pointer bg-brand-blue px-5 py-3 text-near-white-blue transition hover:bg-black"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                Continue
              </button>
            </div>
          ) : (
            <>
              <p className="type-kicker pr-6 text-brand-blue">Stay in it</p>
              <p className="type-small-body mt-4 max-w-md">
                Weekly calls to action and regional squad updates, straight to your inbox.
              </p>

              <form className="mt-6 grid w-full gap-3" onSubmit={handleSubmit}>
                <label className="type-label" htmlFor="email-signup-email">
                  Email address
                </label>
                <input
                  aria-describedby="email-signup-status"
                  autoComplete="email"
                  className="min-h-12 w-full border-2 border-brand-blue bg-white px-4 py-2 text-lg placeholder:text-charcoal/60"
                  id="email-signup-email"
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  ref={emailInputRef}
                  required
                  type="email"
                  value={email}
                />
                <button
                  className="type-button mt-2 w-full cursor-pointer bg-brand-blue px-5 py-3 text-near-white-blue transition hover:bg-black disabled:cursor-wait disabled:opacity-60"
                  disabled={submissionState === "submitting"}
                  type="submit"
                >
                  {submissionState === "submitting" ? "Joining…" : "Join the list"}
                </button>
                <p
                  aria-live="polite"
                  className="type-small-body min-h-7 text-accent-red"
                  id="email-signup-status"
                >
                  {submissionState === "error" ? submissionError : ""}
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
