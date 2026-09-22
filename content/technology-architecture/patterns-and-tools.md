---
id: cf-architecture-patterns-tools
title: Architecture patterns and tools
description: Lightweight thinking aids for architecture decisions and experiments.
type: architecture-guidance
section: technology-architecture
status: live
maturity: emerging
owner:
  profession: Architecture
version: 0.5
created: 2026-09-22
reviewed: 2026-09-22
applies_to:
  - discovery
  - define
  - experiment
  - deliver
tags:
  - architecture
related:
  - cf-template-architecture-decision
  - cf-template-options-appraisal
  - cf-template-experiment-architecture-checklist
  - cf-pattern-library
---

# Architecture patterns and tools

Reusable architecture assets accumulate here as CustomerFirst learns. They are thinking aids, not heavyweight governance forms.

## Architecture Decision Record

Use a short record when a decision is significant, costly or slow to reverse. Capture:

- Context
- Options
- Decision
- Evidence
- Consequences
- Review trigger

## Options Appraisal

Compare credible options, including **Do nothing**, against:

- outcomes
- cost
- risk
- speed
- reversibility
- sustainability
- user impact
- operational impact

## Experiment Architecture Checklist

Before a Test & Learn Experiment, ask:

- What decision are we trying to inform?
- What technical assumptions matter?
- What data is involved?
- What external systems are involved?
- What is the exposure?
- What could cause harm?
- What guardrails are required?
- What evidence are we collecting?
- What would make us stop?
- What happens if the experiment succeeds?

## Architecture Canvas

Use a one-page view to connect the outcome, decision, assumptions, domains, experiment, evidence and ownership. Create one only when it helps a team think together.

## Non-functional requirement prompts

Use prompts for accessibility, security, privacy, performance, resilience, support and sustainability where those qualities could affect the decision. Test important qualities rather than treating them as a generic checklist.

## Partner environment assessment

We work within partner organisations' existing environments, technologies, standards and processes where they enable progress and support sustainable ownership.

Where those constraints materially prevent learning or delivery, CustomerFirst may explore alternative tools, environments or approaches. Any departure should be deliberate, transparent, proportionate, understood and appropriately de-risked.

```guidance principle
Respect the partner environment without becoming trapped by it.
```

Every choice should help leave the partner more capable of owning, operating and changing the service, without unnecessary dependency on CustomerFirst, individual architects, consultancy teams, particular suppliers or unnecessarily proprietary technology.
