import { type HTMLAttributes } from 'react';
import { X } from 'lucide-react';
import './Badge.css';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'primary' | 'success' | 'error' | 'warning' | 'info';
    size?: 'sm' | 'md' | 'lg';
    styleVariant?: 'default' | 'solid' | 'outline';
    dot?: boolean;
    onRemove?: () => void;
}

export default function Badge({
    variant = 'default',
    size = 'md',
    styleVariant = 'default',
    dot = false,
    onRemove,
    children,
    onClick,
    className = '',
    ...props
}: BadgeProps) {
    const classes = [
        'badge',
        `badge-${size}`,
        `badge-${variant}`,
        styleVariant !== 'default' && `badge-${styleVariant}`,
        dot && 'badge-dot',
        onClick && 'badge-clickable',
        className
    ].filter(Boolean).join(' ');

    return (
        <span className={classes} onClick={onClick} {...props}>
            {children}
            {onRemove && (
                <button
                    type="button"
                    className="badge-remove-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    aria-label="Remove"
                >
                    <X />
                </button>
            )}
        </span>
    );
}
