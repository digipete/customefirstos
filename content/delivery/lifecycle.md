---
id: cf-lifecycle
title: Delivery Lifecycle
description: The seven stages of a CustomerFirst mission and what each stage is for.
type: practice
section: delivery
status: live
maturity: established
owner:
  profession: Delivery
version: 0.4
created: 2026-02-10
reviewed: 2026-08-14
applies_to:
  - discovery
  - define
  - experiment
tags:
  - lifecycle
related:
  - cf-discovery
  - cf-test-learn
---

# Delivery Lifecycle

Each stage exists to answer a different question.

| Stage | Question it answers |
| --- | --- |
| Discover | What is actually happening for customers? |
| Define | What outcome are we pursuing, and what must be true? |
| Experiment | Which assumptions survive contact with reality? |
| Deliver | Can we make the change work in service? |
| Measure | Did the outcome move? |
| Adapt | What do we change given the evidence? |
| Scale | Where else does this hold? |

```mermaid
flowchart TD
N[Customer need] --> M[Mission] --> H[Hypothesis] --> X[Experiment] --> E[Evidence] --> D[Decision] --> O[Outcome] --> L[Learning] --> OS[CustomerFirst OS]
```

## Anti-patterns

- treating stages as sign-off gates
- moving to Deliver with untested primary hypotheses
