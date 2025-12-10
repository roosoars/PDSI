import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../../../components/Auth/Login';

const loginWithGoogleMock = vi.fn();
const loginWithGithubMock = vi.fn();

vi.mock('../../../context/AuthContext', () => ({
    useAuth: () => ({
        loginWithGoogle: loginWithGoogleMock,
        loginWithGithub: loginWithGithubMock,
    }),
}));

vi.mock('../../../services/firebase', () => ({
    auth: {},
    app: {},
}));

describe('Login', () => {
    // ... (first test remains) ...

    it('opens login modal on access click', async () => {
        render(<Login />);

        const accessButton = screen.getByText('Acessar');
        fireEvent.click(accessButton);

        expect(await screen.findByText(/Entrar no DESCRIPTA/)).toBeInTheDocument();
        expect(screen.getByText('Continuar com Google')).toBeInTheDocument();
    });

    it('calls login providers', async () => {
        render(<Login />);

        const accessButton = screen.getByText('Acessar');
        fireEvent.click(accessButton);

        const googleBtn = await screen.findByText('Continuar com Google');
        fireEvent.click(googleBtn);

        expect(loginWithGoogleMock).toHaveBeenCalled();
    });
});
