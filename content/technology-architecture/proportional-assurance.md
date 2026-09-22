---
id: cf-proportional-assurance
title: Proportional assurance
description: Increase assurance with exposure, consequence, irreversibility and scale.
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
  - cf-architecture-assurance
  - cf-minimum-viable-governance
  - cf-evidence-standard
---

# Proportional assurance

Assurance increases with exposure, consequence, irreversibility and scale — not simply because a project has reached another governance stage.

```architecture-diagram proportional-assurance
```

## Exposure

Who, what and how much could be affected?

## Consequence

What harm or loss could occur, and to whom?

## Irreversibility

How difficult, costly or slow would it be to recover or change direction?

## Scale

How widely and for how long will the intervention operate?

A Test & Learn Experiment may legitimately involve real users and real operational environments. Its scope and blast radius should be understood and bounded.

A technically small experiment involving sensitive data could still require significant assurance.

Proportional assurance is based on risk and consequence rather than bureaucracy.

```guidance team-question
What has changed about our exposure, consequence, irreversibility or scale since the last decision?
```
