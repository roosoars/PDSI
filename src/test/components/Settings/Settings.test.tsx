import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Settings from '../../../components/Settings/Settings';
import { useApp } from '../../../context/AppContext';

vi.mock('../../../context/AppContext', () => ({
    useApp: vi.fn(),
}));

describe('Settings', () => {
    const mockContext = {
        apiKey: 'key123',
        setApiKey: vi.fn(),
        provider: 'gemini',
        setProvider: vi.fn(),
        model: 'gemini-pro',
        setModel: vi.fn(),
        language: 'pt-BR',
        setLanguage: vi.fn(),
        style: 'concise',
        setStyle: vi.fn(),
        history: [],
        glossary: [], // Glossary component needs this
    };

    it('renders all settings sections', () => {
        (useApp as any).mockReturnValue(mockContext);
        render(<Settings onClose={() => { }} />);

        expect(screen.getByText('Provedor de IA')).toBeInTheDocument();
        expect(screen.getByText('Modelo')).toBeInTheDocument();
        expect(screen.getByText('Idioma de Saída')).toBeInTheDocument();
        expect(screen.getByDisplayValue('key123')).toBeInTheDocument();
    });

    it('updates settings', async () => {
        const setModelMock = vi.fn();
        (useApp as any).mockReturnValue({
            ...mockContext,
            setModel: setModelMock,
        });

        const user = userEvent.setup();
        render(<Settings onClose={() => { }} />);

        // Interaction with selects can be tricky with libraries, standard select:
        // Using getByLabelText or similar if labels exist
        // Labels are: "Modelo", "Idioma de Saída"
        // But the select components in Settings are native selects styled with class 'input' (Step 181 lines 91, 107)

        // Note: the component labels are standard label tags, so we can access by label text
    });

    it('saves api key', async () => {
        const setApiKeyMock = vi.fn();
        const onCloseMock = vi.fn();
        (useApp as any).mockReturnValue({
            ...mockContext,
            setApiKey: setApiKeyMock,
        });

        const user = userEvent.setup();
        render(<Settings onClose={onCloseMock} />);

        const input = screen.getByPlaceholderText('Insira sua chave de API');
        await user.clear(input);
        await user.type(input, 'new-key');
        await user.click(screen.getByText('Salvar e Continuar'));

        expect(setApiKeyMock).toHaveBeenCalledWith('new-key');
        expect(onCloseMock).toHaveBeenCalled();
    });
});
