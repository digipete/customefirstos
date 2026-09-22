---
id: cf-principle-build-trust
title: Build trust into the design
description: Design in security, privacy, accessibility, resilience and operability.
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

# Build trust into the design

Design in security, privacy, accessibility, resilience and operability.

## Why this matters

Trust depends on how the service behaves in ordinary use and when things go wrong, not on a final compliance check.

## What this means in practice

Include affected people and specialists early. Make harms and controls explicit. Test whether guardrails work.

## Questions to ask

- Who could be harmed or excluded?
- How will we detect failure?
- Can the partner operate the controls?

## During a Test & Learn Experiment

Bound exposure, use appropriate data, monitor effects and set stop conditions before involving real users or operations.

## Watch out for

- security or accessibility reviews at the end
- controls that depend permanently on specialists

## Related guidance

Use this principle with the CustomerFirst Decision Framework, Test and Learn guidance and evidence standard.
