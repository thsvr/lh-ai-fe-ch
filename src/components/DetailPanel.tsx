import { X } from 'lucide-react';
import { Citation, VerificationResult } from '@/types';
import { Card, Badge, StatusIcon, Divider } from '@designSystem';
import { statusLabels } from '@constants';
import { severityToVariant } from '@utils';

interface DetailPanelProps {
  citation: Citation | null;
  result: VerificationResult | null;
  onClose?: () => void;
}

export function DetailPanel({ citation, result, onClose }: DetailPanelProps) {
  if (!citation || !result) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
            <StatusIcon variant="unknown" size="lg" />
          </div>
          <p className="body2 text-slate-500">
            Click on a citation to see verification details.
          </p>
        </div>
      </div>
    );
  }

  const variant = severityToVariant(result.severity);

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      {/* Header with status */}
      <div className="flex items-start gap-3">
        <StatusIcon variant={variant} size="lg" className="mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant={variant}>
              {statusLabels[result.status] || result.status}
            </Badge>
          </div>
          <p className="body2 text-slate-600">{result.message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0"
            aria-label="Close panel"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        )}
      </div>

      <Divider spacing="sm" />

      {/* Citation info */}
      <Card padding="md" className="space-y-3">
        <h3 className="label1 text-slate-500 uppercase tracking-wide">Citation</h3>

        <div>
          <p className="body1 text-slate-900 font-medium">{citation.caseName}</p>
          <p className="body2 text-slate-600">{citation.reporter}</p>
        </div>

        <div className="flex gap-4">
          {citation.pinCite && (
            <div>
              <p className="caption text-slate-400">Pin Cite</p>
              <p className="body2 text-slate-700">{citation.pinCite}</p>
            </div>
          )}
          <div>
            <p className="caption text-slate-400">Year</p>
            <p className="body2 text-slate-700">{citation.year}</p>
          </div>
        </div>
      </Card>

      {/* Quote comparison if available */}
      {(result.details?.expectedQuote || result.details?.actualQuote) && (
        <Card padding="md" className="space-y-3">
          <h3 className="label1 text-slate-500 uppercase tracking-wide">Quote Comparison</h3>

          {result.details.expectedQuote && (
            <div>
              <p className="caption text-slate-400 mb-1">In Brief</p>
              <p className="body2 text-slate-700 bg-status-warning-light p-2 rounded border-l-2 border-status-warning">
                "{result.details.expectedQuote}"
              </p>
            </div>
          )}

          {result.details.actualQuote && (
            <div>
              <p className="caption text-slate-400 mb-1">Actual Source</p>
              <p className="body2 text-slate-700 bg-status-valid-light p-2 rounded border-l-2 border-status-valid">
                "{result.details.actualQuote}"
              </p>
            </div>
          )}
        </Card>
      )}

      {/* Treatment history if available */}
      {result.details?.treatmentHistory && (
        <Card padding="md" className="space-y-2">
          <h3 className="label1 text-slate-500 uppercase tracking-wide">Treatment History</h3>
          <p className="body2 text-slate-700">{result.details.treatmentHistory}</p>
        </Card>
      )}
    </div>
  );
}
