# CustomeFirstOS

CUSTOMERFIRST OPERATING SYSTEM

Build a production-quality web application called CustomerFirst OS (CFOS).

CustomerFirst OS is the living operating system for a multidisciplinary public-service transformation team.

This is NOT:

a project-management application

a corporate intranet

a SharePoint replacement

a static documentation website

a conventional programme dashboard

a CMS

a generic AI wrapper

It is a combination of:

Living operating manual

Mission delivery system

Decision and evidence system

Organisational learning system

Transformation economics platform

Portfolio intelligence capability

The central proposition is:

CustomerFirst OS describes how we transform services, instruments the work as it happens, learns from every transformation and makes the next one better.

1. NON-NEGOTIABLE ARCHITECTURE

CustomerFirst OS must be portable.

Use three architectural layers:

┌──────────────────────────────────────────┐
│              EXPERIENCE                  │
│                                          │
│         Lovable / React frontend         │
│                                          │
│ Search • Navigation • Visualisation      │
│ Interaction • Portfolio • Insights       │
├──────────────────────────────────────────┤
│              INTELLIGENCE                │
│                                          │
│          Supabase / PostgreSQL           │
│                                          │
│ Missions • Evidence • Experiments        │
│ Decisions • Economics • Analytics        │
│ Insights • Operational Patterns          │
├──────────────────────────────────────────┤
│               KNOWLEDGE                  │
│                                          │
│                 GitHub                   │
│                                          │
│ Markdown • Mermaid • Git history         │
│ Principles • Practices • Playbooks       │
│ Patterns • Templates                     │
└──────────────────────────────────────────┘


The architectural principles are:

Knowledge is permanent.

Operational data is portable.

Experience is replaceable.

Lovable must never become the only place where CustomerFirst knowledge exists.

2. MARKDOWN-FIRST CONTENT

GitHub-hosted Markdown is the canonical source of truth for all CustomerFirst OS editorial content.

Do NOT store canonical guidance only in:

React components

proprietary page definitions

database rich-text fields

Lovable-specific structures

The application must parse and render Markdown.

Use a repository structure similar to:

/
├── content/
│   ├── philosophy/
│   ├── operating-model/
│   ├── delivery/
│   ├── decisions/
│   ├── practices/
│   ├── patterns/
│   ├── evidence/
│   └── templates/
│
├── public/
│   ├── diagrams/
│   └── assets/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── analytics/
│   ├── intelligence/
│   └── data/
│
├── .github/
│   └── workflows/
│
└── README.md


All Markdown must remain readable and useful outside the application.

A user cloning the GitHub repository must retain the CustomerFirst knowledge base without needing Lovable.

3. MARKDOWN CONTENT MODEL

Use YAML frontmatter.

Example:

---
id: cf-delivery-test-learn
title: Test and Learn
description: Reduce uncertainty through small, deliberate experiments.

type: practice
section: delivery
status: live
maturity: emerging

owner:
  profession: Delivery

version: 1.3
created: 2026-08-21
reviewed: 2026-08-21

applies_to:
  - discovery
  - experiment

related:
  - cf-decision-framework
  - cf-evidence-standard

tags:
  - experiments
  - evidence
  - learning
---

# Test and Learn

Test and Learn turns uncertainty into evidence.

## Why we do this

Large commitments based on assumptions create unnecessary risk.

## What this means for us

We design the smallest useful experiment capable of changing our understanding.

## Good looks like

- clear hypothesis
- measurable evidence
- proportionate investment
- explicit learning
- a decision afterwards

## Anti-patterns

- pilots without hypotheses
- experiments designed to prove an existing opinion
- tests with no decision attached


Support metadata including:

id

title

description

type

section

owner

status

maturity

version

created

reviewed

tags

related content

applicable lifecycle stages

Use stable IDs rather than page titles for relationships wherever possible.

4. MERMAID

Mermaid diagrams must remain embedded within Markdown wherever practical.

Render Mermaid safely in the application.

Example:

Customer Need
      ↓
    Mission
      ↓
  Hypothesis
      ↓
  Experiment
      ↓
   Evidence
      ↓
   Decision
      ↓
   Outcome
      ↓
   Learning
      ↓
CustomerFirst OS


Diagrams must remain editable as text through GitHub.

Do not make proprietary graphical representations the canonical version of diagrams.

5. GITHUB WORKFLOW

The preferred content workflow is:

Edit Markdown
      ↓
Git commit
      ↓
Pull request
      ↓
Review
      ↓
Merge
      ↓
GitHub Action
      ↓
Build
      ↓
Deploy


Provide an Edit this page action that opens the corresponding Markdown file in GitHub.

Do not create a proprietary CMS as the primary editing experience.

The application may eventually assist users in proposing edits, but canonical changes must pass through Git.

6. GITHUB PAGES

The complete application must support static deployment through GitHub Pages.

It must support a repository subpath such as:

https://digipete.github.io/CFOS/

Do not assume deployment at /.

Configure routing and asset paths to work correctly beneath /CFOS/.

Create a GitHub Actions deployment workflow.

A push or merge to main should:

install dependencies

validate Markdown/frontmatter

check internal links

build the application

run tests

deploy to GitHub Pages

The build should fail where practical for:

malformed frontmatter

broken required references

invalid Markdown metadata

serious internal link errors

7. PRODUCT NAVIGATION

Primary navigation:

Home

How we work

Missions

Decisions

Experiments

Patterns

Evidence

Insights

Portfolio

Search must be globally available.

Keep the operating-system metaphor within the product architecture and storytelling, but do not require non-technical users to understand terms such as kernel, threads or drivers to navigate the product.

8. HOME

Create a distinctive CustomerFirst OS homepage.

Hero:

CustomerFirst OS

How we think. How we decide. How we deliver. How we learn.

Explain:

CustomerFirst OS is a living operating system rather than a static playbook.

It captures how CustomerFirst works, provides tools for delivery and learns from evidence generated by real missions.

Show the core feedback loop:

Customer need
      ↓
Mission
      ↓
Decisions
      ↓
Experiments
      ↓
Evidence
      ↓
Outcomes
      ↓
Patterns
      ↓
OS improvement
      ↓
Next mission


Create four strong entry points:

Understand CustomerFirst

Explore the principles and operating model.

Start or explore a mission

Understand how delivery is progressing.

Make a decision

Use the CustomerFirst Decision Framework.

See what we're learning

Explore patterns, evidence and intelligence.

The homepage should feel like the front door to an operating system, not a dashboard.

9. HOW WE WORK

Render Markdown content as a rich documentation experience.

Initial content architecture:

Why

Why CustomerFirst exists

Manifesto

Beliefs

Principles

Operating model

Missions

Multidisciplinary squads

Professions

Communities of practice

Leadership

Delivery

Lifecycle

Discovery

Define

Test & Learn

Deliver

Measure

Adapt

Scale

Practices

Architecture

Engineering

Product

Service Design

Research

Content Design

Delivery Management

Data

AI

People and Change

Governance

Decision making

Risk

Investment

Architecture

AI

Commercial

Minimum viable governance

Pages should support:

Markdown

Mermaid

callouts

related pages

"Why we do this"

"What this means for us"

"Good looks like"

anti-patterns

examples

templates

ownership

maturity

version

last reviewed

Edit on GitHub

10. MISSIONS

Missions are the central operational object.

A mission represents focused multidisciplinary work organised around an outcome.

Create a mission model containing:

ID

name

description

partner organisation

mission owner

multidisciplinary team

problem statement

intended outcomes

users

start date

status

lifecycle stage

hypotheses

experiments

decisions

evidence

risks

dependencies

investment

potential value

evidenced value

realised value

confidence

lessons

patterns generated

Lifecycle:

Discover
   ↓
Define
   ↓
Experiment
   ↓
Deliver
   ↓
Measure
   ↓
Adapt
   ↓
Scale


Also allow:

Pause

Stop

Complete

Stopping work because evidence disproves the underlying proposition should be represented as a potentially successful outcome.

Do not use percentage complete as the primary representation of mission progress.

11. MISSION VIEW

Create a compelling mission page.

Show:

Mission outcome

Current understanding

Lifecycle position

Team

Hypotheses

Active experiments

Recent evidence

Significant decisions

Economics

Risks

Emerging learning

Patterns generated

Recommended next questions

Prioritise evidence and confidence over arbitrary progress reporting.

12. HYPOTHESES

Hypotheses should be first-class objects.

Store:

statement

assumption

mission

owner

importance

uncertainty

evidence required

current confidence

status

experiments

evidence

Statuses:

Untested

Testing

Supported

Partially supported

Disproved

Inconclusive

Show disproved hypotheses positively where they prevent unnecessary investment.

13. EXPERIMENTS

Experiments turn uncertainty into evidence.

Store:

mission

hypothesis

description

owner

start date

end date

investment/cost

participants

method

success criteria

evidence

result

confidence

recommendation

Results:

Supported

Partially supported

Disproved

Inconclusive

Recommendations:

Continue

Change

Run another experiment

Invest

Scale

Pause

Stop

Measure learning relative to investment, not simply experiment success rate.

14. DECISION FRAMEWORK

Implement the CustomerFirst Decision Framework:

Question
   ↓
Evidence
   ↓
Options
   ↓
Trade-offs
   ↓
Decision
   ↓
Review


Decision records contain:

question

context

mission

domain

owner

evidence

options considered

trade-offs

decision

decision date

review date

outcome

Decision domains:

Strategy

Commercial

Delivery

Architecture

Technology

Data

AI

People

Governance

Investment

Make decisions searchable across CustomerFirst.

Measure decision latency where appropriate.

15. EVIDENCE

Evidence is a first-class object.

Evidence may support or challenge:

hypotheses

decisions

outcomes

benefits

patterns

insights

Store:

evidence ID

type

source

date

description

strength

confidence

related entities

attachments or links

owner

Evidence strength should be explicit.

Do not allow weak evidence to be visually indistinguishable from strong evidence.

16. PATTERN LIBRARY

Patterns represent reusable organisational learning.

Store:

ID

name

description

context

problem

approach

evidence

missions observed

outcomes

confidence

lessons

related patterns

status

Statuses:

Candidate

Emerging

Proven

Retired

Patterns become stronger as evidence accumulates across independent missions.

Clearly show:

Observed in 1 mission

versus

Supported by evidence from 7 missions

Pattern definitions and reusable guidance should ultimately be representable/exportable as Markdown.

17. TRANSFORMATION ECONOMICS

This is a major part of CustomerFirst OS.

We want to understand the economics of transformation itself.

For every mission track:

Investment

People cost

Technology cost

Supplier cost

Experiment cost

Partner effort

Other cost

Value

Cashable savings

Avoided cost

Productivity

User benefit

Risk reduction

Service improvement

Not all value needs to be financial.

However, financial and non-financial value must remain distinguishable.

18. VALUE CONFIDENCE

Never present potential value as realised value.

Every value record should have an evidence state:

Assumed

Modelled

Observed

Evidenced

Realised

Represent both:

Amount/value

and

confidence/evidence state

Example:

£4.2m potential value — Modelled

must never appear equivalent to:

£4.2m realised value — Evidenced

This distinction is critical.

19. FLOW ECONOMICS

Measure how efficiently CustomerFirst turns uncertainty into evidence and evidence into value.

Capture:

Mission start → first experiment

Mission start → meaningful evidence

Mission start → significant decision

Mission start → delivered outcome

Mission start → realised value

Decision latency

Experiment cycle time

Lifecycle stage duration

Cost to first experiment

Cost to meaningful evidence

Cost to significant decision

Over time this should help answer:

What does successful transformation cost?

How quickly can we reduce uncertainty?

Where does transformation slow down?

Which activities produce the greatest learning for the least investment?

20. PORTFOLIO

Create a leadership portfolio view.

Show:

Active missions

Total investment

Potential value

Evidenced value

Realised value

Experiments running

Hypotheses being tested

Hypotheses disproved

Decisions awaiting review

Emerging patterns

Recurring constraints

Mission health

Learning velocity

Do not default to traditional RAG programme reporting.

21. MISSION HEALTH

Create a multidimensional mission-health model.

Consider:

Outcome clarity

Evidence strength

Team confidence

Stakeholder alignment

Decision velocity

Delivery flow

Risk visibility

Value confidence

Operational readiness

Avoid reducing all of this to a single arbitrary percentage.

Allow leadership to see why a mission appears healthy or unhealthy.

22. INTELLIGENCE

Build an intelligence layer across CustomerFirst operational data.

This should not merely be an AI chatbot.

The system should identify potentially useful observations such as:

Missions involving policy interpretation are taking significantly longer to reach their first live experiment.

Three unrelated missions have identified identity verification as a delivery constraint.

Mission A has consumed substantial discovery investment without increasing confidence in its primary hypothesis.

Four missions independently used the same stakeholder-alignment technique with positive outcomes. Consider creating an OS pattern.

Potential value across two missions is high but currently supported only by modelled evidence.

Experiments of type X appear to generate more learning per £ invested than type Y.

Do not state correlation as causation.

23. INSIGHT STANDARD

Every generated insight must show:

Observation

What did we observe?

Why it matters

Why might this be useful?

Evidence

Which records support it?

Confidence

How confident is the system?

Suggested question

What should a human investigate?

Suggested action

What might be worth doing next?

Insights must link directly to their underlying evidence.

AI-generated observations must never masquerade as established fact.

24. HUMAN REVIEW OF INTELLIGENCE

Store generated insights with:

observation

evidence references

confidence

generation date

model/provider

status

human reviewer

accepted/rejected

reviewer feedback

Statuses:

Generated

Reviewing

Accepted

Rejected

Actioned

Do not tightly couple the intelligence architecture to a single AI provider.

Create an abstraction that can support different LLMs or analytical services later.

25. PRODUCT ANALYTICS

Instrument CustomerFirst OS itself.

Track privacy-appropriate events such as:

OS page viewed

Search performed

No-result search

Template used

Pattern viewed

Mission viewed

Decision framework opened

Decision created

Experiment created

Evidence added

Insight viewed

Insight actioned

Content edit initiated

GitHub edit initiated

Do not collect unnecessary personal information.

26. OS ANALYTICS

Create a view showing:

Most-used OS guidance

Least-used guidance

Most-searched topics

No-result searches

Most-used templates

Most-referenced patterns

Guidance frequently accessed during missions

Guidance associated with decisions

Content not reviewed recently

Content rarely used

This should help answer:

Is the operating system itself useful?

Keep product usage analytics separate from mission performance.

27. THE LEARNING LOOP

This is fundamental to the product.

Implement the conceptual loop:

CustomerFirst OS
      ↓
Mission
      ↓
Hypothesis
      ↓
Experiment
      ↓
Evidence
      ↓
Decision
      ↓
Outcome
      ↓
Pattern
      ↓
Insight
      ↓
Suggested OS change
      ↓
GitHub pull request
      ↓
Reviewed Markdown
      ↓
New OS release
      ↓
Next mission


The system should eventually identify when operational evidence suggests the OS itself needs changing.

Examples:

This pattern has now been independently observed in four missions. Consider promoting it from Emerging to Proven.

Three missions have produced evidence conflicting with the current Discovery guidance. Consider reviewing this page.

This template is rarely used and has received poor usefulness signals. Consider simplifying or retiring it.

The application must NEVER silently rewrite canonical CustomerFirst guidance.

Changes must go through GitHub review.

28. SEARCH

Create global search across:

OS guidance

Missions

Decisions

Experiments

Evidence

Patterns

Templates

Insights

Search should be prominent.

Group results intelligently by type.

Design the search architecture so semantic search can be introduced later.

29. RELATIONSHIPS

One of the most important parts of the product is showing relationships.

A user should be able to navigate:

Mission → Hypothesis → Experiment → Evidence → Decision

and:

Evidence → Pattern → OS guidance

and:

OS guidance → Missions using it

and:

Mission → Costs → Value → Evidence

Avoid creating isolated records.

The graph of relationships is part of the value of CustomerFirst OS.

30. DATA MODEL

Use Supabase/PostgreSQL.

Core entities:

users

professions

missions

mission_members

outcomes

hypotheses

experiments

decisions

evidence

evidence_relationships

patterns

pattern_evidence

risks

dependencies

costs

value_records

insights

insight_evidence

analytics_events

os_content_references

Create appropriate relationships, indexes and constraints.

Use UUIDs.

Include created/updated timestamps.

Use soft deletion where sensible.

31. SECURITY

Use Supabase Row Level Security.

Design roles:

Viewer

Contributor

Mission Member

Mission Owner

Profession Lead

Leadership

Administrator

Do not expose sensitive operational data publicly simply because the application is deployed through GitHub Pages.

GitHub Pages hosts the application shell.

Authenticated operational data remains protected through Supabase.

Public OS Markdown and protected operational data must be treated separately.

32. DESIGN DIRECTION

CustomerFirst OS should feel like a premium digital product.

Use:

Deep navy/teal foundation

Bright lime accent

White/light neutral surfaces

Large confident typography

Generous whitespace

Simple diagrams

Clear information hierarchy

Restrained motion

Accessible interactions

Avoid:

Corporate-dashboard aesthetics

Excessive cards

Tiny metrics everywhere

Gradient-heavy startup aesthetics

Glassmorphism

Unnecessary animation

Generic AI imagery

Government-document styling

The product should feel modern, distinctive and credible.

33. ACCESSIBILITY

Design to WCAG 2.2 AA.

Ensure:

Keyboard navigation

Visible focus states

Semantic HTML

Sufficient colour contrast

Accessible charts

Text alternatives

Responsive layouts

No interaction should depend solely on colour.

34. DEMONSTRATION DATA

Seed realistic but entirely fictional public-service transformation data.

Create at least:

8 missions

25 decisions

30 hypotheses

40 experiments

20 patterns

60+ evidence records

multiple cost records

multiple value records

multiple generated insights

Create data spanning approximately 12 months.

Make the dataset tell a coherent story.

Include:

successful missions

stopped missions

missions that pivoted

cheap experiments generating significant learning

expensive experiments generating little learning

repeated constraints

emerging cross-mission patterns

different levels of value confidence

Do not use lorem ipsum.

Do not use real personal or sensitive information.

35. EXAMPLE PORTFOLIO STORY

Seed sufficient data that the portfolio can demonstrate something like:

CUSTOMERFIRST

8 active missions

£1.4m invested

£6.8m potential value
£3.1m evidenced value
£1.7m realised value

42 experiments completed

31 significant decisions

18 hypotheses supported
11 disproved
7 inconclusive

Median time to first experiment:
16 days

Median time to meaningful evidence:
29 days

5 emerging cross-mission patterns

3 recurring systemic constraints


These are illustrative demonstration values, not prescribed CustomerFirst KPIs.

36. CONTENT STARTER SET

Create Markdown starter content for:

Why CustomerFirst exists

CustomerFirst Manifesto

Beliefs

Principles

Operating Model

Mission Model

Squads

Professions

Leadership

Delivery Lifecycle

Discovery

Define

Test & Learn

Delivery

Measurement

Adaptation

Scaling

Decision Framework

Architecture

Engineering

Product

Service Design

Research

Content

Delivery Management

Data

AI

Governance

Mission Health

Evidence

Transformation Economics

Pattern Library

Anti-patterns

Do not attempt to make these definitive.

Clearly identify early content as evolving guidance where appropriate.

37. TEMPLATES

Create Markdown templates for:

Mission canvas

Hypothesis

Experiment

Decision record

Pattern

Retrospective

Architecture decision

Test & Learn readout

Mission review

Outcome definition

Benefits hypothesis

Each template should be usable independently outside the application.

38. VERSIONING

CustomerFirst OS should be versioned like software.

Support:

0.x — evolving foundation

1.0 — coherent operating model

1.x — evidence-driven improvements

2.0 — major operating model evolution

Create release notes from Git history where practical.

Show current OS version discreetly within the application.

39. TESTING

Create automated tests for:

Routing under /CFOS/

Markdown rendering

Frontmatter parsing

Internal content links

Mermaid rendering where feasible

Authentication boundaries

Critical mission flows

Decision creation

Experiment creation

Evidence relationships

Portfolio calculations

Value confidence calculations

Do not allow potential value to be accidentally included in realised-value totals.

This deserves an explicit automated test.

40. FIRST BUILD PRIORITY

Build incrementally.

Phase 1

Application shell

CustomerFirst design system

GitHub Pages configuration

Markdown engine

Navigation

Search

Mermaid

Initial OS content

Phase 2

Supabase schema

Authentication

Missions

Hypotheses

Experiments

Decisions

Evidence

Phase 3

Patterns

Economics

Mission health

Portfolio

Phase 4

Analytics

Cross-mission intelligence

Learning recommendations

OS-change suggestions

Do not sacrifice the underlying architecture in order to produce a visually complete prototype faster.

41. IMPORTANT IMPLEMENTATION RULE

When choosing between:

a faster implementation that locks CustomerFirst into Lovable

and

a slightly more deliberate implementation that preserves Markdown, Git history, open data structures and portability

always choose portability.

At any point we must be able to replace the frontend without losing CustomerFirst OS.

42. SUCCESS TEST

The product succeeds if it can answer four increasingly sophisticated questions.

Level 1 — How do we work?

The OS provides clear guidance.

Level 2 — What are we doing?

Missions show the work underway.

Level 3 — Is it working?

Evidence, outcomes and economics show whether the work creates value.

Level 4 — What are we learning about how transformation works?

Cross-mission intelligence identifies patterns and improves CustomerFirst OS itself.

That final level is the long-term differentiator.

43. THE PRODUCT PROMISE

Use this proposition throughout the product design:

CustomerFirst OS is how we think, how we decide, how we deliver and how we learn.

And use this to explain the living-system concept:

It doesn't just document how we transform services. It learns from every transformation and makes the next one better.

Build CustomerFirst OS as the beginnings of that system, not merely as a website describing the ambition.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b5ef4cd1-c8ff-42f9-90d1-79daed968290).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
