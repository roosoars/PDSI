import { type InputHTMLAttributes, type ReactNode } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helper?: string;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    inputSize?: 'sm' | 'md' | 'lg';
    required?: boolean;
}

export default function Input({
    label,
    error,
    helper,
    icon,
    iconPosition = 'left',
    inputSize = 'md',
    required = false,
    className = '',
    ...props
}: InputProps) {
    const inputClasses = [
        'input',
        inputSize !== 'md' && `input-${inputSize}`,
        error && 'input-error',
        icon && iconPosition === 'left' && 'input-with-icon-left',
        icon && iconPosition === 'right' && 'input-with-icon-right',
        className
    ].filter(Boolean).join(' ');

    const inputElement = (
        <input
            className={inputClasses}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${props.id}-error` : helper ? `${props.id}-helper` : undefined}
            {...props}
        />
    );

    return (
        <div className="input-wrapper">
            {label && (
                <label className={`input-label ${required ? 'required' : ''}`} htmlFor={props.id}>
                    {label}
                </label>
            )}

            {icon ? (
                <div className="input-with-icon-container">
                    {inputElement}
                    <span className={`input-icon ${iconPosition}`}>
                        {icon}
                    </span>
                </div>
            ) : (
                inputElement
            )}

            {error && (
                <span className="input-error-text" id={`${props.id}-error`} role="alert">
                    {error}
                </span>
            )}

            {!error && helper && (
                <span className="input-helper" id={`${props.id}-helper`}>
                    {helper}
                </span>
            )}
        </div>
    );
}
