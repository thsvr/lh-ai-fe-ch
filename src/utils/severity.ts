import { Severity } from '@/types';
import { statusInlineStyles, StatusVariant } from '@constants';

export const severityToVariant = (severity: Severity): StatusVariant => {
  switch (severity) {
    case 'critical':
      return 'critical';
    case 'warning':
      return 'warning';
    default:
      return 'valid';
  }
};

export const severityClasses = (severity: Severity): string => {
  const variant = severityToVariant(severity);
  return statusInlineStyles[variant];
};
