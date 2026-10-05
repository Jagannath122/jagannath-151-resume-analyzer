import React, { useState } from 'react';
import { ResumeAnalysisResult, SectionGrading } from '../types/resume';
import {
  BarChart3,
  TrendingUp,
  FileCheck,
  Zap,
  Scissors,
  Eye,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  Wrench,
} from 'lucide-react';

interface FacilitiesGradingTabProps {
  analysis: ResumeAnalysisResult;
}

export const FacilitiesGradingTab: React.FC<FacilitiesGradingTabProps> = ({ analysis }) => {
  const [selectedSection, setSelectedSection] = useState<number | null>(0);
  const { facilityScores, sectionGrading } = analysis;

  const getScoreBadge = (score: number) => {
    if (score >= 85) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    if (score >= 70) return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
    if (score >= 55) return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
  };

  const getProgressBarColor = (score: number) => {
    if (score >= 85) return 'bg-emerald-500';
    if (score >= 70) return 'bg-indigo-500';
    if (score >= 55) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="space-y-10">
      {/* Overview Intro */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <span>Multi-Facility Grading Matrix</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Every resume is evaluated across 6 foundational recruiting facilities. Scores reflect
              strict ATS standards, executive recruiter scans, and industry benchmarks.
            </p>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <span className="flex items-center space-x-1 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>85-100 Elite</span>
            </span>
            <span className="flex items-center space-x-1 text-indigo-400">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              <span>70-84 Good</span>
            </span>
            <span className="flex items-center space-x-1 text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>55-69 Needs Work</span>
            </span>
            <span className="flex items-center space-x-1 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span>&lt;55 Critical</span>
            </span>
          </div>
        </div>
      </div>

      {/* 6 Facility Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Impact & Metrics */}
        <FacilityCard
          title="1. Impact & Metrics"
          icon={TrendingUp}
          score={facilityScores.impact.score}
          verdict={facilityScores.impact.verdict}
          accent="indigo"
          badgeExtra={facilityScores.impact.metricsOrData}
          details={facilityScores.impact.details}
        />

        {/* 2. ATS Formatting & Parsability */}
        <FacilityCard
          title="2. ATS Parsability"
          icon={FileCheck}
          score={facilityScores.atsFormatting.score}
          verdict={facilityScores.atsFormatting.verdict}
          accent="emerald"
          badgeExtra="Layout Parsability"
          details={facilityScores.atsFormatting.details}
          customListTitle="Structural Integrity:"
          customList={facilityScores.atsFormatting.risksOrPros}
        />

        {/* 3. Skills Relevance & Modern Density */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-100">3. Skills Alignment</h3>
              </div>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getScoreBadge(
                  facilityScores.skillsRelevance.score
                )}`}
              >
                {facilityScores.skillsRelevance.score}/100
              </span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full rounded-full ${getProgressBarColor(
                  facilityScores.skillsRelevance.score
                )}`}
                style={{ width: `${facilityScores.skillsRelevance.score}%` }}
              ></div>
            </div>

            <p className="text-xs font-medium text-slate-300">
              {facilityScores.skillsRelevance.verdict}
            </p>

            {/* Hard Skills */}
            <div className="space-y-1 pt-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Detected Hard Skills ({facilityScores.skillsRelevance.detectedHardSkills.length}):
              </span>
              <div className="flex flex-wrap gap-1">
                {facilityScores.skillsRelevance.detectedHardSkills.slice(0, 7).map((skill, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-medium"
                  >
                    {skill}
                  </span>
                ))}
                {facilityScores.skillsRelevance.detectedHardSkills.length > 7 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                    +{facilityScores.skillsRelevance.detectedHardSkills.length - 7} more
                  </span>
                )}
              </div>
            </div>

            {/* Missing Modern Tools */}
            {facilityScores.skillsRelevance.missingModernTools.length > 0 && (
              <div className="space-y-1 pt-1">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  Recommended Additions:
                </span>
                <div className="flex flex-wrap gap-1">
                  {facilityScores.skillsRelevance.missingModernTools.map((tool, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium"
                    >
                      +{tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. Brevity & Conciseness */}
        <FacilityCard
          title="4. Brevity & Density"
          icon={Scissors}
          score={facilityScores.brevity.score}
          verdict={facilityScores.brevity.verdict}
          accent="amber"
          badgeExtra={`~${facilityScores.brevity.fluffWordCountEstimate} fluff words`}
          details={facilityScores.brevity.details}
        />

        {/* 5. Career Progression & Narrative */}
        <FacilityCard
          title="5. Progression & Trajectory"
          icon={BarChart3}
          score={facilityScores.progression.score}
          verdict={facilityScores.progression.verdict}
          accent="blue"
          details={facilityScores.progression.details}
        />

        {/* 6. Visual & Layout Design */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400">
                  <Eye className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-100">6. Visual Hierarchy</h3>
              </div>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getScoreBadge(
                  facilityScores.visualHierarchy.score
                )}`}
              >
                {facilityScores.visualHierarchy.score}/100
              </span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full rounded-full ${getProgressBarColor(
                  facilityScores.visualHierarchy.score
                )}`}
                style={{ width: `${facilityScores.visualHierarchy.score}%` }}
              ></div>
            </div>

            <p className="text-xs font-medium text-slate-300">
              {facilityScores.visualHierarchy.verdict}
            </p>

            <div className="space-y-2 pt-1 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                  Layout Strengths:
                </span>
                {facilityScores.visualHierarchy.layoutPros.map((pro, i) => (
                  <div key={i} className="flex items-start space-x-1.5 text-slate-300 text-[11px]">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </div>
                ))}
              </div>

              {facilityScores.visualHierarchy.layoutCons.length > 0 && (
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    Design Weaknesses:
                  </span>
                  {facilityScores.visualHierarchy.layoutCons.map((con, i) => (
                    <div key={i} className="flex items-start space-x-1.5 text-slate-300 text-[11px]">
                      <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                      <span>{con}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section-by-Section Facility Checklist */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Wrench className="w-4 h-4 text-indigo-400" />
              <span>Section-by-Section Facility Breakdown</span>
            </h3>
            <p className="text-xs text-slate-400">
              Granular inspection of every resume section with specific fix recommendations.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {sectionGrading.map((section, idx) => {
            const isOpen = selectedSection === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => setSelectedSection(isOpen ? null : idx)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-800/50 transition"
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded border ${
                        section.status === 'Strong'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : section.status === 'Needs Improvement'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}
                    >
                      {section.status}
                    </span>
                    <span className="font-semibold text-sm text-slate-200">
                      {section.sectionName}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-slate-400">Facility Score:</span>
                      <span className="font-bold text-sm text-white">{section.score}/100</span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-4 pt-2 border-t border-slate-800/80 bg-slate-950/40 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    {/* Strengths */}
                    <div className="space-y-2 p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                      <div className="font-bold text-emerald-400 flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Strengths</span>
                      </div>
                      <ul className="space-y-1.5 text-slate-300">
                        {section.strengths.map((str, i) => (
                          <li key={i} className="flex items-start space-x-1.5">
                            <span className="text-emerald-500">•</span>
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Weaknesses */}
                    <div className="space-y-2 p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                      <div className="font-bold text-amber-400 flex items-center space-x-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Gaps & Issues</span>
                      </div>
                      <ul className="space-y-1.5 text-slate-300">
                        {section.weaknesses.map((w, i) => (
                          <li key={i} className="flex items-start space-x-1.5">
                            <span className="text-amber-500">•</span>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actionable Recommendations */}
                    <div className="space-y-2 p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                      <div className="font-bold text-indigo-400 flex items-center space-x-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Actionable Fix</span>
                      </div>
                      <ul className="space-y-1.5 text-slate-300">
                        {section.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start space-x-1.5">
                            <span className="text-indigo-400">→</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const FacilityCard: React.FC<{
  title: string;
  icon: any;
  score: number;
  verdict: string;
  accent: string;
  badgeExtra?: string;
  details: string[];
  customListTitle?: string;
  customList?: string[];
}> = ({
  title,
  icon: Icon,
  score,
  verdict,
  badgeExtra,
  details,
  customListTitle,
  customList,
}) => {
  const getBadgeColor = (s: number) => {
    if (s >= 85) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    if (s >= 70) return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
    if (s >= 55) return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
  };

  const getProgressColor = (s: number) => {
    if (s >= 85) return 'bg-emerald-500';
    if (s >= 70) return 'bg-indigo-500';
    if (s >= 55) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Icon className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-100">{title}</h3>
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getBadgeColor(score)}`}>
            {score}/100
          </span>
        </div>

        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full rounded-full ${getProgressColor(score)}`}
            style={{ width: `${score}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <p className="font-medium text-slate-300">{verdict}</p>
          {badgeExtra && (
            <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              {badgeExtra}
            </span>
          )}
        </div>

        <ul className="space-y-1.5 text-xs text-slate-300 pt-1">
          {details.map((detail, i) => (
            <li key={i} className="flex items-start space-x-1.5">
              <span className="text-indigo-400 text-xs">•</span>
              <span className="text-[11px] leading-relaxed">{detail}</span>
            </li>
          ))}
        </ul>

        {customList && customList.length > 0 && (
          <div className="pt-2 border-t border-slate-800/80">
            {customListTitle && (
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                {customListTitle}
              </span>
            )}
            <ul className="mt-1 space-y-1 text-[11px] text-slate-300">
              {customList.map((item, i) => (
                <li key={i} className="flex items-start space-x-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
