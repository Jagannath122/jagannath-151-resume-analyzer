import React, { useState } from 'react';
import { WeakBulletPoint, PromptRefinementRecipe } from '../types/resume';
import { refineBullet, refinePrompt } from '../services/gemini';
import {
  Sparkles,
  Scissors,
  TrendingUp,
  Award,
  Copy,
  Check,
  Wand2,
  RefreshCw,
  Send,
  BookOpen,
  ArrowRight,
  Code,
  Sliders,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';

interface PromptRefinementTabProps {
  weakBulletPoints: WeakBulletPoint[];
  promptRecipes: PromptRefinementRecipe[];
  candidateRole: string;
}

export const PromptRefinementTab: React.FC<PromptRefinementTabProps> = ({
  weakBulletPoints,
  promptRecipes,
  candidateRole,
}) => {
  // State for Bullet Lab
  const [selectedBulletId, setSelectedBulletId] = useState<string>(
    weakBulletPoints[0]?.id || ''
  );
  const [activeStyle, setActiveStyle] = useState<
    'xyzFormula' | 'quantified' | 'executive' | 'concise'
  >('xyzFormula');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Custom bullet rewrite state
  const [customInstruction, setCustomInstruction] = useState('');
  const [isRefiningBullet, setIsRefiningBullet] = useState(false);
  const [customRewrites, setCustomRewrites] = useState<any[] | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // State for Prompt Refiner Studio
  const [userDraftPrompt, setUserDraftPrompt] = useState(
    'Rewrite my work experience bullet points to sound much more senior and impressive for top tech companies'
  );
  const [isRefiningPrompt, setIsRefiningPrompt] = useState(false);
  const [refinedPromptResult, setRefinedPromptResult] = useState<any | null>(null);

  const currentBullet =
    weakBulletPoints.find((b) => b.id === selectedBulletId) || weakBulletPoints[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCustomRewrite = async () => {
    if (!currentBullet) return;
    setIsRefiningBullet(true);
    setApiError(null);
    try {
      const data = await refineBullet({
        bullet: currentBullet.original,
        targetRole: candidateRole,
        style: 'custom',
        customInstruction,
      });
      if (data?.options) {
        setCustomRewrites(data.options);
      }
    } catch (err) {
      console.error('Failed to rewrite bullet:', err);
      setApiError(err instanceof Error ? err.message : 'Failed to rewrite the bullet.');
    } finally {
      setIsRefiningBullet(false);
    }
  };

  const handleRefineUserPrompt = async () => {
    if (!userDraftPrompt.trim()) return;
    setIsRefiningPrompt(true);
    setApiError(null);
    try {
      const data = await refinePrompt({
        userPrompt: userDraftPrompt,
        candidateRole,
        sampleBullet: currentBullet?.original || 'Managed team and built software updates for web portal.',
      });
      setRefinedPromptResult(data);
    } catch (err) {
      console.error('Failed to refine prompt:', err);
      setApiError(err instanceof Error ? err.message : 'Failed to refine the prompt.');
    } finally {
      setIsRefiningPrompt(false);
    }
  };

  return (
    <div className="space-y-12">
      {apiError && (
        <div role="alert" className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm">
          {apiError}
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/40 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Wand2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Prompt Refinement & Bullet Optimization Lab</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Prompt Refinement & Bullet Point Lab
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Eliminate weak passive bullets identified directly in your PDF. Compare instant Google XYZ
            transformations, or use the Prompt Refiner Studio to engineer production-grade AI prompts.
          </p>
        </div>
      </div>

      {/* Part 1: Interactive Bullet Rewriter Lab */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span>Weak Bullet Point Optimizer</span>
          </h3>
          <p className="text-xs text-slate-400">
            Select any underperforming bullet extracted from your PDF to view 4 AI-optimized rewrite styles.
          </p>
        </div>

        {weakBulletPoints.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center text-slate-400 text-xs">
            No critical weak bullets detected in this resume! Great job.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: List of extracted weak bullets */}
            <div className="lg:col-span-5 space-y-2.5">
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                Extracted PDF Bullets ({weakBulletPoints.length}):
              </span>
              {weakBulletPoints.map((item, idx) => {
                const isSelected = item.id === currentBullet?.id;
                return (
                  <div
                    key={item.id || idx}
                    onClick={() => {
                      setSelectedBulletId(item.id);
                      setCustomRewrites(null);
                    }}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-slate-800 border-indigo-500 shadow-md'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span className="font-semibold text-indigo-400">{item.section}</span>
                      <span className="text-rose-400 font-medium">Needs Impact</span>
                    </div>
                    <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                      "{item.original}"
                    </p>
                    <div className="mt-2 text-[10px] text-slate-400 italic truncate">
                      {item.critique}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Interactive Rewriting Studio */}
            {currentBullet && (
              <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
                {/* Original Bullet with Critique */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Original Bullet in PDF:
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30">
                      {currentBullet.section}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-mono bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    "{currentBullet.original}"
                  </p>
                  <p className="text-[11px] text-amber-300">
                    <span className="font-bold">Critique:</span> {currentBullet.critique}
                  </p>
                </div>

                {/* Style Selector Tabs */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">Select Rewrite Lens:</span>
                    <span className="text-[10px] text-slate-400">1-click to preview formula</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <StyleButton
                      title="Google XYZ"
                      subtitle="Formula Standard"
                      icon={TrendingUp}
                      active={activeStyle === 'xyzFormula'}
                      onClick={() => setActiveStyle('xyzFormula')}
                    />
                    <StyleButton
                      title="Quantified"
                      subtitle="Metrics Injected"
                      icon={Sparkles}
                      active={activeStyle === 'quantified'}
                      onClick={() => setActiveStyle('quantified')}
                    />
                    <StyleButton
                      title="Executive"
                      subtitle="Leadership Voice"
                      icon={Award}
                      active={activeStyle === 'executive'}
                      onClick={() => setActiveStyle('executive')}
                    />
                    <StyleButton
                      title="Concise"
                      subtitle="Cut 40% Fluff"
                      icon={Scissors}
                      active={activeStyle === 'concise'}
                      onClick={() => setActiveStyle('concise')}
                    />
                  </div>
                </div>

                {/* Optimized Output Card */}
                <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-300 flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      <span>
                        {activeStyle === 'xyzFormula' && 'Google XYZ Formula Transformation'}
                        {activeStyle === 'quantified' && 'Metrics & Scale Enriched'}
                        {activeStyle === 'executive' && 'Executive Leadership & Ownership'}
                        {activeStyle === 'concise' && 'Ultra-Concise High-Density Version'}
                      </span>
                    </span>

                    <button
                      onClick={() =>
                        handleCopy(
                          currentBullet.optimizedVersions[activeStyle],
                          `opt-${currentBullet.id}-${activeStyle}`
                        )
                      }
                      className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-[11px] font-semibold text-white shadow-sm transition"
                    >
                      {copiedId === `opt-${currentBullet.id}-${activeStyle}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-300" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-white leading-relaxed font-medium bg-slate-900/90 p-3 rounded-xl border border-indigo-500/20">
                    "{currentBullet.optimizedVersions[activeStyle]}"
                  </p>
                </div>

                {/* Custom Instruction Box */}
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <span className="text-[11px] font-semibold text-slate-300">
                    Or Give Custom AI Guidance:
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customInstruction}
                      onChange={(e) => setCustomInstruction(e.target.value)}
                      placeholder="e.g. Frame for Amazon AWS leadership principles, or add FinTech scale..."
                      className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      onClick={handleCustomRewrite}
                      disabled={isRefiningBullet}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold text-indigo-300 flex items-center space-x-1.5 transition disabled:opacity-50"
                    >
                      {isRefiningBullet ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      <span>Rewrite</span>
                    </button>
                  </div>

                  {/* Custom Rewrites Results */}
                  {customRewrites && (
                    <div className="mt-3 space-y-2 pt-2 border-t border-slate-800/80">
                      <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                        Tailored AI Variations:
                      </span>
                      {customRewrites.map((opt, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-200">{opt.title}</span>
                            <button
                              onClick={() => handleCopy(opt.rewrittenText, `custom-${i}`)}
                              className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
                            >
                              {copiedId === `custom-${i}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedId === `custom-${i}` ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                          <p className="text-slate-300 text-[11px]">"{opt.rewrittenText}"</p>
                          <div className="text-[10px] text-slate-400 italic">{opt.explanation}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Part 2: Prompt Refiner Studio (Turn rough user prompt into Master Prompt) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <Code className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg font-bold text-white">Prompt Refinement Studio</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Turn your rough, vague prompt into an industrial-grade Master System Prompt with XML tags,
              negative constraints, and candidate context.
            </p>
          </div>
        </div>

        {/* Input */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300">
            Enter your rough prompt to refine:
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={userDraftPrompt}
              onChange={(e) => setUserDraftPrompt(e.target.value)}
              placeholder="e.g. Make my resume bullets sound senior and impressive"
              className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleRefineUserPrompt}
              disabled={isRefiningPrompt}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white shadow-md shadow-indigo-600/25 flex items-center justify-center space-x-2 transition disabled:opacity-50"
            >
              {isRefiningPrompt ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Refining Prompt...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Engineer Master Prompt</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Prompt Refinement Output */}
        {refinedPromptResult && (
          <div className="space-y-5 pt-2">
            {/* Critique */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
              <span className="font-bold text-amber-300">Prompt Engineering Diagnostic:</span>
              <p className="text-slate-300 leading-relaxed">{refinedPromptResult.critique}</p>
            </div>

            {/* Master System Prompt */}
            <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 flex items-center space-x-1.5">
                  <Code className="w-3.5 h-3.5" />
                  <span>Engineered Master System Prompt</span>
                </span>
                <button
                  onClick={() =>
                    handleCopy(refinedPromptResult.masterPrompt, 'master-prompt')
                  }
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition"
                >
                  {copiedId === 'master-prompt' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Master Prompt</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-[11px] font-mono text-slate-300 bg-slate-900/90 p-3 rounded-lg border border-slate-800 overflow-x-auto whitespace-pre-wrap max-h-56">
                {refinedPromptResult.masterPrompt}
              </pre>
            </div>

            {/* Execution Preview */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live Execution Preview (Tested on Your Resume):</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">Input Text:</span>
                  <p className="text-slate-300 italic">"{refinedPromptResult.executionPreview.before}"</p>
                </div>
                <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/20 space-y-1">
                  <span className="text-[10px] font-semibold text-indigo-300 uppercase">
                    Master Prompt Output:
                  </span>
                  <p className="text-white font-medium">
                    "{refinedPromptResult.executionPreview.after}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Part 3: Prompt Recipe Book */}
      {promptRecipes.length > 0 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <span>Tailored Prompt Recipe Book</span>
            </h3>
            <p className="text-xs text-slate-400">
              Curated prompt blueprints tailored specifically to this candidate's detected seniority and domain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {promptRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {recipe.category}
                    </span>
                    <button
                      onClick={() => handleCopy(recipe.refinedSystemPrompt, `recipe-${recipe.id}`)}
                      className="text-xs text-slate-400 hover:text-indigo-300 flex items-center space-x-1"
                    >
                      {copiedId === `recipe-${recipe.id}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedId === `recipe-${recipe.id}` ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <h4 className="text-sm font-bold text-white">{recipe.name}</h4>
                  <div className="text-[11px] text-slate-400 font-mono bg-slate-950 p-2 rounded-lg border border-slate-800">
                    {recipe.formula}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">
                    Transformation Example:
                  </span>
                  <div className="text-slate-400 line-through">"{recipe.exampleRewrite.before}"</div>
                  <div className="text-emerald-400 font-medium">"{recipe.exampleRewrite.after}"</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const StyleButton: React.FC<{
  title: string;
  subtitle: string;
  icon: any;
  active: boolean;
  onClick: () => void;
}> = ({ title, subtitle, icon: Icon, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2.5 rounded-xl border text-left transition-all ${
        active
          ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
          : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className="flex items-center space-x-1.5">
        <Icon className="w-3.5 h-3.5 shrink-0" />
        <span className="font-bold text-xs truncate">{title}</span>
      </div>
      <div className={`text-[10px] truncate mt-0.5 ${active ? 'text-indigo-200' : 'text-slate-400'}`}>
        {subtitle}
      </div>
    </button>
  );
};
