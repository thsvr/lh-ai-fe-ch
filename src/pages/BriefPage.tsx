import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';
import { Header } from '@components/Header';
import { BriefViewer } from '@components/BriefViewer';
import { DetailPanel } from '@components/DetailPanel';
import { ContentSkeleton, ErrorState } from '@designSystem';
import { sampleBrief } from '@data/sampleBrief';
import { Citation, VerificationResult } from '@/types';

export function BriefPage() {
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);
  const [selectedResult, setSelectedResult] = useState<VerificationResult | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (selectedCitation || isPanelOpen)) {
        handleClearSelection();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedCitation, isPanelOpen]);

  const handleCitationClick = (citation: Citation, result: VerificationResult) => {
    setSelectedCitation(citation);
    setSelectedResult(result);
    setIsPanelOpen(true);
  };

  const handleClearSelection = () => {
    setSelectedCitation(null);
    setSelectedResult(null);
    setIsPanelOpen(false);
  };

  const handleStatClick = (severity: 'none' | 'warning' | 'critical') => {
    // Find first citation with matching severity
    const firstCitation = document.querySelector(`[data-severity="${severity}"]`) as HTMLElement;
    
    if (firstCitation) {
      firstCitation.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      
      const severityColors = {
        none: 'rgb(34 197 94)',      
        warning: 'rgb(245 158 11)',   
        critical: 'rgb(239 68 68)',   
      };
      
      // Add temporary highlight effect with severity color
      const originalBoxShadow = firstCitation.style.boxShadow;
      const highlightColor = severityColors[severity];
      firstCitation.style.boxShadow = `0 0 0 4px ${highlightColor}, 0 0 0 6px white`;
      firstCitation.style.transition = 'box-shadow 0.2s ease-out';
      
      setTimeout(() => {
        firstCitation.style.boxShadow = originalBoxShadow;
      }, 2000);
    }
  };

  // Calculate stats
  const stats = sampleBrief.verificationResults.reduce(
    (acc, result) => {
      if (result.severity === 'critical') acc.critical++;
      else if (result.severity === 'warning') acc.warning++;
      else acc.valid++;
      return acc;
    },
    { valid: 0, warning: 0, critical: 0 }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header stats={{ valid: 0, warning: 0, critical: 0 }} />
        <ContentSkeleton className="max-w-4xl mx-auto px-4 py-8 lg:px-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header stats={stats} onStatClick={handleStatClick} />

      {/* Main content */}
      <div className="max-w-7xl mx-auto lg:flex">
        {/* Brief Viewer */}
        <main className="flex-1 lg:pr-96" role="main" aria-label="Brief content">
          <BriefViewer
            brief={sampleBrief}
            onCitationClick={handleCitationClick}
            selectedCitationId={selectedCitation?.id || null}
          />
          
          {/* Error Simulation Demo - At bottom of content */}
          <div className="max-w-4xl mx-auto px-4 pb-8 lg:px-8">
            <button
              onClick={() => setHasError(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors shadow-lg"
              aria-label="Simulate citation error"
            >
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm font-medium">Extra Demo: Click here to simulate a citation loading error</span>
            </button>
          </div>
        </main>

        {/* Desktop: Fixed sidebar */}
        <aside
          className="hidden lg:block fixed top-20 right-0 w-96 h-[calc(100vh-5rem)] bg-white border-l border-slate-200 overflow-y-auto"
          role="complementary"
          aria-label="Citation details"
        >
          <DetailPanel citation={selectedCitation} result={selectedResult} onClose={handleClearSelection} />
        </aside>

        {/* Mobile: Slide-over drawer */}
        <AnimatePresence>
          {isPanelOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClearSelection}
                className="lg:hidden fixed inset-0 bg-slate-900/50 z-40"
                aria-hidden="true"
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="lg:hidden fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-panel z-50"
                role="dialog"
                aria-modal="true"
                aria-label="Citation details"
              >
                {/* Close button */}
                <div className="sticky top-0 flex items-center justify-between p-4 bg-white border-b border-slate-200">
                  <span className="h5 text-slate-900">Citation Details</span>
                  <button
                    onClick={handleClearSelection}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    aria-label="Close panel"
                  >
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>

                {/* Panel content */}
                <div className="overflow-y-auto h-[calc(100%-4rem)]">
                  <DetailPanel citation={selectedCitation} result={selectedResult} />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Error State - Fixed at top right */}
      {hasError && (
        <div className="fixed top-24 right-4 max-w-md z-50 animate-slide-in">
          <ErrorState
            title="Citation Load Failed"
            message="Unable to load verification data for this citation. This is a simulated error for demonstration purposes."
            onRetry={() => setHasError(false)}
          />
        </div>
      )}
    </div>
  );
}
