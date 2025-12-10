import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Glossary from '../../../components/Settings/Glossary';
import { useApp } from '../../../context/AppContext';

vi.mock('../../../context/AppContext', () => ({
    useApp: vi.fn(),
}));

describe('Glossary', () => {
    it('renders existing terms', () => {
        (useApp as any).mockReturnValue({
            glossary: [{ term: 'T1', definition: 'D1' }],
            addGlossaryTerm: vi.fn(),
            removeGlossaryTerm: vi.fn(),
        });

        render(<Glossary />);
        expect(screen.getByText('T1')).toBeInTheDocument();
        expect(screen.getByText('D1')).toBeInTheDocument();
    });

    it('adds new term', async () => {
        const addMock = vi.fn();
        (useApp as any).mockReturnValue({
            glossary: [],
            addGlossaryTerm: addMock,
        });

        const user = userEvent.setup();
        render(<Glossary />);

        const inputs = screen.getAllByRole('textbox');
        await user.type(inputs[0], 'New Term');
        await user.type(inputs[1], 'New Def');
        await user.click(screen.getByText('Adicionar'));

        expect(addMock).toHaveBeenCalledWith('New Term', 'New Def');
    });
});
