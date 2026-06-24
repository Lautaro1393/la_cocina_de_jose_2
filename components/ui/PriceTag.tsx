import { formatARS } from '@/lib/format';
import clsx from 'clsx';

interface PriceTagProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-3xl',
};

export function PriceTag({ value, size = 'md', className }: PriceTagProps) {
  return (
    <span
      className={clsx(
        'text-display font-semibold text-accent',
        sizeStyles[size],
        className,
      )}
    >
      {formatARS(value)}
    </span>
  );
}
