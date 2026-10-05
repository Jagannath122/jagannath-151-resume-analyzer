import React, { useState } from 'react';
import { Eye, Download, X, Maximize2, Minimize2, FileText, AlertCircle } from 'lucide-react';

interface PdfViewerPanelProps {
  pdfBase64: string;
  fileName: string;
  fileSizeKb: number;
  onClose: () => void;
  isFloating?: boolean;
}

export const PdfViewerPanel: React.FC<PdfViewerPanelProps> = ({
  pdfBase64,
  fileName,
  fileSizeKb,
  onClose,
  isFloating = false,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const cleanBase64 = pdfBase64.replace(/^data:application\/pdf;base64,/, '');
  const pdfDataUri = `data:application/pdf;base64,${cleanBase64}`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfDataUri;
    link.download = fileName || 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={`bg-slate-900 border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col ${
        isFullscreen
          ? 'fixed inset-4 z-50'
          : isFloating
          ? 'fixed bottom-6 right-6 w-[420px] h-[580px] z-40'
          : 'w-full h-full min-h-[600px]'
      }`}
    >
      {/* Top Bar */}
      <div className="bg-slate-800/90 border-b border-slate-700/70 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2.5 truncate">
          <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
            <FileText className="w-4 h-4" />
          </div>
          <div className="truncate">
            <div className="text-xs font-semibold text-slate-100 truncate">{fileName}</div>
            <div className="text-[10px] text-slate-400">
              {fileSizeKb} KB • Direct Multimodal PDF Stream
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            onClick={handleDownload}
            title="Download PDF"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            title="Close Viewer"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PDF Container */}
      <div className="flex-1 bg-slate-950 relative w-full h-full">
        <object
          data={pdfDataUri}
          type="application/pdf"
          className="w-full h-full border-none"
        >
          {/* Fallback if browser inline PDF viewer is blocked */}
          <div className="flex flex-col items-center justify-center p-8 text-center h-full text-slate-400 space-y-3">
            <AlertCircle className="w-10 h-10 text-amber-400" />
            <p className="text-sm text-slate-300">
              PDF preview could not be rendered directly in this container.
            </p>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium"
            >
              Download PDF File
            </button>
          </div>
        </object>
      </div>
    </div>
  );
};
