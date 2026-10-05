import React, { useState } from 'react';
import { CareerStrategy } from '../types/resume';
import {
  Compass,
  HelpCircle,
  Calendar,
  Linkedin,
  Copy,
  Check,
  Briefcase,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface CareerStrategyTabProps {
  careerStrategy: CareerStrategy;
  candidateName: string;
  detectedTitle: string;
}

export const CareerStrategyTab: React.FC<CareerStrategyTabProps> = ({
  careerStrategy,
  candidateName,
  detectedTitle,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-10">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Target Role Alignment & Strategic Readiness</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Career Strategy & Interview Armor
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Anticipate the toughest behavioral and technical questions hiring managers will ask based
            specifically on the gaps, ambiguities, or tenure lengths found in this PDF resume.
          </p>
        </div>
      </div>

      {/* Part 1: Probable Interview Questions based on Resume Weak Spots */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            <span>Predicted Interview Questions (Targeting Your Resume Gaps)</span>
          </h3>
          <p className="text-xs text-slate-400">
            Hiring managers hone in on unverified claims or omitted metrics. Prepare these bulletproof talking points:
          </p>
        </div>

        <div className="space-y-4">
          {careerStrategy.probableInterviewQuestions.map((q, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-slate-100 leading-snug">
                    "{q.question}"
                  </h4>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 shrink-0">
                  Behavioral / Technical
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
                <span className="font-semibold text-rose-300">Why they ask this:</span>{' '}
                {q.reasonWhyAsked}
              </div>

              <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 space-y-1">
                <span className="font-bold text-indigo-300 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span>Winning Talking Point & Framing:</span>
                </span>
                <p className="text-slate-300 leading-relaxed pl-4">{q.suggestedTalkingPoint}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: 30-60-90 Day Plan & Next Roles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 30-60-90 Day Strategy */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <h4 className="text-base font-bold text-white">
              30-60-90 Day Executive Roadmap
            </h4>
          </div>
          <p className="text-xs text-slate-400">
            A tailored execution framework demonstrating strategic foresight in executive interviews.
          </p>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed whitespace-pre-line">
            {careerStrategy.thirtySixtyNinetySummary}
          </div>
        </div>

        {/* LinkedIn Headline & Next Roles */}
        <div className="lg:col-span-5 space-y-6">
          {/* LinkedIn Headline */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-indigo-400">
                <Linkedin className="w-4 h-4" />
                <h4 className="text-sm font-bold text-white">Optimized LinkedIn Headline</h4>
              </div>
              <button
                onClick={() =>
                  handleCopy(careerStrategy.suggestedLinkedInHeadline, 'headline')
                }
                className="text-xs text-slate-400 hover:text-indigo-300 flex items-center space-x-1"
              >
                {copiedKey === 'headline' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedKey === 'headline' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-medium text-slate-200 leading-relaxed font-mono">
              "{careerStrategy.suggestedLinkedInHeadline}"
            </div>
          </div>

          {/* Recommended Next Roles */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg">
            <div className="flex items-center space-x-2 text-indigo-400">
              <Briefcase className="w-4 h-4" />
              <h4 className="text-sm font-bold text-white">Recommended Target Titles</h4>
            </div>

            <div className="space-y-2">
              {careerStrategy.recommendedNextRoles.map((role, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-200"
                >
                  <span className="font-semibold">{role}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
