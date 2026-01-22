import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';
import { Brief, Citation, VerificationResult } from '@/types';
import { Prose, Tooltip } from '@designSystem';
import { severityClasses } from '@utils';
import { statusLabels } from '@constants';

interface BriefViewerProps {
  brief: Brief;
  onCitationClick: (citation: Citation, result: VerificationResult) => void;
  selectedCitationId: string | null;
}

export function BriefViewer({
  brief,
  onCitationClick,
  selectedCitationId,
}: BriefViewerProps) {
  const getResultForCitation = (citationId: string): VerificationResult | undefined => {
    return brief.verificationResults.find((r: VerificationResult) => r.citationId === citationId);
  };

  const renderContent = () => {
    const content = brief.content;
    const parts: React.ReactNode[] = [];
    const citationRegex = /\[\[CITATION:(\d+)\]\]/g;

    let lastIndex = 0;
    let match;
    let keyIndex = 0;

    while ((match = citationRegex.exec(content)) !== null) {
      // Render markdown before citation
      if (match.index > lastIndex) {
        const markdownContent = content.slice(lastIndex, match.index);
        parts.push(
          <ReactMarkdown
            key={`md-${keyIndex++}`}
            components={Prose}
          >
            {markdownContent}
          </ReactMarkdown>
        );
      }

      // Render citation badge
      const citationIndex = parseInt(match[1], 10) - 1;
      const citation = brief.citations[citationIndex];

      if (citation) {
        const result = getResultForCitation(citation.id);
        const severity = result?.severity || 'none';
        const isSelected = selectedCitationId === citation.id;

        const tooltipContent = result
          ? `${statusLabels[result.status] || result.status}: ${result.message}`
          : citation.text;

        const statusLabel = result ? statusLabels[result.status] || result.status : 'unknown';

        parts.push(
          <Tooltip key={`cit-${citation.id}`} content={tooltipContent} position="top">
            <span
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              aria-label={`Citation: ${citation.text}. Status: ${statusLabel}`}
              onClick={() => result && onCitationClick(citation, result)}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && result) {
                  e.preventDefault();
                  onCitationClick(citation, result);
                }
              }}
              className={clsx(
                'inline-block cursor-pointer rounded px-1 py-0.5 border transition-all duration-200 outline-none',
                'hover:shadow-xl hover:-translate-y-0.5',
                'focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-1',
                severityClasses(severity),
                isSelected && 'ring-2 ring-current ring-offset-1 shadow-md'
              )}
            >
              {citation.text}
            </span>
          </Tooltip>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    // Render remaining markdown
    if (lastIndex < content.length) {
      parts.push(
        <ReactMarkdown
          key={`md-${keyIndex++}`}
          components={Prose}
        >
          {content.slice(lastIndex)}
        </ReactMarkdown>
      );
    }

    return parts;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 lg:px-8">
      <h1 className="h1 text-slate-900 mb-8">{brief.title}</h1>
      <div className="body1 text-slate-700">{renderContent()}</div>
    </div>
  );
}
