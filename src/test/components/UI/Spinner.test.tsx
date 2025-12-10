import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Spinner from '../../../components/UI/Spinner';

describe('Spinner', () => {
    it('renders default spinner', () => {
        render(<Spinner />);
        const spinner = screen.getByRole('status');
        expect(spinner).toBeInTheDocument();
        expect(spinner).toHaveClass('spinner-primary');
    });

    it('renders with text', () => {
        render(<Spinner text="Loading..." />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders dots variant', () => {
        render(<Spinner type="dots" text="Dots" />);
        expect(screen.getByText('Dots')).toBeInTheDocument();
        // Dots implementation might not have role="status" on top level, but container usually wraps it
        // We can check if dots exist by class
        const container = screen.getByText('Dots').parentElement;
        expect(container?.querySelector('.spinner-dots')).toBeInTheDocument();
    });

    it('renders full page', () => {
        render(<Spinner fullPage />);
        // Full page wrapper usually has a specific class
        const spinner = screen.getByRole('status');
        const wrapper = spinner.closest('.spinner-fullpage');
        expect(wrapper).toBeInTheDocument();
    });
});
