import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
    it('should render with label', () => {
        render(<Input label="Email" />);
        expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('should display error message', () => {
        render(<Input error="Required field" />);
        expect(screen.getByText('Required field')).toBeInTheDocument();
    });

    it('should apply error class when error exists', () => {
        const { container } = render(<Input error="Error" />);
        expect(container.querySelector('.input-error')).toBeInTheDocument();
    });

    it('should pass through input props', () => {
        render(<Input placeholder="Enter text" type="password" />);
        const input = screen.getByPlaceholderText('Enter text');
        expect(input).toHaveAttribute('type', 'password');
    });
});
