import { Link } from "@tanstack/react-router";

export type ArchitectureDiagramKind =
  | "four-part-model"
  | "evidence-led-delivery"
  | "domains"
  | "experiment-boundary"
  | "proportional-assurance"
  | "continuous-architecture";

const sectionLink = (slug: string, label: string) => (
  <Link
    to="/technology-architecture/$"
    params={{ _splat: slug }}
    className="architecture-diagram-link"
  >
    {label}
  </Link>
);

function Arrow() {
  return (
    <span className="architecture-arrow" aria-hidden="true">
      ↓
    </span>
  );
}

export function ArchitectureDiagram({ kind }: { kind: ArchitectureDiagramKind }) {
  if (kind === "four-part-model") {
    return (
      <figure className="architecture-figure" aria-labelledby="four-part-caption">
        <div className="architecture-four-part">
          <div className="architecture-model-item">
            <strong>{sectionLink("principles", "Principles")}</strong>
            <span>How we think</span>
          </div>
          <div className="architecture-model-item">
            <strong>{sectionLink("domains", "Domains")}</strong>
            <span>What we consider</span>
          </div>
          <div className="architecture-model-centre">The next good decision</div>
          <div className="architecture-model-item">
            <strong>{sectionLink("evidence", "Evidence")}</strong>
            <span>What we know</span>
          </div>
          <div className="architecture-model-item">
            <strong>{sectionLink("assurance", "Assurance")}</strong>
            <span>Enough confidence to act?</span>
          </div>
        </div>
        <figcaption id="four-part-caption">
          Principles, domains, evidence and assurance continuously inform one another and support
          the next good decision. This is not a sequence.
        </figcaption>
      </figure>
    );
  }

  if (kind === "evidence-led-delivery") {
    const steps = [
      "Problem",
      "Decision we need to make",
      "Assumptions",
      "Hypothesis",
      "Test & Learn Experiment",
      "Evidence",
      "Decision",
    ];
    return (
      <figure className="architecture-figure" aria-labelledby="delivery-caption">
        <ol className="architecture-flow">
          {steps.map((step, index) => (
            <li key={step}>
              <span>{step}</span>
              {index < steps.length - 1 && <Arrow />}
            </li>
          ))}
        </ol>
        <div className="architecture-outcomes" aria-label="Possible outcomes">
          {[
            "Scale",
            "Test again",
            "Modify",
            "Stop",
          ].map((outcome) => (
            <span key={outcome}>{outcome}</span>
          ))}
        </div>
        <figcaption id="delivery-caption">
          Evidence turns assumptions into a decision to scale, test again, modify or stop.
        </figcaption>
      </figure>
    );
  }

  if (kind === "domains") {
    const domains = [
      ["Service & Organisation", "What does this mean for the service?"],
      ["Information & Data", "What data does it create or depend upon?"],
      ["Applications & Integration", "What does it integrate with?"],
      ["Technology & Platforms", "What technology and platforms does it rely upon?"],
      ["Security & Trust", "How do we create trust and manage risk?"],
      ["Operations & Delivery", "Who operates, supports and ultimately owns it?"],
    ];
    return (
      <figure className="architecture-figure" aria-labelledby="domains-caption">
        <div className="architecture-domains">
          <div className="architecture-domains-centre">The whole service</div>
          {domains.map(([title, question]) => (
            <div className="architecture-domain" key={title}>
              <strong>{title}</strong>
              <span>{question}</span>
            </div>
          ))}
        </div>
        <figcaption id="domains-caption">
          Six lenses on one system — not six architecture practices or governance teams.
        </figcaption>
      </figure>
    );
  }

  if (kind === "experiment-boundary") {
    return (
      <figure className="architecture-figure" aria-labelledby="experiment-caption">
        <div className="architecture-boundary">
          <p>Test & Learn Experiment</p>
          <ul>
            <li>Explicit hypothesis</li>
            <li>Bounded scope</li>
            <li>Known exposure</li>
            <li>Appropriate guardrails</li>
            <li>Measurable evidence</li>
            <li>Stop conditions</li>
          </ul>
        </div>
        <figcaption id="experiment-caption">
          The boundary makes the intervention, exposure, evidence and conditions for stopping
          explicit.
        </figcaption>
      </figure>
    );
  }

  if (kind === "proportional-assurance") {
    const factors = ["Exposure", "Consequence", "Irreversibility", "Scale"];
    return (
      <figure className="architecture-figure" aria-labelledby="assurance-caption">
        <div className="architecture-assurance">
          <div className="architecture-assurance-factors">
            {factors.map((factor) => (
              <span key={factor}>{factor}</span>
            ))}
          </div>
          <div className="architecture-assurance-line" aria-hidden="true" />
          <strong>Assurance increases as risk and consequence increase</strong>
        </div>
        <figcaption id="assurance-caption">
          Assurance responds to exposure, consequence, irreversibility and scale — not a project
          stage.
        </figcaption>
      </figure>
    );
  }

  const steps = [
    ["Frame", "What decision matters?"],
    ["Shape", "Apply principles and domains"],
    ["Identify uncertainty", "What do we need to know?"],
    ["Test & Learn Experiment", "Generate evidence"],
    ["Learn", "What actually happened?"],
    ["Decide", "Act on the evidence"],
  ];
  return (
    <figure className="architecture-figure architecture-continuous" aria-labelledby="continuous-caption">
      <p className="architecture-continuous-label">Continuous architecture</p>
      <ol className="architecture-flow architecture-flow-horizontal">
        {steps.map(([title, detail], index) => (
          <li key={title}>
            <span>
              <strong>{title}</strong>
              <small>{detail}</small>
            </span>
            {index < steps.length - 1 && <Arrow />}
          </li>
        ))}
      </ol>
      <div className="architecture-outcomes" aria-label="Possible outcomes">
        <span>Scale</span>
        <span>Test again / Modify ↺</span>
        <span>Stop</span>
      </div>
      <figcaption id="continuous-caption">
        Testing again or modifying loops learning back into the process. Scaling can increase the
        assurance required.
      </figcaption>
    </figure>
  );
}