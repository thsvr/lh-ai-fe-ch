interface ContentSkeletonProps {
  className?: string;
  paragraphs?: number;
}

const paragraphLines = [
  ['w-full', 'w-5/6'],
  ['w-full', 'w-4/6'],
  ['w-5/6', 'w-full'],
  ['w-4/6', 'w-5/6'],
];

export function ContentSkeleton({ className, paragraphs = 10 }: ContentSkeletonProps) {
  return (
    <div className={className} role="status" aria-label="Loading content">
      <div className="animate-pulse space-y-4">
        {/* Title skeleton */}
        <div className="h-10 bg-slate-200 rounded w-3/4" />
        
        {/* Paragraph skeletons */}
        {Array.from({ length: paragraphs }).map((_, index) => {
          const lineWidths = paragraphLines[index % paragraphLines.length];
          return (
            <div key={index} className="space-y-3 pt-4 first:pt-0">
              {lineWidths.map((width, lineIndex) => (
                <div key={lineIndex} className={`h-4 bg-slate-200 rounded ${width}`} />
              ))}
            </div>
          );
        })}
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
