
import React, { forwardRef } from 'react';
import { APP_COLORS } from '../constants';

// Card Component
interface CardProps {
  children: React.ReactNode;
  className?: string;
}
export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 transition-shadow hover:shadow-xl ${className}`}>
      {children}
    </div>
  );
};

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'filled' | 'outlined' | 'text';
  color?: string;
  className?: string;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'filled', className = '', ...props }, ref) => {
    const baseStyles = 'px-6 py-2.5 rounded-full font-semibold text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105';
    
    let variantStyles = '';
    switch (variant) {
      case 'filled':
        variantStyles = `bg-[${APP_COLORS.primary}] text-[${APP_COLORS.onPrimary}] hover:bg-opacity-90 focus:ring-[${APP_COLORS.primary}]`;
        break;
      case 'outlined':
        variantStyles = `border border-[${APP_COLORS.primary}] text-[${APP_COLORS.primary}] hover:bg-[${APP_COLORS.primaryContainer}] focus:ring-[${APP_COLORS.primary}]`;
        break;
      case 'text':
        variantStyles = `text-[${APP_COLORS.primary}] hover:bg-[${APP_COLORS.primaryContainer}] focus:ring-[${APP_COLORS.primary}]`;
        break;
    }

    return (
      <button ref={ref} className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
        {children}
      </button>
    );
  }
);


// Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, className, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          id={id}
          className={`peer w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-transparent focus:outline-none focus:border-[${APP_COLORS.primary}] ${className}`}
          placeholder={label}
          {...props}
        />
        <label
          htmlFor={id}
          className={`absolute left-4 -top-2.5 px-1 bg-gray-50 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[${APP_COLORS.primary}]`}
        >
          {label}
        </label>
      </div>
    );
  }
);

// Select Component
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: React.ReactNode;
}
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, id, children, className, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          id={id}
          className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 appearance-none focus:outline-none focus:border-[${APP_COLORS.primary}] ${className}`}
          {...props}
        >
          {children}
        </select>
        <label
            htmlFor={id}
            className={`absolute left-4 -top-2.5 px-1 bg-gray-50 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-400`}
        >
          {label}
        </label>
         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    );
  }
);

// Spinner Component
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}
export const Spinner: React.FC<SpinnerProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };
  return (
    <div className={`animate-spin rounded-full border-4 border-t-transparent border-[${APP_COLORS.primary}] ${sizeClasses[size]}`}></div>
  );
};

// PageTitle Component
interface PageTitleProps {
  children: React.ReactNode;
}
export const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
    return (
        <h1 className={`text-3xl font-bold text-[${APP_COLORS.onBackground}] dark:text-gray-100 mb-6`}>
            {children}
        </h1>
    );
};
