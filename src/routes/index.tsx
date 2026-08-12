import { createFileRoute } from "@tanstack/react-router";

import { Calculator } from "@/components/sparo/Calculator";
import { DemoTabs } from "@/components/sparo/DemoTabs";
import { Reveal } from "@/components/sparo/Reveal";
import { StickyNav } from "@/components/sparo/StickyNav";
import { Ticker } from "@/components/sparo/Ticker";
import { WaitlistForm } from "@/components/sparo/WaitlistForm";

const TITLE = "Sparo — Know where your money is trapped";
const DESCRIPTION =
  "Sparo is an AI cash-flow risk system for Indian MSMEs: it reads invoices, payments and inventory and shows owners exactly where cash is stuck, before it becomes a crisis.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="sparo" id="top">
      <a className="skip-link" href="#problem">
        Skip to content
      </a>
      <div className="thread" aria-hidden="true" />
      <StickyNav />

      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-top">
            <span>Sparo — cash-flow risk, unified</span>
            <span>Prototype for AI Pitchathon</span>
          </div>
          <h1>
            Know where your money
            <br />
            is <em>trapped</em>.
          </h1>
          <div className="hero-sub">
            <p className="lede">
              One AI system that reads a small business's invoices, payments and inventory — and
              tells the owner where cash is stuck, before it becomes a crisis.
            </p>
          </div>
          <Ticker />
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem">
        <Reveal>
          <span className="eyebrow">The problem</span>
          <h2>
            Small businesses don't fail from low sales.
            <br />
            They fail from cash they can't see.
          </h2>
          <p className="lede">
            Capital gets trapped in two places at once, and no single tool shows both.
          </p>
          <div className="leaks">
            <div className="leak">
              <span className="num">LEAK 01</span>
              <h3>Payments, delayed</h3>
              <p>
                Large retailers pay small suppliers late — sometimes structurally, every cycle. The
                supplier's own bills don't wait.
              </p>
            </div>
            <div className="leak">
              <span className="num">LEAK 02</span>
              <h3>Inventory, dead</h3>
              <p>
                Stock that stops selling still locks up capital, storage, and attention — quietly,
                until it's a write-off.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* REFRAME */}
      <section className="reframe">
        <Reveal>
          <p className="eyebrow" style={{ justifyContent: "center" }}>
            The reframe
          </p>
          <p className="big">
            It's not <span className="strike">an invoices problem</span> or{" "}
            <span className="strike">an inventory problem</span>.<br />
            It's a <span className="gold">cash visibility</span> problem.
          </p>
        </Reveal>
      </section>

      {/* HOW IT WORKS */}
      <section id="how">
        <Reveal>
          <span className="eyebrow">How Sparo works</span>
          <h2>Two predictions, one ranked answer.</h2>
          <div className="steps">
            <div className="step">
              <div className="stamp">predict</div>
              <div>
                <h3>Delay-risk &amp; dead-stock models</h3>
                <p>
                  Learns each buyer's real payment pattern and each SKU's real velocity decay — not
                  fixed thresholds, but patterns that differ business to business.
                </p>
                <span className="tag ai">Genuinely AI</span>
              </div>
            </div>
            <div className="step">
              <div className="stamp">match</div>
              <div>
                <h3>PO ↔ delivery ↔ invoice ↔ payment reconciliation</h3>
                <p>
                  Straightforward deterministic matching catches missing or mismatched records — no
                  model needed, and we say so.
                </p>
                <span className="tag rules">Ordinary software</span>
              </div>
            </div>
            <div className="step">
              <div className="stamp">fuse</div>
              <div>
                <h3>One cash-at-risk score</h3>
                <p>
                  Every flagged invoice and SKU is ranked by expected ₹ impact × confidence, into a
                  single ordered action list.
                </p>
                <span className="tag ai">Genuinely AI</span>
              </div>
            </div>
            <div className="step">
              <div className="stamp">explain</div>
              <div>
                <h3>Plain-language reasoning</h3>
                <p>
                  Every flag ships with the top factors behind it, so the owner can trust — and
                  challenge — what the model surfaces.
                </p>
                <span className="tag rules">Ordinary software</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* TRY IT */}
      <section id="try">
        <Reveal>
          <span className="eyebrow">Try it</span>
          <h2>Put your own numbers in.</h2>
          <p className="lede">
            Move the sliders toward your own business, then check which action actually protects the
            most cash.
          </p>
          <Calculator />
        </Reveal>
      </section>

      {/* DEMO */}
      <section id="demo">
        <Reveal>
          <span className="eyebrow">Live demo — Meridian Textiles</span>
          <h2>A fictional supplier. A real amount of trapped cash.</h2>
          <p className="lede">
            A small Delhi NCR textile supplier selling to three retail chains, while running its own
            counter. Same data, two views.
          </p>
          <DemoTabs />
        </Reveal>
      </section>

      {/* GOVERNMENT SUPPORT */}
      <section>
        <Reveal>
          <span className="eyebrow">Government alignment</span>
          <h2>Built for a moment India's policy is already pushing toward.</h2>
          <div className="stamp-block">
            <div className="stamp">TReDS</div>
            <div>
              <h3>Sparo tells you which invoice to push first</h3>
              <p>
                TReDS, the RBI-regulated platform that lets MSMEs discount unpaid invoices for early
                cash, was just made mandatory for all Central Public Sector Enterprises paying MSME
                suppliers, under a June 2026 government notification. Sparo doesn't compete with
                TReDS — it decides which invoices are worth discounting first, based on predicted
                delay risk.
              </p>
              <div className="meta">
                CPSE mandate notified 30 June 2026 · RBI Master Direction overhaul 23 June 2026
              </div>
            </div>
          </div>
          <div className="stamp-block">
            <div className="stamp">Udyam</div>
            <div>
              <h3>Onboarding rides existing infrastructure</h3>
              <p>
                Over 8.7 crore enterprises are already registered on India's Udyam portal. Sparo's
                onboarding checks Udyam status directly, so eligibility and identity verification
                piggyback on infrastructure that already exists — not a new registration burden.
              </p>
            </div>
          </div>
          <div className="stamp-block">
            <div className="stamp">Credit</div>
            <div>
              <h3>A natural partner for credit-guarantee schemes</h3>
              <p>
                Recent reforms extend credit guarantee coverage (via CGTMSE) to receivables
                financing. A cash-risk score built for exactly this purpose is a plausible input for
                lenders and guarantee schemes assessing an MSME's real liquidity position — a
                partnership path, not a built feature today.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ENVIRONMENTAL IMPACT */}
      <section>
        <Reveal>
          <span className="eyebrow">Environmental impact</span>
          <h2>Less overproduction. Less panic liquidation.</h2>
          <div className="stamp-block">
            <div className="stamp">Waste</div>
            <div>
              <h3>Dead stock is waste before it's a write-off</h3>
              <p>
                Textiles are among the most waste-intensive categories in retail. Catching a
                slow-moving SKU 8 weeks earlier — while it's still sellable at a modest discount —
                means less product ending in landfill or destroyed inventory, and less fabric
                ordered on top of stock that never should have been reordered.
              </p>
            </div>
          </div>
          <div className="stamp-block">
            <div className="stamp">Credit</div>
            <div>
              <h3>Fewer distress decisions</h3>
              <p>
                Owners in a cash crunch often over-order to chase short-term revenue, or dump
                inventory at a loss to raise emergency cash — both wasteful. Earlier visibility
                replaces panic decisions with planned ones.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SCALABILITY (light) */}
      <section className="light">
        <Reveal>
          <span className="eyebrow">Scalability &amp; future scope</span>
          <h2>Small footprint today. Wide surface tomorrow.</h2>
          <div className="grid3">
            <div className="card">
              <span className="k">Scale — market</span>
              <h4>8.7 crore+ MSMEs</h4>
              <p>
                Currently registered on Udyam alone — the fusion logic (predict → match → fuse →
                explain) generalizes across sectors, not just textiles.
              </p>
            </div>
            <div className="card">
              <span className="k">Scale — distribution</span>
              <h4>Through CAs, not one owner at a time</h4>
              <p>
                One accountant or bookkeeping firm already serves dozens of small businesses — a
                single relationship brings a whole client base onto Sparo.
              </p>
            </div>
            <div className="card">
              <span className="k">Scale — architecture</span>
              <h4>API-first from day one</h4>
              <p>
                Each business's model runs independently on its own data — horizontal scaling adds
                businesses without retraining a shared model.
              </p>
            </div>
            <div className="card">
              <span className="k">Future — automation</span>
              <h4>Suggested actions become one-click actions</h4>
              <p>
                From "chase this invoice" to a drafted reminder or a direct TReDS discounting
                request, with the owner still approving every step.
              </p>
            </div>
            <div className="card">
              <span className="k">Future — reach</span>
              <h4>Regional language &amp; WhatsApp alerts</h4>
              <p>
                Cash-risk flags delivered where MSME owners already are, not inside a dashboard they
                have to remember to open.
              </p>
            </div>
            <div className="card">
              <span className="k">Future — verticals</span>
              <h4>Beyond textiles</h4>
              <p>
                Electronics distributors, F&amp;B suppliers, hardware traders — any business with
                receivables and inventory shares the same fusion logic.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* PRICING */}
      <section id="pricing">
        <Reveal>
          <span className="eyebrow">Pricing — illustrative</span>
          <h2>Priced like a decision, not a dashboard.</h2>
          <p className="lede">
            Launch pricing to validate with pilot customers — not a claimed market rate.
          </p>
          <div className="pricing-grid">
            <div className="price-card" tabIndex={0}>
              <span className="p-name">Starter</span>
              <div className="p-price">₹999</div>
              <div className="p-unit">
                per month
                <br />
                up to 50 invoices, 100 SKUs
              </div>
              <ul>
                <li>Cash Trap Radar, weekly digest</li>
                <li>Payment-risk &amp; dead-stock scoring</li>
                <li>1 user seat</li>
              </ul>
            </div>
            <div className="price-card featured" tabIndex={0}>
              <span className="p-badge">Most common at pilot stage</span>
              <span className="p-name">Growth</span>
              <div className="p-price">₹2,999</div>
              <div className="p-unit">
                per month
                <br />
                up to 300 invoices, 500 SKUs
              </div>
              <ul>
                <li>Everything in Starter</li>
                <li>WhatsApp cash-risk alerts</li>
                <li>AI-drafted payment reminders</li>
                <li>Action simulation, this-if-that</li>
              </ul>
            </div>
            <div className="price-card" tabIndex={0}>
              <span className="p-name">Multi-location</span>
              <div className="p-price">₹7,999</div>
              <div className="p-unit">
                per month
                <br />
                unlimited invoices &amp; SKUs
              </div>
              <ul>
                <li>Everything in Growth</li>
                <li>Multi-branch consolidation</li>
                <li>Accountant / CA seat included</li>
                <li>Priority support</li>
              </ul>
            </div>
          </div>
          <p className="pricing-note">
            Assumption, not a verified figure — priced as a fraction of what one recovered invoice
            or one discounted SKU is worth, not per-seat SaaS logic. To be tested with real pilot
            customers.
          </p>
        </Reveal>
      </section>

      {/* CLOSE */}
      <section className="close">
        <Reveal>
          <h2>Sparo doesn't just track a business's money.</h2>
          <p className="tag-line">It tells you where it's hiding — before it's gone.</p>
          <WaitlistForm />
          <div className="team-strip">
            <span>Team of 3 · AI Pitchathon 2026</span>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
