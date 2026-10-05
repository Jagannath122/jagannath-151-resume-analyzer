import { GoogleGenAI, Type } from '@google/genai';
import { ResumeAnalysisResult } from '../types/resume';

const GEMINI_MODEL = (import.meta.env.VITE_GEMINI_MODEL as string) || 'gemini-2.5-flash';

export function getGeminiApiKey(): string {
  return (
    (import.meta.env.VITE_GEMINI_API_KEY as string) ||
    (import.meta.env.GEMINI_API_KEY as string) ||
    ''
  );
}

export function isGeminiConfigured(): boolean {
  return Boolean(getGeminiApiKey().trim());
}

function getGeminiClient(): GoogleGenAI {
  const apiKey = getGeminiApiKey().trim();
  if (!apiKey) {
    throw new Error(
      'Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env or .env.local file.'
    );
  }

  return new GoogleGenAI({
    apiKey,
  });
}

const RESUME_ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    candidateProfile: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        detectedTitle: { type: Type.STRING },
        seniorityLevel: { type: Type.STRING },
        yearsOfExperienceInferred: { type: Type.STRING },
        candidateArchetype: { type: Type.STRING },
        primaryDomain: { type: Type.STRING },
        contactInfoAudit: {
          type: Type.OBJECT,
          properties: {
            emailFound: { type: Type.BOOLEAN },
            phoneFound: { type: Type.BOOLEAN },
            linkedinFound: { type: Type.BOOLEAN },
            githubOrPortfolioFound: { type: Type.BOOLEAN },
            locationFound: { type: Type.BOOLEAN },
            notes: { type: Type.STRING },
          },
          required: ['emailFound', 'phoneFound', 'linkedinFound', 'locationFound', 'notes'],
        },
        executiveSummary: { type: Type.STRING },
        coreSuperpower: { type: Type.STRING },
        keyStrengths: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
      required: [
        'name',
        'detectedTitle',
        'seniorityLevel',
        'yearsOfExperienceInferred',
        'candidateArchetype',
        'primaryDomain',
        'contactInfoAudit',
        'executiveSummary',
        'coreSuperpower',
        'keyStrengths',
      ],
    },
    overallScore: { type: Type.INTEGER },
    overallGrade: { type: Type.STRING },
    atsParsabilityScore: { type: Type.INTEGER },
    facilityScores: {
      type: Type.OBJECT,
      properties: {
        impact: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            verdict: { type: Type.STRING },
            details: { type: Type.ARRAY, items: { type: Type.STRING } },
            metricsOrData: { type: Type.STRING },
          },
          required: ['score', 'verdict', 'details'],
        },
        atsFormatting: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            verdict: { type: Type.STRING },
            details: { type: Type.ARRAY, items: { type: Type.STRING } },
            risksOrPros: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ['score', 'verdict', 'details'],
        },
        skillsRelevance: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            verdict: { type: Type.STRING },
            details: { type: Type.ARRAY, items: { type: Type.STRING } },
            detectedHardSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
            detectedSoftSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
            missingModernTools: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ['score', 'verdict', 'details', 'detectedHardSkills', 'detectedSoftSkills', 'missingModernTools'],
        },
        brevity: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            verdict: { type: Type.STRING },
            details: { type: Type.ARRAY, items: { type: Type.STRING } },
            fluffWordCountEstimate: { type: Type.INTEGER },
          },
          required: ['score', 'verdict', 'details', 'fluffWordCountEstimate'],
        },
        progression: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            verdict: { type: Type.STRING },
            details: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ['score', 'verdict', 'details'],
        },
        visualHierarchy: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            verdict: { type: Type.STRING },
            details: { type: Type.ARRAY, items: { type: Type.STRING } },
            layoutPros: { type: Type.ARRAY, items: { type: Type.STRING } },
            layoutCons: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ['score', 'verdict', 'details', 'layoutPros', 'layoutCons'],
        },
      },
      required: ['impact', 'atsFormatting', 'skillsRelevance', 'brevity', 'progression', 'visualHierarchy'],
    },
    sectionGrading: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          sectionName: { type: Type.STRING },
          score: { type: Type.INTEGER },
          status: { type: Type.STRING },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
          recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ['sectionName', 'score', 'status', 'strengths', 'weaknesses', 'recommendations'],
      },
    },
    pitAnalysis: {
      type: Type.OBJECT,
      properties: {
        benchmarkComparisons: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              tier: { type: Type.STRING },
              score: { type: Type.INTEGER },
              status: { type: Type.STRING },
              feedback: { type: Type.STRING },
              keyRequirementChecks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    passed: { type: Type.BOOLEAN },
                  },
                  required: ['name', 'passed'],
                },
              },
            },
            required: ['name', 'tier', 'score', 'status', 'feedback', 'keyRequirementChecks'],
          },
        },
        percentileRank: { type: Type.INTEGER },
        redFlagsAndPitfalls: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              severity: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              locationOrExample: { type: Type.STRING },
              fixAdvice: { type: Type.STRING },
            },
            required: ['severity', 'title', 'description', 'locationOrExample', 'fixAdvice'],
          },
        },
        buzzwordAudit: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              word: { type: Type.STRING },
              count: { type: Type.INTEGER },
              critique: { type: Type.STRING },
              suggestedAlternative: { type: Type.STRING },
            },
            required: ['word', 'count', 'critique', 'suggestedAlternative'],
          },
        },
      },
      required: ['benchmarkComparisons', 'percentileRank', 'redFlagsAndPitfalls', 'buzzwordAudit'],
    },
    jobDescriptionMatch: {
      type: Type.OBJECT,
      properties: {
        matchPercentage: { type: Type.INTEGER },
        targetRoleAnalyzed: { type: Type.STRING },
        matchingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
        criticalMissingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
        gapAnalysisSummary: { type: Type.STRING },
        recommendedAdditions: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: [
        'matchPercentage',
        'targetRoleAnalyzed',
        'matchingKeywords',
        'criticalMissingKeywords',
        'gapAnalysisSummary',
        'recommendedAdditions',
      ],
    },
    weakBulletPoints: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          original: { type: Type.STRING },
          section: { type: Type.STRING },
          critique: { type: Type.STRING },
          optimizedVersions: {
            type: Type.OBJECT,
            properties: {
              quantified: { type: Type.STRING },
              xyzFormula: { type: Type.STRING },
              executive: { type: Type.STRING },
              concise: { type: Type.STRING },
            },
            required: ['quantified', 'xyzFormula', 'executive', 'concise'],
          },
        },
        required: ['id', 'original', 'section', 'critique', 'optimizedVersions'],
      },
    },
    promptRefinementSuggestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          category: { type: Type.STRING },
          name: { type: Type.STRING },
          formula: { type: Type.STRING },
          userPromptSample: { type: Type.STRING },
          refinedSystemPrompt: { type: Type.STRING },
          exampleRewrite: {
            type: Type.OBJECT,
            properties: {
              before: { type: Type.STRING },
              after: { type: Type.STRING },
              reasoning: { type: Type.STRING },
            },
            required: ['before', 'after', 'reasoning'],
          },
        },
        required: ['id', 'category', 'name', 'formula', 'userPromptSample', 'refinedSystemPrompt', 'exampleRewrite'],
      },
    },
    careerStrategy: {
      type: Type.OBJECT,
      properties: {
        probableInterviewQuestions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              reasonWhyAsked: { type: Type.STRING },
              suggestedTalkingPoint: { type: Type.STRING },
            },
            required: ['question', 'reasonWhyAsked', 'suggestedTalkingPoint'],
          },
        },
        thirtySixtyNinetySummary: { type: Type.STRING },
        suggestedLinkedInHeadline: { type: Type.STRING },
        recommendedNextRoles: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ['probableInterviewQuestions', 'thirtySixtyNinetySummary', 'suggestedLinkedInHeadline', 'recommendedNextRoles'],
    },
  },
  required: [
    'candidateProfile',
    'overallScore',
    'overallGrade',
    'atsParsabilityScore',
    'facilityScores',
    'sectionGrading',
    'pitAnalysis',
    'jobDescriptionMatch',
    'weakBulletPoints',
    'promptRefinementSuggestions',
    'careerStrategy',
  ],
};

export interface AnalysisProgress {
  stage: 'uploading' | 'thinking' | 'generating' | 'finalizing';
  status: string;
  thoughtSnippet?: string;
  bytesReceived?: number;
}

export async function analyzeResume(params: {
  pdfBase64: string;
  fileName?: string;
  fileSizeKb?: number;
  targetRole?: string;
  targetJobDescription?: string;
  onProgress?: (progress: AnalysisProgress) => void;
}): Promise<ResumeAnalysisResult> {
  const { pdfBase64, targetRole, targetJobDescription, fileName, fileSizeKb, onProgress } = params;

  if (!pdfBase64) {
    throw new Error('Missing PDF document payload');
  }

  const cleanBase64 = pdfBase64.replace(/^data:application\/pdf;base64,/, '');

  onProgress?.({
    stage: 'thinking',
    status: 'Connecting to Gemini Vision stream & initializing reasoning...',
  });

  const targetRoleText = targetRole
    ? `Target Role to evaluate for: "${targetRole}".`
    : 'Target Role: Evaluate against candidate detected level and optimal industry standards.';
  const targetJobText = targetJobDescription
    ? `Specific Job Description to benchmark against: """${targetJobDescription}"""`
    : 'Infer target role requirements from candidate title and top industry standards.';

  const systemPrompt = `You are an elite Chief Talent Officer, Principal ATS Systems Architect, and Executive Resume Strategist.
You are given an actual PDF document of a resume / CV.
You must analyze this resume ONLY from the provided PDF file, examining both the text content, visual typography, ATS parsability, section flow, bullet density, and candidate DNA.

Conduct a rigorous evaluation across:
1. Candidate DNA ("Tell what it is"):
   - Extract real name, exact detected title, seniority level (Junior, Mid-Level, Senior, Lead / Staff, Executive), inferred years of experience.
   - Assign candidate archetype (e.g. "The Cloud-Scale Architect", "The High-Velocity Product Generalist", "The Enterprise Systems Stabilizer").
   - Audit contact info presence (email, phone, LinkedIn, GitHub/Portfolio, location).
   - Write an executive summary and identify their single most potent "Core Superpower".

2. Multi-Facility Grading:
   - Impact & Metrics (0-100): Quantifiable metrics, Google XYZ formula ("Accomplished [X] as measured by [Y] by doing [Z]"), revenue/scale numbers, weak verb penalties.
   - ATS Formatting & Parsability (0-100): Clean headings, single vs multi-column safety, font scanability, contact parsing, table risk.
   - Skills Relevance & Density (0-100): Extract hard technical skills, soft skills, and identify missing modern tools for this specialization.
   - Brevity & Conciseness (0-100): Word count bloat, filler phrases ("responsible for", "assisted with"), bullet point length sweet spot (1-2 lines).
   - Career Progression & Narrative (0-100): Growth trajectory, title promotions, tenure clarity.
   - Visual & Layout Design (0-100): Margin balance, scannability in 6 seconds, visual consistency.

3. "The Pit" (Benchmark Comparison & Pitfalls):
   - Pit the candidate against 4 industry benchmarks:
     a) "FAANG / Tier-1 Tech Standard"
     b) "Series A-C High-Growth Startup Standard"
     c) "Fortune 500 Enterprise Standard"
     d) "Elite Management/Tech Consulting Standard"
   - Calculate candidate percentile rank (0-100, where 90+ is top 10%).
   - Flag 3-6 critical Red Flags & Pitfalls (with exact quote/location from PDF and actionable fix).
   - Flag overused buzzwords (e.g. "team player", "passionate", "synergy") with counts and replacements.
   - Match against target role or target job description (provide match %, matching keywords, missing keywords, and gap closing steps).

4. Bullet Point Rewriter & Prompt Refinement:
   - Identify 3 to 5 actual weak bullet points from the PDF.
   - Provide 4 optimized rewrites for each:
     * Quantified version (with realistic metric placeholders or inferred metrics)
     * Google XYZ Formula version
     * Executive / Strategic Leadership version
     * Concise version (cutting fluff by 40%)
   - Provide 3 Prompt Refinement recipes tailored to this candidate: show user how to formulate prompts to rewrite their resume, with before/after examples.

5. Career Strategy:
   - 3 tough, highly specific interview questions based on actual weak spots/gaps found in this PDF, with talking points.
   - 30-60-90 day strategic plan for this candidate in their target role.
   - Optimized LinkedIn headline.

Return strictly valid JSON conforming to the schema.`;

  const stream = await getGeminiClient().models.generateContentStream({
    model: GEMINI_MODEL,
    contents: [
      {
        inlineData: {
          mimeType: 'application/pdf',
          data: cleanBase64,
        },
      },
      {
        text: `Analyze this PDF resume thoroughly. ${targetRoleText} ${targetJobText}`,
      },
    ],
    config: {
      systemInstruction: systemPrompt,
      responseMimeType: 'application/json',
      responseSchema: RESUME_ANALYSIS_SCHEMA,
      thinkingConfig: {
        includeThoughts: true,
      },
    },
  });

  let fullJsonText = '';

  for await (const chunk of stream) {
    const candidate = chunk.candidates?.[0];
    const parts = candidate?.content?.parts || [];

    for (const part of parts) {
      if ((part as any).thought) {
        const thoughtText = (part.text || '').trim();
        if (thoughtText) {
          onProgress?.({
            stage: 'thinking',
            status: 'AI Deep Thinking & Multimodal Reasoning...',
            thoughtSnippet: thoughtText.slice(-200),
          });
        }
      } else if (part.text) {
        fullJsonText += part.text;
        onProgress?.({
          stage: 'generating',
          status: `Synthesizing facility scores & benchmark audit (${(fullJsonText.length / 1024).toFixed(1)} KB)...`,
          bytesReceived: fullJsonText.length,
        });
      }
    }

    if (!parts.length && chunk.text) {
      fullJsonText += chunk.text;
      onProgress?.({
        stage: 'generating',
        status: `Receiving structured analysis (${(fullJsonText.length / 1024).toFixed(1)} KB)...`,
        bytesReceived: fullJsonText.length,
      });
    }
  }

  onProgress?.({
    stage: 'finalizing',
    status: 'Finalizing facility scores & preparing dashboard...',
  });

  if (!fullJsonText.trim()) {
    throw new Error('Empty response received from Gemini model');
  }

  const parsed = JSON.parse(fullJsonText);
  parsed.analyzedAt = new Date().toISOString();
  parsed.pdfFileName = fileName || 'Uploaded_Resume.pdf';
  parsed.pdfFileSizeKb = fileSizeKb || Math.round((cleanBase64.length * 0.75) / 1024);

  return parsed as ResumeAnalysisResult;
}

export async function refineBullet(params: {
  bullet: string;
  targetRole?: string;
  style?: string;
  customInstruction?: string;
}): Promise<{
  options: Array<{
    title: string;
    rewrittenText: string;
    impactDelta: string;
    explanation: string;
  }>;
}> {
  const { bullet, targetRole, style, customInstruction } = params;
  if (!bullet) {
    throw new Error('Missing bullet text');
  }

  const prompt = `You are an executive resume bullet optimizer.
Optimize the following resume bullet point for target role: "${targetRole || 'Software Engineering / Tech Professional'}".
Original Bullet: "${bullet}"
Requested Style: "${style || 'google-xyz'}"
Additional Custom Guidance: "${customInstruction || 'Maximize impact and metrics'}"

Provide 3 distinct rewritten options:
1. Option A: Focused on Google XYZ Formula (Accomplished [X] as measured by [Y] by doing [Z]).
2. Option B: High-impact executive and leadership framing with strong active verbs.
3. Option C: Ultra-concise, high-density version for tight 1-line resume space.

Also give a 1-sentence breakdown of why each is an improvement.`;

  const response = await getGeminiClient().models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          options: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                rewrittenText: { type: Type.STRING },
                impactDelta: { type: Type.STRING },
                explanation: { type: Type.STRING },
              },
              required: ['title', 'rewrittenText', 'impactDelta', 'explanation'],
            },
          },
        },
        required: ['options'],
      },
    },
  });

  return JSON.parse(response.text || '{}');
}

export async function refinePrompt(params: {
  userPrompt: string;
  candidateRole?: string;
  sampleBullet?: string;
}): Promise<{
  critique: string;
  masterPrompt: string;
  executionPreview: {
    before: string;
    after: string;
    keyEnhancements: string[];
  };
  adjustableLevers: Array<{
    leverName: string;
    description: string;
    sampleValue: string;
  }>;
}> {
  const { userPrompt, candidateRole, sampleBullet } = params;
  if (!userPrompt) {
    throw new Error('Missing user prompt');
  }

  const prompt = `You are a Principal Prompt Engineer specializing in AI Resume Optimization and Recruiter Persona Simulation.
A job seeker wants to use AI to improve their resume, but provided this initial/rough prompt:
"${userPrompt}"

Candidate context: ${candidateRole || 'Tech Professional'}.
Sample text to test against: "${sampleBullet || 'Managed team and built software updates for web portal.'}"

Your tasks:
1. Critique the user's prompt (what it lacks: constraints, context, metric expectations, role persona).
2. Engineer a "Master System Prompt" that uses XML tags, strict negative constraints, the Google XYZ formula, and senior recruiter rubric.
3. Provide an "Execution Preview": Run this refined master prompt against the sample text to show the impressive real-world transformation.
4. Provide 3 specific prompt levers/variables the user can tweak (e.g. Tone, Industry, Target Company Level).`;

  const response = await getGeminiClient().models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          critique: { type: Type.STRING },
          masterPrompt: { type: Type.STRING },
          executionPreview: {
            type: Type.OBJECT,
            properties: {
              before: { type: Type.STRING },
              after: { type: Type.STRING },
              keyEnhancements: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['before', 'after', 'keyEnhancements'],
          },
          adjustableLevers: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                leverName: { type: Type.STRING },
                description: { type: Type.STRING },
                sampleValue: { type: Type.STRING },
              },
              required: ['leverName', 'description', 'sampleValue'],
            },
          },
        },
        required: ['critique', 'masterPrompt', 'executionPreview', 'adjustableLevers'],
      },
    },
  });

  return JSON.parse(response.text || '{}');
}
