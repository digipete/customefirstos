---
id: cf-principle-design-for-change
title: Design for change
description: Keep decisions, components and technologies replaceable where possible.
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

# Design for change

Keep decisions, components and technologies replaceable where possible.

## Why this matters

Needs, evidence and partner capability change. Replaceability reduces the cost of learning.

## What this means in practice

Make boundaries explicit. Avoid unnecessary coupling. Record what would trigger review or replacement.

## Questions to ask

- What is likely to change?
- Where would change be expensive?
- Can this part be replaced independently?

## During a Test & Learn Experiment

Observe the real cost of changing configuration, interfaces, data and operating processes.

## Watch out for

- claiming flexibility without testing change
- adding abstraction with no evidenced need

## Related guidance

Use this principle with the CustomerFirst Decision Framework, Test and Learn guidance and evidence standard.
