import clsx from 'clsx';

interface DividerProps {
  className?: string;
  spacing?: 'sm' | 'md' | 'lg';
}

const spacingStyles = {
  sm: 'my-2',
  md: 'my-4',
  lg: 'my-6',
};

export function Divider({ className, spacing = 'md' }: DividerProps) {
  return (
    <hr
      className={clsx(
        'border-0 border-t border-slate-200',
        spacingStyles[spacing],
        className
      )}
    />
  );
}
