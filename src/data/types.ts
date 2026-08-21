// Portable operational data model for CustomerFirst OS.
// These types mirror the intended Supabase/PostgreSQL schema (missions,
// hypotheses, experiments, decisions, evidence, patterns, costs,
// value_records, insights, analytics_events) so the seed dataset can be
// replaced by a database read without changing the experience layer.

export type LifecycleStage =
  | "Discover"
  | "Define"
  | "Experiment"
  | "Deliver"
  | "Measure"
  | "Adapt"
  | "Scale";

export type MissionStatus = "Active" | "Paused" | "Stopped" | "Complete";

export type HypothesisStatus =
  | "Untested"
  | "Testing"
  | "Supported"
  | "Partially supported"
  | "Disproved"
  | "Inconclusive";

export type ExperimentResult = "Supported" | "Partially supported" | "Disproved" | "Inconclusive";

export type Recommendation =
  | "Continue"
  | "Change"
  | "Run another experiment"
  | "Invest"
  | "Scale"
  | "Pause"
  | "Stop";

export type EvidenceStrength = "Weak" | "Moderate" | "Strong";

export type ValueState = "Assumed" | "Modelled" | "Observed" | "Evidenced" | "Realised";

export type ValueType =
  | "Cashable savings"
  | "Avoided cost"
  | "Productivity"
  | "User benefit"
  | "Risk reduction"
  | "Service improvement";

export type CostType =
  | "People"
  | "Technology"
  | "Supplier"
  | "Experiment"
  | "Partner effort"
  | "Other";

export type DecisionDomain =
  | "Strategy"
  | "Commercial"
  | "Delivery"
  | "Architecture"
  | "Technology"
  | "Data"
  | "AI"
  | "People"
  | "Governance"
  | "Investment";

export type PatternStatus = "Candidate" | "Emerging" | "Proven" | "Retired";

export type HealthDimension =
  | "Outcome clarity"
  | "Evidence strength"
  | "Team confidence"
  | "Stakeholder alignment"
  | "Decision velocity"
  | "Delivery flow"
  | "Risk visibility"
  | "Value confidence"
  | "Operational readiness";

export interface Person {
  id: string;
  name: string;
  profession: string;
  role?: string;
}

export interface Mission {
  id: string;
  slug: string;
  name: string;
  description: string;
  partner: string;
  ownerId: string;
  team: string[];
  problemStatement: string;
  outcomes: { id: string; statement: string; measure: string; baseline: string }[];
  users: string;
  startDate: string;
  status: MissionStatus;
  stage: LifecycleStage;
  currentUnderstanding: string;
  confidence: number; // 0-100, confidence in the primary hypothesis
  risks: { id: string; description: string; severity: "Low" | "Medium" | "High"; owner: string }[];
  dependencies: { id: string; description: string; on: string; status: string }[];
  lessons: string[];
  nextQuestions: string[];
  health: Record<HealthDimension, { score: 1 | 2 | 3 | 4 | 5; note: string }>;
  flow: {
    daysToFirstExperiment: number | null;
    daysToMeaningfulEvidence: number | null;
    daysToSignificantDecision: number | null;
    daysToDeliveredOutcome: number | null;
    daysToRealisedValue: number | null;
  };
  osReferences: string[]; // content ids of guidance used
}

export interface Hypothesis {
  id: string;
  missionId: string;
  statement: string;
  assumption: string;
  ownerId: string;
  importance: "Low" | "Medium" | "High";
  uncertainty: "Low" | "Medium" | "High";
  evidenceRequired: string;
  confidence: number;
  status: HypothesisStatus;
}

export interface Experiment {
  id: string;
  missionId: string;
  hypothesisId: string;
  name: string;
  description: string;
  ownerId: string;
  startDate: string;
  endDate: string | null;
  cost: number;
  participants: number;
  method: string;
  successCriteria: string;
  result: ExperimentResult | null;
  confidence: number;
  recommendation: Recommendation | null;
  learningScore: number; // 1-5, how much this shifted understanding
}

export interface Decision {
  id: string;
  missionId: string | null;
  question: string;
  context: string;
  domain: DecisionDomain;
  ownerId: string;
  evidenceIds: string[];
  options: { option: string; note: string }[];
  tradeOffs: string[];
  decision: string;
  decisionDate: string;
  raisedDate: string;
  reviewDate: string;
  outcome: string | null;
}

export interface EvidenceRecord {
  id: string;
  missionId: string;
  type: string;
  source: string;
  date: string;
  description: string;
  strength: EvidenceStrength;
  confidence: number;
  ownerId: string;
  supports: string[]; // ids of hypotheses / decisions / patterns / outcomes
  challenges: string[];
  link: string;
}

export interface PatternRecord {
  id: string;
  slug: string;
  name: string;
  description: string;
  context: string;
  problem: string;
  approach: string;
  missionsObserved: string[];
  evidenceIds: string[];
  outcomes: string;
  confidence: number;
  lessons: string[];
  related: string[];
  status: PatternStatus;
}

export interface CostRecord {
  id: string;
  missionId: string;
  type: CostType;
  amount: number;
  period: string;
  note: string;
}

export interface ValueRecord {
  id: string;
  missionId: string;
  type: ValueType;
  financial: boolean;
  amount: number;
  unit: string;
  state: ValueState;
  description: string;
  evidenceIds: string[];
  reviewDate: string;
}

export type InsightStatus = "Generated" | "Reviewing" | "Accepted" | "Rejected" | "Actioned";

export interface Insight {
  id: string;
  observation: string;
  whyItMatters: string;
  evidenceIds: string[];
  missionIds: string[];
  confidence: number;
  suggestedQuestion: string;
  suggestedAction: string;
  generatedAt: string;
  provider: string;
  status: InsightStatus;
  reviewer: string | null;
  reviewerFeedback: string | null;
  osChangeSuggestion: string | null;
}

export interface Dataset {
  people: Person[];
  missions: Mission[];
  hypotheses: Hypothesis[];
  experiments: Experiment[];
  decisions: Decision[];
  evidence: EvidenceRecord[];
  patterns: PatternRecord[];
  costs: CostRecord[];
  values: ValueRecord[];
  insights: Insight[];
}
