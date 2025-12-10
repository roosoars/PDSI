import { describe, it, expect, vi, type Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Results from '../../../components/Results/Results';
import { useApp } from '../../../context/AppContext';

vi.mock('../../../context/AppContext', () => ({
    useApp: vi.fn(),
}));

describe('Results', () => {
    it('renders results list', () => {
        (useApp as unknown as Mock).mockReturnValue({
            results: [
                { filename: 'test.png', alt: 'Test Alt', description: 'Test Desc', imageUrl: 'blob:url' }
            ],
            updateResult: vi.fn(),
            handleDownloadCSV: vi.fn(),
            clearResults: vi.fn(),
        });

        render(<Results />);
        expect(screen.getByText('test.png')).toBeInTheDocument();
        expect(screen.getByText('Test Alt')).toBeInTheDocument();
    });

    it('allows editing alt text', async () => {
        const updateResultMock = vi.fn();
        (useApp as unknown as Mock).mockReturnValue({
            results: [{ filename: 'test.png', alt: 'Original' }],
            updateResult: updateResultMock,
        });

        const user = userEvent.setup();
        render(<Results />);

        await user.click(screen.getByText('Editar'));

        const input = screen.getByRole('textbox');
        await user.clear(input);
        await user.type(input, 'New Alt');
        await user.click(screen.getByText('Salvar'));

        expect(updateResultMock).toHaveBeenCalledWith(0, { alt: 'New Alt' });
    });
});
