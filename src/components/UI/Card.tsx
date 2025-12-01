import { type HTMLAttributes, type ReactNode } from 'react';
import './Card.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'bordered' | 'flat' | 'elevated';
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    interactive?: boolean;
    loading?: boolean;
}

export default function Card({
    variant = 'default',
    padding = 'md',
    interactive = false,
    loading = false,
    children,
    className = '',
    ...props
}: CardProps) {
    const classes = [
        'card',
        `card-${variant}`,
        `card-padding-${padding}`,
        interactive && 'card-interactive',
        loading && 'card-loading',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
}

// Card sub-components
interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export function CardHeader({ children, className = '', ...props }: CardSectionProps) {
    return (
        <div className={`card-header ${className}`} {...props}>
            {children}
        </div>
    );
}

export function CardBody({ children, className = '', ...props }: CardSectionProps) {
    return (
        <div className={`card-body ${className}`} {...props}>
            {children}
        </div>
    );
}

export function CardFooter({ children, className = '', ...props }: CardSectionProps) {
    return (
        <div className={`card-footer ${className}`} {...props}>
            {children}
        </div>
    );
}
