import React from 'react';
import { FileText, ShieldAlert, Sparkles, Upload, RefreshCw, Eye, BookOpen, Layers } from 'lucide-react';
import { SAMPLE_RESUMES } from '../utils/samplePdfs';

interface HeaderProps {
  onUploadClick: () => void;
  onSelectSample: (id: string) => void;
  onReset: () => void;
  fileName?: string;
  isAnalyzing: boolean;
  hasAnalysis: boolean;
  isPdfViewerOpen: boolean;
  onTogglePdfViewer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onUploadClick,
  onSelectSample,
  onReset,
  fileName,
  isAnalyzing,
  hasAnalysis,
  isPdfViewerOpen,
  onTogglePdfViewer,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onReset}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight text-white">ResuPulse</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-medium border border-indigo-500/30">
                AI PDF Vision
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Multimodal PDF Resume Analyzer • Facility Grading • The Pit
            </p>
          </div>
        </div>

        {/* Center / Current File */}
        {fileName && hasAnalysis && (
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="truncate max-w-[200px] font-medium text-slate-200">{fileName}</span>
            <span className="text-slate-500">•</span>
            <button
              onClick={onTogglePdfViewer}
              className={`flex items-center space-x-1 px-2 py-0.5 rounded text-xs transition-colors ${
                isPdfViewerOpen
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'text-indigo-400 hover:text-indigo-300 hover:bg-slate-700'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isPdfViewerOpen ? 'Hide PDF' : 'View PDF'}</span>
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Sample Resumes Dropdown / Button */}
          <div className="relative group">
            <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 transition">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Try Samples</span>
              <span className="sm:hidden">Samples</span>
            </button>
            <div className="absolute right-0 top-full mt-1.5 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 hidden group-hover:block transition-all z-50">
              <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800 mb-1">
                Select Instant Test Resume
              </div>
              {SAMPLE_RESUMES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => onSelectSample(sample.id)}
                  disabled={isAnalyzing}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-800/90 transition flex flex-col group/item"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200 group-hover/item:text-indigo-400">
                      {sample.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {sample.level.split(' ')[0]}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 truncate">{sample.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Upload Button */}
          <button
            onClick={onUploadClick}
            disabled={isAnalyzing}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 active:scale-95 transition"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Analyzing PDF...</span>
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5" />
                <span>Upload PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
