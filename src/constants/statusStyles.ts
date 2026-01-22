import { CheckCircle, AlertTriangle, XCircle, HelpCircle } from 'lucide-react';

export type StatusVariant = 'valid' | 'warning' | 'critical';

// Status → Icon mapping
export const statusIcons = {
  valid: CheckCircle,
  warning: AlertTriangle,
  critical: XCircle,
  unknown: HelpCircle,
};

// Background + text 
export const statusBadgeStyles: Record<StatusVariant | 'neutral', string> = {
  valid: 'bg-status-valid-light text-status-valid-dark',
  warning: 'bg-status-warning-light text-status-warning-dark',
  critical: 'bg-status-critical-light text-status-critical-dark',
  neutral: 'bg-slate-100 text-slate-600',
};

// Text colors only
export const statusTextStyles: Record<StatusVariant | 'unknown', string> = {
  valid: 'text-status-valid',
  warning: 'text-status-warning',
  critical: 'text-status-critical',
  unknown: 'text-slate-400',
};

// Background + text + border (inline citations)
export const statusInlineStyles: Record<StatusVariant | 'none', string> = {
  valid: 'bg-status-valid-light text-status-valid-dark border-status-valid',
  warning: 'bg-status-warning-light text-status-warning-dark border-status-warning',
  critical: 'bg-status-critical-light text-status-critical-dark border-status-critical',
  none: 'bg-slate-100 text-slate-600 border-slate-300',
};
