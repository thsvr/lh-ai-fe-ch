import { AlertCircle, X } from 'lucide-react';
import clsx from 'clsx';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ 
  title = 'Something went wrong',
  message, 
  onRetry,
  className 
}: ErrorStateProps) {
  return (
    <div className={clsx('relative p-6 bg-status-critical-light border-l-4 border-status-critical rounded-lg', className)}>
      <div className="flex items-start gap-3">
        <AlertCircle className="w-6 h-6 text-status-critical flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h3 className="label1 text-status-critical-dark mb-1">{title}</h3>
          <p className="body2 text-slate-700 mb-3">{message}</p>
        </div>
        {onRetry && (
          <X 
            onClick={onRetry}
            className="w-6 h-6 text-status-critical hover:text-status-critical-dark cursor-pointer transition-colors flex-shrink-0"
            aria-label="Close error"
          />
        )}
      </div>
    </div>
  );
}
