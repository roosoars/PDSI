import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
}

export default function Button({
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    children,
    disabled,
    className = '',
    ...props
}: ButtonProps) {
    const classes = [
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        loading && 'btn-loading',
        fullWidth && 'btn-block',
        !children && icon && 'btn-icon',
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            className={classes}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <span className="btn-spinner" />}

            {!loading && (
                <>
                    {icon && iconPosition === 'left' && icon}
                    {children}
                    {icon && iconPosition === 'right' && icon}
                </>
            )}
        </button>
    );
}
