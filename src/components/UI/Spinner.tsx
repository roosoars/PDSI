import { type HTMLAttributes } from 'react';
import './Spinner.css';

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'primary' | 'secondary' | 'light' | 'dark';
    type?: 'default' | 'dots' | 'pulse';
    text?: string;
    fullPage?: boolean;
}

export default function Spinner({
    size = 'md',
    variant = 'primary',
    type = 'default',
    text,
    fullPage = false,
    className = '',
    ...props
}: SpinnerProps) {
    if (type === 'dots') {
        const spinner = (
            <div className={`spinner-dots spinner-${variant} ${className}`} {...props}>
                <span className="spinner-dot" />
                <span className="spinner-dot" />
                <span className="spinner-dot" />
            </div>
        );

        return text ? (
            <div className="spinner-container">
                {spinner}
                <span className="spinner-text">{text}</span>
            </div>
        ) : spinner;
    }

    if (type === 'pulse') {
        return (
            <div className={`spinner-pulse spinner-${variant} ${className}`} {...props} />
        );
    }

    const spinner = (
        <div
            className={`spinner spinner-${size} spinner-${variant} ${className}`}
            role="status"
            aria-label="Loading"
            {...props}
        />
    );

    if (fullPage) {
        return (
            <div className="spinner-fullpage">
                {spinner}
            </div>
        );
    }

    return text ? (
        <div className="spinner-container">
            {spinner}
            <span className="spinner-text">{text}</span>
        </div>
    ) : spinner;
}
