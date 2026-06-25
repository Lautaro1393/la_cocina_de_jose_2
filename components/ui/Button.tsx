import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'ghost' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const baseClasses = clsx(
  'inline-flex items-center justify-center gap-2',
  'transition-all duration-200',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
  'disabled:opacity-50 disabled:pointer-events-none',
);

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

function ButtonRoot({
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
        baseClasses,
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

type ButtonComponent = typeof ButtonRoot & {
  Primary: typeof ButtonRoot;
  Outline: typeof ButtonRoot;
  Ghost: typeof ButtonRoot;
  Icon: typeof ButtonRoot;
};

export const Button = Object.assign(ButtonRoot, {
  Primary: (props: ButtonProps) => <ButtonRoot {...props} variant="primary" />,
  Outline: (props: ButtonProps) => <ButtonRoot {...props} variant="outline" />,
  Ghost: (props: ButtonProps) => <ButtonRoot {...props} variant="ghost" />,
  Icon: (props: ButtonProps) => <ButtonRoot {...props} variant="icon" />,
}) as ButtonComponent;
