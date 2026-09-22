---
id: cf-architecture-domains
title: Architecture domains
description: Six lenses for considering the whole service.
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
  - cf-operating-model
  - cf-professions
  - cf-lifecycle
---

# Architecture domains

## Lenses, not silos

```architecture-diagram domains
```

Six lenses on one system — not six architecture practices and not six governance teams.

## The six domains

### Service & Organisation

**What does this mean for the service?**

Consider outcomes, users, policy, processes, roles, ownership, suppliers and organisational change.

### Information & Data

**What data does it create or depend upon?**

Consider ownership, meaning, quality, movement, retention, sharing and value.

### Applications & Integration

**What does it integrate with?**

Consider responsibilities, interfaces, dependencies, failure modes and opportunities for reuse.

### Technology & Platforms

**What technology and platforms does it rely upon?**

Consider capability, constraints, support, portability, sustainability and the cost of change.

### Security & Trust

**How do we create trust and manage risk?**

Consider security, privacy, accessibility, ethics, resilience and evidence of control effectiveness.

### Operations & Delivery

**Who operates, supports and ultimately owns it?**

Consider deployment, observability, support, skills, service management, costs and transfer of ownership.

## Apply the domains proportionately

We apply the domains proportionately to the decision we are trying to make.

A short experiment does not need a five-year operating model. But if operational ownership could invalidate the proposition, explore it during the experiment.

```guidance team-question
Which domain contains an uncertainty that could invalidate the decision?
```
