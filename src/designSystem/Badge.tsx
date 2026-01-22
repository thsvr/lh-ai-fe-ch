import clsx from 'clsx';
import { statusBadgeStyles, StatusVariant } from '@constants';

type BadgeVariant = StatusVariant | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'neutral', children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded-md label2 focus:outline-none',
        statusBadgeStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
