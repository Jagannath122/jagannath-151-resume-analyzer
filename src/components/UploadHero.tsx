import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  Sparkles,
  Briefcase,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Zap,
  Target,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { SAMPLE_RESUMES } from '../utils/samplePdfs';

interface UploadHeroProps {
  onFileUpload: (file: File) => void;
  onSelectSample: (id: string) => void;
  targetRole: string;
  setTargetRole: (val: string) => void;
  targetJobDescription: string;
  setTargetJobDescription: (val: string) => void;
  isAnalyzing: boolean;
  statusMessage?: string;
  thoughtSnippet?: string;
  analysisStage?: string;
}

export const UploadHero: React.FC<UploadHeroProps> = ({
  onFileUpload,
  onSelectSample,
  targetRole,
  setTargetRole,
  targetJobDescription,
  setTargetJobDescription,
  isAnalyzing,
  statusMessage,
  thoughtSnippet,
  analysisStage,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showJobTargeting, setShowJobTargeting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        onFileUpload(file);
      } else {
        alert('Please upload a PDF document (.pdf).');
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-12">
      {/* Hero Title */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Multimodal PDF Vision • No Text Copy-Paste Required</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Next-Gen AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-emerald-400">Resume & CV Analyzer</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Upload any PDF resume. Our multimodal AI analyzes the exact document typography,
          visual hierarchy, ATS parsability, and candidate DNA — grading every facility,
          pitting you against FAANG benchmarks, and engineering high-impact prompt refinements.
        </p>
      </div>

      {/* Main Upload Box */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Drag and Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isAnalyzing && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
              : 'border-slate-700/80 hover:border-slate-500 bg-slate-950/60'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept=".pdf,application/pdf"
            className="hidden"
            disabled={isAnalyzing}
          />

          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shadow-inner group-hover:scale-105 transition">
              {isAnalyzing ? (
                <div className="w-8 h-8 border-3 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Upload className="w-8 h-8 text-indigo-400" />
              )}
            </div>

            {isAnalyzing ? (
              <div className="space-y-4 max-w-lg w-full">
                <div className="flex items-center justify-center space-x-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                  </span>
                  <span className="text-xs uppercase tracking-wider font-bold text-indigo-400">
                    {analysisStage === 'thinking' ? 'Deep AI Reasoning Stream' : 'Live Data Stream'}
                  </span>
                </div>

                <p className="text-base font-semibold text-white">
                  {statusMessage || 'Analyzing PDF with Gemini Vision...'}
                </p>

                {/* Live Thought Stream Preview Box */}
                {thoughtSnippet && (
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-indigo-500/30 text-left shadow-lg">
                    <div className="flex items-center space-x-2 text-[11px] font-semibold text-indigo-300 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                      <span>Live AI Model Thoughts:</span>
                    </div>
                    <p className="text-xs font-mono text-slate-300 leading-relaxed italic line-clamp-3">
                      "{thoughtSnippet}"<span className="inline-block w-1.5 h-3 bg-indigo-400 ml-1 animate-pulse" />
                    </p>
                  </div>
                )}

                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-400 h-1.5 rounded-full animate-pulse w-full"></div>
                </div>

                <p className="text-[11px] text-slate-400">
                  Multimodal stream active. The AI is reasoning deeply across ATS rules, metrics, and benchmarks.
                </p>
              </div>
            ) : (
              <div className="space-y-1.5">
                <p className="text-base sm:text-lg font-semibold text-white">
                  Drop your PDF Resume / CV here, or <span className="text-indigo-400 underline">browse files</span>
                </p>
                <p className="text-xs text-slate-400">
                  Supports native PDF format up to 25MB • Analyzed securely directly via Gemini Vision API
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Optional Target Job / Role Benchmark Drawer */}
        <div className="mt-6 border-t border-slate-800/80 pt-4">
          <button
            onClick={() => setShowJobTargeting(!showJobTargeting)}
            className="flex items-center justify-between w-full text-left px-2 py-1 text-xs font-medium text-slate-400 hover:text-slate-200 transition"
          >
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-indigo-400" />
              <span>
                Optional: Pit against a Specific Job Posting or Target Role ({targetRole ? 'Target Active' : 'Auto-infer if empty'})
              </span>
            </div>
            {showJobTargeting ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showJobTargeting && (
            <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Target Job Title (Optional)
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Staff Platform Engineer or Lead Product Manager"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Target Job Description / Requirements (Optional)
                </label>
                <textarea
                  value={targetJobDescription}
                  onChange={(e) => setTargetJobDescription(e.target.value)}
                  rows={3}
                  placeholder="Paste the job description or specific qualifications to simulate ATS keyword matching and qualification gaps..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Instant Test Sample Resumes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Or Test Instantly with Real Sample PDF Resumes</span>
            </h2>
            <p className="text-xs text-slate-400">
              Click any profile below to generate its real PDF document and run the full analyzer in 1 click:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SAMPLE_RESUMES.map((sample) => (
            <div
              key={sample.id}
              onClick={() => !isAnalyzing && onSelectSample(sample.id)}
              className="group bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4 cursor-pointer transition-all duration-200 flex flex-col justify-between shadow-lg relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      sample.accent === 'emerald'
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        : sample.accent === 'amber'
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        : sample.accent === 'indigo'
                        ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                        : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                    }`}
                  >
                    {sample.badge}
                  </span>
                  <FileText className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition">
                    {sample.name}
                  </h3>
                  <div className="text-xs text-slate-400 font-medium">{sample.title}</div>
                  <div className="text-[11px] text-slate-500 mt-1">{sample.level}</div>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-3">
                  {sample.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 font-medium group-hover:translate-x-0.5 transition">
                <span>Analyze this PDF</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Pillars Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-800/60">
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-200">6-Facility Grading System</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Multi-dimensional scoring evaluating Quantifiable Impact, ATS Parsability, Modern Skills Density,
            Brevity & Fluff, Career Trajectory, and 6-Second Visual Scanability.
          </p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-200">"The Pit" Benchmark Arena</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Pits your resume directly against FAANG, Series A-C Startups, and Fortune 500 standards.
            Identifies formatting landmines, overused buzzwords, and exact candidate percentile rank.
          </p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-200">Prompt Refinement & Bullet Lab</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Transforms weak bullets with the Google XYZ formula and executive leadership framing.
            Includes a Prompt Refiner Studio to engineer custom master prompts.
          </p>
        </div>
      </div>
    </div>
  );
};
