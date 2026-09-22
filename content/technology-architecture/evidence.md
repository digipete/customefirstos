---
id: cf-architecture-evidence
title: Architecture evidence
description: Turn important architectural uncertainty into something a Test & Learn Experiment can resolve.
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
  - cf-evidence-standard
  - cf-test-learn
  - cf-decision-framework
  - cf-value-confidence
---

# Evidence

Architecture assumptions are hypotheses.

```guidance evidence
If an architectural uncertainty matters to the decision, make it part of the experiment.
```

Architecture should not sit alongside an experiment merely producing documentation. Important uncertainty should become something the Test & Learn Experiment is deliberately designed to resolve.

## From assumption to evidence

| Assumption                      | Test                               | Evidence                                  |
| ------------------------------- | ---------------------------------- | ----------------------------------------- |
| “This will integrate”           | Connect it                         | Integration evidence                      |
| “It will perform”               | Load or performance test it        | Measurements                              |
| “People will use it”            | Put it in front of real users      | Observed behaviour                        |
| “We need this data”             | Trace the service and data journey | Actual information requirements           |
| “This constraint cannot change” | Challenge or test the constraint   | Proven constraint or disproven assumption |
| “This will be cheaper”          | Model and test costs               | Economic evidence                         |

## Ways to learn

- Observe
- Prototype
- Spike
- Test
- Measure
- Challenge
- Learn

```guidance team-question
What evidence would turn this assumption into something we know?
```

Record what was observed, the conditions under which it was true, the confidence it creates and the decision it informs. Link evidence to the existing CustomerFirst evidence standard rather than inventing a separate architecture evidence process.
