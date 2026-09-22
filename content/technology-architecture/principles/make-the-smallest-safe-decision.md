---
id: cf-principle-smallest-safe-decision
title: Make the smallest safe decision
description: Decide only what we need to decide now.
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
  - cf-architecture-principles
  - cf-test-learn
  - cf-decision-framework
---

# Make the smallest safe decision

Decide only what we need to decide now.

## Why this matters

Large early commitments create cost and dependency before the evidence can justify them.

## What this means in practice

Separate decisions needed now from decisions that can wait. Prefer reversible commitments. Match the size of the decision to the strength of evidence.

## Questions to ask

- What must be decided now?
- What can remain open?
- How could we reverse this choice?

## During a Test & Learn Experiment

Bound the decision to the experiment and avoid treating an experiment choice as the future service standard.

## Watch out for

- turning temporary choices into permanent architecture
- seeking certainty by deciding everything early

## Related guidance

Use this principle with the CustomerFirst Decision Framework, Test and Learn guidance and evidence standard.
