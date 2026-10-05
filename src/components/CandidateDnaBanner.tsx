import React from 'react';
import {
  CandidateProfile,
  ContactInfoAudit,
} from '../types/resume';
import {
  Award,
  Zap,
  Mail,
  Phone,
  Linkedin,
  Github,
  MapPin,
  CheckCircle2,
  XCircle,
  Eye,
  Download,
  UploadCloud,
  TrendingUp,
  FileCheck,
} from 'lucide-react';

interface CandidateDnaBannerProps {
  profile: CandidateProfile;
  overallScore: number;
  overallGrade: string;
  atsParsabilityScore: number;
  onOpenPdfViewer: () => void;
  onExportReport: () => void;
  onUploadNew: () => void;
  pdfFileName: string;
}

export const CandidateDnaBanner: React.FC<CandidateDnaBannerProps> = ({
  profile,
  overallScore,
  overallGrade,
  atsParsabilityScore,
  onOpenPdfViewer,
  onExportReport,
  onUploadNew,
  pdfFileName,
}) => {
  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'from-emerald-500 to-teal-500 text-emerald-300 border-emerald-500/30';
    if (grade.startsWith('B')) return 'from-indigo-500 to-blue-500 text-indigo-300 border-indigo-500/30';
    if (grade.startsWith('C')) return 'from-amber-500 to-yellow-500 text-amber-300 border-amber-500/30';
    return 'from-rose-500 to-red-500 text-rose-300 border-rose-500/30';
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400 stroke-emerald-400';
    if (score >= 70) return 'text-indigo-400 stroke-indigo-400';
    if (score >= 55) return 'text-amber-400 stroke-amber-400';
    return 'text-rose-400 stroke-rose-400';
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Decorative gradient accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left: Candidate DNA & Title */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold tracking-wide">
              {profile.seniorityLevel}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-medium">
              {profile.yearsOfExperienceInferred} Inferred Exp
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
              {profile.primaryDomain}
            </span>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Candidate DNA Profile
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>{profile.name}</span>
            </h1>
            <p className="text-base sm:text-lg font-semibold text-indigo-400 mt-0.5">
              {profile.detectedTitle}
            </p>
            <p className="text-xs text-slate-400 italic mt-0.5 flex items-center gap-1.5">
              <span className="text-slate-500">Archetype:</span>
              <span className="text-slate-200 font-medium">"{profile.candidateArchetype}"</span>
            </p>
          </div>

          {/* Superpower Pill */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-950/70 via-slate-900 to-indigo-950/40 border border-indigo-500/20 flex items-start space-x-2.5">
            <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wide mr-1.5">
                Core Superpower:
              </span>
              <span className="text-xs text-slate-200 leading-relaxed">
                {profile.coreSuperpower}
              </span>
            </div>
          </div>

          {/* Contact Info Audit */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] text-slate-400 font-medium mr-1">ATS Contact Audit:</span>
            <ContactBadge label="Email" found={profile.contactInfoAudit.emailFound} icon={Mail} />
            <ContactBadge label="Phone" found={profile.contactInfoAudit.phoneFound} icon={Phone} />
            <ContactBadge label="LinkedIn" found={profile.contactInfoAudit.linkedinFound} icon={Linkedin} />
            <ContactBadge label="Portfolio/GitHub" found={profile.contactInfoAudit.githubOrPortfolioFound} icon={Github} />
            <ContactBadge label="Location" found={profile.contactInfoAudit.locationFound} icon={MapPin} />
          </div>
        </div>

        {/* Right: Scores & Grade Badge */}
        <div className="flex flex-row sm:flex-row items-center gap-6 self-center lg:self-auto w-full lg:w-auto justify-around lg:justify-end border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-800">
          {/* Overall Score Circle */}
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.2"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={getScoreColor(overallScore)}
                  strokeDasharray={`${overallScore}, 100`}
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-white">{overallScore}</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">out of 100</span>
              </div>
            </div>
            <span className="text-xs font-semibold text-slate-300 mt-1">Facility Index</span>
          </div>

          {/* Letter Grade */}
          <div className="flex flex-col items-center">
            <div
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getGradeColor(
                overallGrade
              )} border flex flex-col items-center justify-center shadow-lg`}
            >
              <span className="text-3xl font-black">{overallGrade}</span>
              <span className="text-[9px] font-bold uppercase tracking-wider opacity-80">Grade</span>
            </div>
            <span className="text-xs font-semibold text-slate-300 mt-1">Overall Tier</span>
          </div>

          {/* ATS Parsability */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col items-center justify-center text-center p-2">
              <FileCheck className="w-5 h-5 text-indigo-400 mb-0.5" />
              <span className="text-lg font-black text-white">{atsParsabilityScore}%</span>
              <span className="text-[9px] font-semibold text-slate-400 uppercase">ATS Score</span>
            </div>
            <span className="text-xs font-semibold text-slate-300 mt-1">Parsability</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Action buttons */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span className="font-medium text-slate-300">{pdfFileName}</span>
          <span>•</span>
          <span>Only direct PDF input evaluated</span>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={onOpenPdfViewer}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition"
          >
            <Eye className="w-3.5 h-3.5 text-indigo-400" />
            <span>Inspect PDF</span>
          </button>
          <button
            onClick={onExportReport}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Report</span>
          </button>
          <button
            onClick={onUploadNew}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 transition"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Analyze Another PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const ContactBadge: React.FC<{ label: string; found: boolean; icon: any }> = ({
  label,
  found,
  icon: Icon,
}) => {
  return (
    <div
      className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[11px] font-medium border ${
        found
          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
          : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
      }`}
    >
      <Icon className="w-3 h-3" />
      <span>{label}</span>
      {found ? (
        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
      ) : (
        <XCircle className="w-2.5 h-2.5 text-rose-400" />
      )}
    </div>
  );
};
