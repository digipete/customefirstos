---
id: cf-architecture-test-learn
title: Architecture in a Test & Learn Experiment
description: Use bounded interventions to turn architectural uncertainty into evidence.
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
  - cf-test-learn
  - cf-template-experiment
  - cf-decision-framework
---

# Architecture in a Test & Learn Experiment

At CustomerFirst, the Test & Learn Experiment is the bounded intervention through which uncertainty becomes evidence.

```architecture-diagram experiment-boundary

```

A Test & Learn Experiment can legitimately include:

- real users
- real operational processes
- real environments
- real data where appropriate

The important issue is not whether it resembles a traditional prototype or pilot. The important questions are:

- What are we trying to learn?
- What decision will this inform?
- What exposure are we creating?
- What could cause harm?
- What guardrails are required?
- What evidence would support continuing?
- What evidence would cause us to modify or stop?

## Guardrails

Guardrails bound exposure without predetermining the eventual solution. They may include limited participants, constrained data, controlled environments, monitoring, human oversight, time limits or a reversible route back.

## Bounded risk and exposure

A boundary should make clear who and what could be affected, for how long, and how the team will detect and respond to harm.

```guidance stop-condition
What would we observe that would tell us not to continue?
```

## Designing technical experiments

Choose the smallest intervention that can produce credible evidence. Test the riskiest important uncertainty early. Use the existing Test and Learn and decision guidance for the overall process; this page adds the architecture questions that help make the intervention safe and useful.
