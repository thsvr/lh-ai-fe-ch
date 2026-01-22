import { Scale, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Tooltip } from '@designSystem';

interface HeaderProps {
  stats: {
    valid: number;
    warning: number;
    critical: number;
  };
}

export function Header({ stats }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-slate-800 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Title */}
          <div className="flex items-center gap-3">
            <Scale className="w-7 h-7 text-primary-50" />
            <span className="h4 text-white">Trusted Hand</span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6">
            <Tooltip content="Valid citations" position="bottom">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-status-valid" />
                <span className="body2 text-slate-300">{stats.valid}</span>
              </div>
            </Tooltip>
            <Tooltip content="Citations with warnings" position="bottom">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-status-warning" />
                <span className="body2 text-slate-300">{stats.warning}</span>
              </div>
            </Tooltip>
            <Tooltip content="Critical issues" position="bottom">
              <div className="flex items-center gap-2">
                <XCircle className="w-6 h-6 text-status-critical" />
                <span className="body2 text-slate-300">{stats.critical}</span>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </header>
  );
}
