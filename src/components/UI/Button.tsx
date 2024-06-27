import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'sm' | 'md' | 'lg';
  variant: 'primary' | 'secondary' | 'danger';
}

export default function Button({ children, size, className, ...rest }: ButtonProps) {
  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600',
    secondary: 'bg-gray-500 hover:bg-gray-600',
    danger: 'bg-red-500 hover:bg-red-600',
  };

  return (
    <button
      className={`rounded-sm hover:bg-blue-600 ${sizes[size]} ${
        variants[rest.variant]
      } text-white cursor-pointer
    } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
