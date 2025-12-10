import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Badge from '../../../components/UI/Badge';

describe('Badge', () => {
    it('renders children correctly', () => {
        render(<Badge>Test Badge</Badge>);
        expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('applies variant classes', () => {
        render(<Badge variant="success">Success</Badge>);
        const badge = screen.getByText('Success');
        expect(badge).toHaveClass('badge-success');
    });

    it('renders remove button when onRemove is provided', async () => {
        const handleRemove = vi.fn();
        const user = userEvent.setup();

        render(<Badge onRemove={handleRemove}>Removable</Badge>);

        const button = screen.getByRole('button', { name: /remove/i });
        expect(button).toBeInTheDocument();

        await user.click(button);
        expect(handleRemove).toHaveBeenCalledTimes(1);
    });

    it('renders dot when dot prop is true', () => {
        render(<Badge dot>Dot Badge</Badge>);
        const badge = screen.getByText('Dot Badge');
        expect(badge).toHaveClass('badge-dot');
    });
});
