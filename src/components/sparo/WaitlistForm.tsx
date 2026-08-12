import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Status = "idle" | "loading" | "error" | "done";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("Pilot cohort — Delhi NCR, this quarter. No spam, ever.");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim().toLowerCase();

    if (!EMAIL_RE.test(value) || value.length > 255) {
      setStatus("error");
      setMessage("That doesn't look like a valid email — check and try again.");
      return;
    }

    setStatus("loading");
    setMessage("Pilot cohort — Delhi NCR, this quarter. No spam, ever.");

    try {
      const { error } = await supabase
        .from("waitlist_signups")
        .insert({ email: value, source_page: "home" });

      if (error) {
        if (error.code === "23505") {
          setStatus("done");
          setMessage("");
          return;
        }
        setStatus("error");
        setMessage("Something went wrong on our side — please try again in a moment.");
        return;
      }
      setStatus("done");
      setMessage("");
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the server — check your connection and try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="cta-confirm" role="status" aria-live="polite">
        <div className="c-title">You're on the list.</div>
        <div className="c-sub">
          We'll reach out at {email.trim().toLowerCase()} before the pilot starts.
        </div>
      </div>
    );
  }

  return (
    <>
      <form
        className={`cta-form${status === "error" ? " errored" : ""}`}
        onSubmit={onSubmit}
        noValidate
      >
        <label htmlFor="ctaEmail" className="sr-only" style={{ display: "none" }}>
          Email address
        </label>
        <input
          type="email"
          id="ctaEmail"
          name="email"
          placeholder="you@business.in"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") {
              setStatus("idle");
              setMessage("Pilot cohort — Delhi NCR, this quarter. No spam, ever.");
            }
          }}
          aria-label="Email address"
          aria-invalid={status === "error"}
          aria-describedby="ctaNote"
          autoComplete="email"
          inputMode="email"
          required
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Get early access"}
        </button>
      </form>
      <p
        className={`cta-note${status === "error" ? " error" : ""}`}
        id="ctaNote"
        role={status === "error" ? "alert" : undefined}
      >
        {message}
      </p>
    </>
  );
}
