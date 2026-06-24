import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'icon' | 'outline';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-accent hover:bg-accent-hover text-text-primary shadow-[0_8px_24px_rgba(177,66,47,0.35)] active:scale-[0.97]',
  outline:
    'border border-border-subtle text-text-primary hover:bg-surface-elevated active:scale-[0.97]',
  ghost:
    'text-text-secondary hover:text-text-primary hover:bg-surface-elevated',
  icon:
    'inline-flex items-center justify-center text-text-primary active:scale-[0.94]',
};

const sizeStyles: Record<Variant, string> = {
  primary: 'h-12 px-6 text-base font-semibold rounded-full',
  outline: 'h-11 px-5 text-sm font-medium rounded-full',
  ghost: 'h-10 px-4 text-sm font-medium rounded-full',
  icon: 'h-11 w-11 rounded-full',
};

export function Button({
  variant = 'primary',
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        'inline-flex items-center justify-center gap-2',
        'transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
        'disabled:opacity-50 disabled:pointer-events-none',
        sizeStyles[variant],
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
