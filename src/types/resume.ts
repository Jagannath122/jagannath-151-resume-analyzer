export type SeniorityLevel = 'Junior' | 'Mid-Level' | 'Senior' | 'Lead / Staff' | 'Executive';

export interface ContactInfoAudit {
  emailFound: boolean;
  phoneFound: boolean;
  linkedinFound: boolean;
  githubOrPortfolioFound: boolean;
  locationFound: boolean;
  notes: string;
}

export interface CandidateProfile {
  name: string;
  detectedTitle: string;
  seniorityLevel: SeniorityLevel;
  yearsOfExperienceInferred: string;
  candidateArchetype: string;
  primaryDomain: string;
  contactInfoAudit: ContactInfoAudit;
  executiveSummary: string;
  coreSuperpower: string;
  keyStrengths: string[];
}

export interface FacilityScore {
  score: number;
  verdict: string;
  details: string[];
  metricsOrData?: string;
  risksOrPros?: string[];
}

export interface SectionGrading {
  sectionName: string;
  score: number;
  status: 'Strong' | 'Needs Improvement' | 'Critical Issues' | 'Missing';
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface BenchmarkTarget {
  name: string;
  tier: 'FAANG / Tier-1 Tech' | 'Series A-C Startup' | 'Fortune 500 Enterprise' | 'Elite Consulting';
  score: number;
  status: 'Exceeds Standard' | 'Meets Standard' | 'Borderline' | 'Below Bar';
  feedback: string;
  keyRequirementChecks: { name: string; passed: boolean }[];
}

export interface RedFlagPitfall {
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  locationOrExample: string;
  fixAdvice: string;
}

export interface BuzzwordFound {
  word: string;
  count: number;
  critique: string;
  suggestedAlternative: string;
}

export interface JobDescriptionMatch {
  matchPercentage: number;
  targetRoleAnalyzed: string;
  matchingKeywords: string[];
  criticalMissingKeywords: string[];
  gapAnalysisSummary: string;
  recommendedAdditions: string[];
}

export interface WeakBulletPoint {
  id: string;
  original: string;
  section: string;
  critique: string;
  optimizedVersions: {
    quantified: string;
    xyzFormula: string;
    executive: string;
    concise: string;
  };
}

export interface PromptRefinementRecipe {
  id: string;
  category: string;
  name: string;
  formula: string;
  userPromptSample: string;
  refinedSystemPrompt: string;
  exampleRewrite: {
    before: string;
    after: string;
    reasoning: string;
  };
}

export interface InterviewPrepQuestion {
  question: string;
  reasonWhyAsked: string;
  suggestedTalkingPoint: string;
}

export interface CareerStrategy {
  probableInterviewQuestions: InterviewPrepQuestion[];
  thirtySixtyNinetySummary: string;
  suggestedLinkedInHeadline: string;
  recommendedNextRoles: string[];
}

export interface ResumeAnalysisResult {
  candidateProfile: CandidateProfile;
  overallScore: number;
  overallGrade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D';
  atsParsabilityScore: number;
  facilityScores: {
    impact: FacilityScore;
    atsFormatting: FacilityScore;
    skillsRelevance: FacilityScore & {
      detectedHardSkills: string[];
      detectedSoftSkills: string[];
      missingModernTools: string[];
    };
    brevity: FacilityScore & {
      fluffWordCountEstimate: number;
    };
    progression: FacilityScore;
    visualHierarchy: FacilityScore & {
      layoutPros: string[];
      layoutCons: string[];
    };
  };
  sectionGrading: SectionGrading[];
  pitAnalysis: {
    benchmarkComparisons: BenchmarkTarget[];
    percentileRank: number;
    redFlagsAndPitfalls: RedFlagPitfall[];
    buzzwordAudit: BuzzwordFound[];
  };
  jobDescriptionMatch?: JobDescriptionMatch;
  weakBulletPoints: WeakBulletPoint[];
  promptRefinementSuggestions: PromptRefinementRecipe[];
  careerStrategy: CareerStrategy;
  analyzedAt: string;
  pdfFileName: string;
  pdfFileSizeKb: number;
}
