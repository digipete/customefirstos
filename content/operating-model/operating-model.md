---
id: cf-operating-model
title: Operating Model
description: "How CustomerFirst is organised: missions, squads, professions and leadership."
type: operating-model
section: operating-model
status: live
maturity: established
owner:
  profession: Leadership
version: 0.4
created: 2026-02-10
reviewed: 2026-08-14
applies_to:
  - discovery
  - define
  - experiment
tags:
  - operating-model
related:
  - cf-mission-model
  - cf-squads
  - cf-professions
  - cf-leadership
---

# Operating Model

CustomerFirst is organised around missions, staffed by multidisciplinary squads, supported by professions and enabled by minimum viable governance.

```mermaid
flowchart TD
L[Leadership sets direction] --> M[Missions own outcomes]
P[Professions own craft] --> S[Squads]
S --> M
M --> E[Evidence]
E --> D[Decisions]
D --> O[Outcomes]
O --> K[Patterns and OS improvement]
K --> L
```

## What this means for us

Missions are temporary and outcome-shaped. Professions are permanent and craft-shaped. Nobody reports to a project plan.

## Good looks like

- every person knows their mission outcome and their profession home
- decisions are taken at the level with the most evidence
- the operating model changes through reviewed pull requests

## Anti-patterns

- permanent missions
- professions acting as approval gates
