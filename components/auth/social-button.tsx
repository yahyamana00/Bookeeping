import { ButtonHTMLAttributes, ReactNode } from 'react';

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  children: ReactNode;
}

export function SocialButton({ icon, children, ...props }: SocialButtonProps) {
  return (
    <button
      {...props}
      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-neutral-600 rounded-lg text-white hover:bg-neutral-800 transition-colors"
    >
      {icon}
      {children}
    </button>
  );
}