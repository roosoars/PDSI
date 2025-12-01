import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
    it('should render with text', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('should handle click events', async () => {
        const handleClick = vi.fn();
        const user = userEvent.setup();

        render(<Button onClick={handleClick}>Click me</Button>);
        await user.click(screen.getByText('Click me'));

        expect(handleClick).toHaveBeenCalledOnce();
    });

    it('should be disabled when prop is set', () => {
        render(<Button disabled>Click me</Button>);
        expect(screen.getByText('Click me')).toBeDisabled();
    });

    it('should show loading state', () => {
        const { container } = render(<Button loading>Click me</Button>);
        expect(container.querySelector('.spinner')).toBeInTheDocument();
    });

    it('should apply correct variant classes', () => {
        const { container } = render(<Button variant="outline">Click me</Button>);
        expect(container.querySelector('.btn-outline')).toBeInTheDocument();
    });
});
