import clsx from 'clsx';
import { statusIcons, statusTextStyles, StatusVariant } from '@constants';

type IconVariant = StatusVariant | 'unknown';

interface StatusIconProps {
  variant: IconVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export function StatusIcon({ variant, size = 'md', className }: StatusIconProps) {
  const Icon = statusIcons[variant];

  return (
    <Icon
      className={clsx(
        sizeStyles[size],
        statusTextStyles[variant],
        className
      )}
    />
  );
}
