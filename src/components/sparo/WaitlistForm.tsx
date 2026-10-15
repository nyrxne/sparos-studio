import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useMagnetic } from "@/lib/motion";
import { Button } from "@/components/ui/button";

type Status = "idle" | "loading" | "error" | "done";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const DEFAULT_MSG = "We'll contact you before Sparo's pilot begins. No spam, ever.";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState(DEFAULT_MSG);
  const submitRef = useMagnetic<HTMLButtonElement>(5);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    const value = email.trim().toLowerCase();

    if (!EMAIL_RE.test(value) || value.length > 255) {
      setStatus("error");
      setMessage("That doesn't look like a valid email — check and try again.");
      return;
    }

    setStatus("loading");
    setMessage(DEFAULT_MSG);

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
          We'll contact you at {email.trim().toLowerCase()} when Sparo is ready to pilot.
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
        <label htmlFor="ctaEmail" className="sr-only">
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
              setMessage(DEFAULT_MSG);
            }
          }}
          aria-label="Email address"
          aria-invalid={status === "error"}
          aria-describedby="ctaNote"
          autoComplete="email"
          inputMode="email"
          required
        />
        <Button
          className="magnetic-cta"
          variant="ghost"
          ref={submitRef}
          type="submit"
          disabled={status === "loading"}
          aria-busy={status === "loading"}
        >
          {status === "loading" && <span className="cta-spinner" aria-hidden="true" />}
          <span>{status === "loading" ? "Sending…" : "Get early access"}</span>
        </Button>
      </form>
      <p
        className={`cta-note${status === "error" ? " error" : ""}`}
        id="ctaNote"
        role={status === "error" ? "alert" : undefined}
      >
        {message}
      </p>
      <p className="privacy-note">
        We store your email only to contact you about Sparo. No third-party sharing. Request
        deletion anytime.
      </p>
    </>
  );
}
