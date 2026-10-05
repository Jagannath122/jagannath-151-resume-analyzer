import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { UploadHero } from './components/UploadHero';
import { CandidateDnaBanner } from './components/CandidateDnaBanner';
import { FacilitiesGradingTab } from './components/FacilitiesGradingTab';
import { ThePitTab } from './components/ThePitTab';
import { PromptRefinementTab } from './components/PromptRefinementTab';
import { CareerStrategyTab } from './components/CareerStrategyTab';
import { PdfViewerPanel } from './components/PdfViewerPanel';
import { ExportReportModal } from './components/ExportReportModal';
import { ResumeAnalysisResult } from './types/resume';
import { generateSamplePdf, SAMPLE_RESUMES } from './utils/samplePdfs';
import {
  FileText,
  Layers,
  Swords,
  Sparkles,
  Compass,
  AlertCircle,
  Eye,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

export default function App() {
  const [analysis, setAnalysis] = useState<ResumeAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [pdfBase64, setPdfBase64] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [fileSizeKb, setFileSizeKb] = useState<number>(0);

  const [targetRole, setTargetRole] = useState('');
  const [targetJobDescription, setTargetJobDescription] = useState('');

  const [activeTab, setActiveTab] = useState<
    'facilities' | 'pit' | 'promptRefinement' | 'careerStrategy'
  >('facilities');

  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [geminiConfigured, setGeminiConfigured] = useState<boolean | null>(null);
  const [maxPdfBytes, setMaxPdfBytes] = useState(2.5 * 1024 * 1024);
  const [isVercelDeployment, setIsVercelDeployment] = useState(false);

  useEffect(() => {
    fetch('/api/health')
      .then((response) => response.ok ? response.json() : null)
      .then((health) => {
        if (health) {
          setGeminiConfigured(Boolean(health.geminiConfigured));
          if (Number.isFinite(health.maxPdfBytes) && health.maxPdfBytes > 0) {
            setMaxPdfBytes(health.maxPdfBytes);
          }
          setIsVercelDeployment(Boolean(health.isVercel));
        }
      })
      .catch(() => setGeminiConfigured(null));
  }, []);

  // File Upload handler
  const handleFileUpload = (file: File) => {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMessage('Please upload a PDF document (.pdf).');
      return;
    }
    if (file.size > maxPdfBytes) {
      const maxSizeMb = (maxPdfBytes / (1024 * 1024)).toFixed(1);
      setErrorMessage(`This PDF exceeds the ${maxSizeMb} MB upload limit. Please choose a smaller file.`);
      return;
    }

    setFileName(file.name);
    setFileSizeKb(Math.round(file.size / 1024));
    setErrorMessage(null);
    setIsAnalyzing(true);
    setStatusMessage('Reading PDF binary stream...');

    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result as string;
      const cleanBase64 = result.replace(/^data:application\/pdf;base64,/, '');
      setPdfBase64(cleanBase64);
      await runAnalysis(cleanBase64, file.name, Math.round(file.size / 1024));
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read the PDF file.');
      setIsAnalyzing(false);
    };
    reader.readAsDataURL(file);
  };

  // Sample Selection handler
  const handleSelectSample = async (id: string) => {
    setErrorMessage(null);
    setIsAnalyzing(true);
    setStatusMessage('Generating authentic PDF test document...');

    try {
      const sample = await generateSamplePdf(id);
      setPdfBase64(sample.base64);
      setFileName(sample.fileName);
      setFileSizeKb(sample.fileSizeKb);

      // Pre-fill target role if empty
      const sampleMeta = SAMPLE_RESUMES.find((s) => s.id === id);
      if (sampleMeta && !targetRole) {
        setTargetRole(sampleMeta.title);
      }

      await runAnalysis(sample.base64, sample.fileName, sample.fileSizeKb);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to generate sample PDF.');
      setIsAnalyzing(false);
    }
  };

  // API Call to analyze PDF
  const runAnalysis = async (base64: string, name: string, sizeKb: number) => {
    try {
      setStatusMessage('Gemini Multimodal Vision: Analyzing layout, typography & parsing text...');
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdfBase64: base64,
          targetRole,
          targetJobDescription,
          fileName: name,
          fileSizeKb: sizeKb,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      setStatusMessage('Scoring facilities, benchmarking the pit & engineering prompt refinements...');
      const data: ResumeAnalysisResult = await response.json();
      setAnalysis(data);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setErrorMessage(err.message || 'Failed to complete resume analysis.');
    } finally {
      setIsAnalyzing(false);
      setStatusMessage('');
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setPdfBase64('');
    setFileName('');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-white">
      {/* Header */}
      <Header
        onUploadClick={() => setAnalysis(null)}
        onSelectSample={handleSelectSample}
        onReset={handleReset}
        fileName={fileName}
        isAnalyzing={isAnalyzing}
        hasAnalysis={!!analysis}
        isPdfViewerOpen={isPdfViewerOpen}
        onTogglePdfViewer={() => setIsPdfViewerOpen(!isPdfViewerOpen)}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {geminiConfigured === false && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm">
            <span className="font-bold">Gemini API key required:</span>{' '}
            {isVercelDeployment
              ? 'Add GEMINI_API_KEY to your Vercel project’s Production environment variables, then redeploy to enable resume analysis and AI refinement.'
              : 'Add GEMINI_API_KEY to .env.local, then restart the server to enable resume analysis and AI refinement.'}
          </div>
        )}

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-start space-x-3 text-xs sm:text-sm">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold">Analysis Notice:</span> {errorMessage}
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-rose-400 hover:text-rose-200 text-xs font-semibold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* State 1: Upload Hero Screen */}
        {!analysis && (
          <UploadHero
            onFileUpload={handleFileUpload}
            onSelectSample={handleSelectSample}
            targetRole={targetRole}
            setTargetRole={setTargetRole}
            targetJobDescription={targetJobDescription}
            setTargetJobDescription={setTargetJobDescription}
            isAnalyzing={isAnalyzing}
            statusMessage={statusMessage}
          />
        )}

        {/* State 2: Detailed Dashboard Screen */}
        {analysis && (
          <div className="space-y-8">
            {/* Candidate DNA Banner */}
            <CandidateDnaBanner
              profile={analysis.candidateProfile}
              overallScore={analysis.overallScore}
              overallGrade={analysis.overallGrade}
              atsParsabilityScore={analysis.atsParsabilityScore}
              onOpenPdfViewer={() => setIsPdfViewerOpen(true)}
              onExportReport={() => setIsExportModalOpen(true)}
              onUploadNew={() => setAnalysis(null)}
              pdfFileName={analysis.pdfFileName}
            />

            {/* Navigation Tabs */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-1 overflow-x-auto scrollbar-none">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <TabButton
                  label="6-Facility Grading"
                  icon={Layers}
                  badge={`${analysis.overallScore}/100`}
                  active={activeTab === 'facilities'}
                  onClick={() => setActiveTab('facilities')}
                />
                <TabButton
                  label="'The Pit' Arena"
                  icon={Swords}
                  badge={`${analysis.pitAnalysis.percentileRank}th %ile`}
                  active={activeTab === 'pit'}
                  onClick={() => setActiveTab('pit')}
                />
                <TabButton
                  label="Prompt Refinement & Bullet Lab"
                  icon={Sparkles}
                  badge={`${analysis.weakBulletPoints.length} Optimized`}
                  active={activeTab === 'promptRefinement'}
                  onClick={() => setActiveTab('promptRefinement')}
                />
                <TabButton
                  label="Career Strategy"
                  icon={Compass}
                  active={activeTab === 'careerStrategy'}
                  onClick={() => setActiveTab('careerStrategy')}
                />
              </div>

              {/* Side toggle to open PDF */}
              <button
                onClick={() => setIsPdfViewerOpen(!isPdfViewerOpen)}
                className={`hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                  isPdfViewerOpen
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isPdfViewerOpen ? 'Close PDF Viewer' : 'View PDF Source'}</span>
              </button>
            </div>

            {/* Tab Body with Optional Split Screen when PDF viewer is open */}
            <div className="grid grid-cols-1 gap-8">
              {/* Tab Content */}
              <div>
                {activeTab === 'facilities' && <FacilitiesGradingTab analysis={analysis} />}

                {activeTab === 'pit' && (
                  <ThePitTab
                    pitAnalysis={analysis.pitAnalysis}
                    jobDescriptionMatch={analysis.jobDescriptionMatch}
                  />
                )}

                {activeTab === 'promptRefinement' && (
                  <PromptRefinementTab
                    weakBulletPoints={analysis.weakBulletPoints}
                    promptRecipes={analysis.promptRefinementSuggestions}
                    candidateRole={analysis.candidateProfile.detectedTitle}
                  />
                )}

                {activeTab === 'careerStrategy' && (
                  <CareerStrategyTab
                    careerStrategy={analysis.careerStrategy}
                    candidateName={analysis.candidateProfile.name}
                    detectedTitle={analysis.candidateProfile.detectedTitle}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating / Docked PDF Viewer */}
      {isPdfViewerOpen && pdfBase64 && (
        <PdfViewerPanel
          pdfBase64={pdfBase64}
          fileName={fileName}
          fileSizeKb={fileSizeKb}
          onClose={() => setIsPdfViewerOpen(false)}
          isFloating={true}
        />
      )}

      {/* Export Report Modal */}
      {isExportModalOpen && analysis && (
        <ExportReportModal
          analysis={analysis}
          onClose={() => setIsExportModalOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-400">
        <p>
          ResuPulse AI • Multimodal PDF Vision & Resume Grading Architecture • Powered by Google Gemini
        </p>
      </footer>
    </div>
  );
}

const TabButton: React.FC<{
  label: string;
  icon: any;
  badge?: string;
  active: boolean;
  onClick: () => void;
}> = ({ label, icon: Icon, badge, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
        active
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
      }`}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span>{label}</span>
      {badge && (
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            active ? 'bg-indigo-500/40 text-white' : 'bg-slate-800 text-slate-400'
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
};
