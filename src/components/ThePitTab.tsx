import React, { useState } from 'react';
import {
  BenchmarkTarget,
  RedFlagPitfall,
  BuzzwordFound,
  JobDescriptionMatch,
} from '../types/resume';
import {
  ShieldAlert,
  Swords,
  Target,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Sparkles,
  Search,
  Building2,
  Rocket,
  Landmark,
  Briefcase,
  ChevronRight,
  Flame,
} from 'lucide-react';

interface ThePitTabProps {
  pitAnalysis: {
    benchmarkComparisons: BenchmarkTarget[];
    percentileRank: number;
    redFlagsAndPitfalls: RedFlagPitfall[];
    buzzwordAudit: BuzzwordFound[];
  };
  jobDescriptionMatch?: JobDescriptionMatch;
  onRunCustomPit?: (targetRole: string, jobDescription: string) => void;
  isPitting?: boolean;
}

export const ThePitTab: React.FC<ThePitTabProps> = ({
  pitAnalysis,
  jobDescriptionMatch,
  onRunCustomPit,
  isPitting = false,
}) => {
  const { benchmarkComparisons, percentileRank, redFlagsAndPitfalls, buzzwordAudit } =
    pitAnalysis;

  const [activeTier, setActiveTier] = useState<number>(0);
  const [customRoleInput, setCustomRoleInput] = useState('');
  const [customJdInput, setCustomJdInput] = useState('');

  const getTierIcon = (tier: string) => {
    if (tier.includes('FAANG') || tier.includes('Tier-1')) return Swords;
    if (tier.includes('Startup')) return Rocket;
    if (tier.includes('Fortune')) return Landmark;
    return Building2;
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Exceeds Standard')
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    if (status === 'Meets Standard')
      return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
    if (status === 'Borderline')
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
  };

  const getSeverityBadge = (severity: 'high' | 'medium' | 'low') => {
    if (severity === 'high') return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    if (severity === 'medium') return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
  };

  return (
    <div className="space-y-10">
      {/* Pit Header & Percentile Barometer */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>The Competitive Arena • Real-World Calibration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              "The Pit" Benchmark Arena
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We pit your resume against the ruthless hiring bars of FAANG tech giants,
              high-growth unicorns, Fortune 500 enterprises, and premier consulting firms.
            </p>
          </div>

          {/* Percentile Rank Card */}
          <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-5 flex items-center space-x-5 shadow-xl shrink-0 self-stretch sm:self-auto">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-400 flex flex-col items-center justify-center border border-indigo-500/40 shadow-inner">
              <span className="text-2xl font-black text-white">{percentileRank}th</span>
              <span className="text-[9px] uppercase font-bold text-indigo-300 tracking-wider">
                Percentile
              </span>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">
                Top {100 - percentileRank}% of Candidates
              </div>
              <p className="text-[11px] text-slate-400 max-w-[200px] mt-0.5 leading-snug">
                Calibrated across 15,000+ evaluated tech resumes in this specialization.
              </p>
            </div>
          </div>
        </div>

        {/* Percentile Visual Scale */}
        <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
          <div className="flex justify-between text-[11px] font-semibold text-slate-400">
            <span>Bottom 25%</span>
            <span>Median Candidate (50th)</span>
            <span>Top Tier (85th)</span>
            <span className="text-emerald-400">FAANG Caliber (95th+)</span>
          </div>
          <div className="w-full bg-slate-800/90 rounded-full h-3 relative overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose-500 via-amber-500 via-indigo-500 to-emerald-400 transition-all duration-700"
              style={{ width: `${percentileRank}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 4 Industry Benchmark Pits */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <Swords className="w-5 h-5 text-indigo-400" />
            <span>Pitted Against Industry Tiers</span>
          </h3>
          <p className="text-xs text-slate-400">
            Select an industry tier below to see specific pass/fail bar checks and hiring manager verdict.
          </p>
        </div>

        {/* Tier Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {benchmarkComparisons.map((b, idx) => {
            const Icon = getTierIcon(b.tier);
            const isSelected = activeTier === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTier(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-slate-800 border-indigo-500 shadow-lg shadow-indigo-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`p-2 rounded-xl ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">{b.score}/100</span>
                </div>
                <div className="mt-2.5 font-bold text-xs text-slate-200 truncate">{b.name}</div>
                <span
                  className={`inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded border ${getStatusBadge(
                    b.status
                  )}`}
                >
                  {b.status}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Tier Detailed Card */}
        {benchmarkComparisons[activeTier] && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                  Benchmark Analysis
                </span>
                <h4 className="text-base font-extrabold text-white">
                  {benchmarkComparisons[activeTier].name} ({benchmarkComparisons[activeTier].tier})
                </h4>
              </div>

              <div className="flex items-center space-x-3">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusBadge(
                    benchmarkComparisons[activeTier].status
                  )}`}
                >
                  {benchmarkComparisons[activeTier].status}
                </span>
                <div className="text-right">
                  <span className="text-lg font-black text-white">
                    {benchmarkComparisons[activeTier].score}
                  </span>
                  <span className="text-xs text-slate-400">/100</span>
                </div>
              </div>
            </div>

            {/* Hiring Manager Feedback */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-indigo-300 mr-1.5">Hiring Bar Verdict:</span>
              {benchmarkComparisons[activeTier].feedback}
            </div>

            {/* Checklist of Requirements */}
            <div className="space-y-2">
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                Recruiter Screening Checklist for this Tier:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {benchmarkComparisons[activeTier].keyRequirementChecks.map((req, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs ${
                      req.passed
                        ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-200'
                        : 'bg-rose-500/5 border-rose-500/20 text-slate-300'
                    }`}
                  >
                    <span className="font-medium text-[11px]">{req.name}</span>
                    <span className="flex items-center space-x-1 shrink-0 ml-2">
                      {req.passed ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[10px] text-emerald-400 font-semibold">Pass</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-rose-400" />
                          <span className="text-[10px] text-rose-400 font-semibold">Missing</span>
                        </>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Target Job Description Pit Match */}
      {jobDescriptionMatch && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-emerald-400" />
                <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                  Target Job Description Matcher
                </span>
              </div>
              <h4 className="text-base font-bold text-white mt-0.5">
                {jobDescriptionMatch.targetRoleAnalyzed}
              </h4>
            </div>

            <div className="flex items-center space-x-2 bg-slate-800/90 px-3.5 py-1.5 rounded-xl border border-slate-700">
              <span className="text-xs text-slate-400 font-medium">ATS Match Rate:</span>
              <span className="text-base font-black text-emerald-400">
                {jobDescriptionMatch.matchPercentage}%
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {jobDescriptionMatch.gapAnalysisSummary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Matching Keywords */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Found Matching Keywords ({jobDescriptionMatch.matchingKeywords.length})</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {jobDescriptionMatch.matchingKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium"
                  >
                    ✓ {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Critical Keywords */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-400 flex items-center space-x-1.5">
                  <AlertOctagon className="w-3.5 h-3.5" />
                  <span>Critical Missing Keywords ({jobDescriptionMatch.criticalMissingKeywords.length})</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {jobDescriptionMatch.criticalMissingKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/20 font-medium"
                  >
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Additions */}
          {jobDescriptionMatch.recommendedAdditions.length > 0 && (
            <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs space-y-1.5">
              <span className="font-bold text-indigo-300 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>How to close the keyword gap:</span>
              </span>
              <ul className="space-y-1 text-slate-300 pl-4 list-disc">
                {jobDescriptionMatch.recommendedAdditions.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Red Flags & Formatting Pitfalls Radar */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <span>Red Flags & Pitfalls Radar</span>
          </h3>
          <p className="text-xs text-slate-400">
            Critical issues in wording, formatting, or missing proof points that cause instant recruiter rejection.
          </p>
        </div>

        <div className="space-y-3">
          {redFlagsAndPitfalls.map((flag, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4.5 space-y-2.5 shadow-md"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded border ${getSeverityBadge(
                      flag.severity
                    )}`}
                  >
                    {flag.severity} Severity
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-100">{flag.title}</h4>
                </div>
              </div>

              <p className="text-xs text-slate-300">{flag.description}</p>

              {flag.locationOrExample && (
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300 mr-1.5">Found in PDF:</span>
                  <span className="italic text-rose-300">"{flag.locationOrExample}"</span>
                </div>
              )}

              <div className="flex items-start space-x-2 text-xs text-indigo-300 bg-indigo-950/20 p-2.5 rounded-lg border border-indigo-500/20">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-indigo-200 mr-1">Immediate Fix:</span>
                  <span>{flag.fixAdvice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buzzwords & Fluff Audit */}
      {buzzwordAudit.length > 0 && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Search className="w-4 h-4 text-amber-400" />
              <span>Overused Buzzwords & Filler Audit</span>
            </h3>
            <p className="text-xs text-slate-400">
              Generic buzzwords dilute your technical authority. Replace these with high-signal action verbs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {buzzwordAudit.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-400 line-through">"{item.word}"</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                    Found {item.count}x
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{item.critique}</p>
                <div className="pt-1 border-t border-slate-800/80 text-[11px]">
                  <span className="text-slate-500">Upgrade to:</span>{' '}
                  <span className="font-bold text-emerald-400">{item.suggestedAlternative}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
