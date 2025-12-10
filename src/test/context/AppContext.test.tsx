import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProvider, useApp } from '../../context/AppContext';

// Mock AuthContext
vi.mock('../../context/AuthContext', () => ({
    useAuth: () => ({
        user: { uid: '123', email: 'test@example.com' },
        logout: vi.fn(),
    }),
}));

vi.mock('../../services/firebase', () => ({
    auth: {},
    app: {},
}));

// Helper
const TestComponent = () => {
    const { apiKey, setApiKey, results, addResult, clearHistory } = useApp();
    return (
        <div>
            <div data-testid="api-key">{apiKey}</div>
            <button onClick={() => setApiKey('new-key')}>Set Key</button>
            <div data-testid="results-count">{results.length}</div>
            <button onClick={() => addResult({
                filename: 'test.png',
                alt: 'test alt',
                description: 'desc',
                status: 'generated'
            })}>Add Result</button>
            <button onClick={clearHistory}>Clear History</button>
        </div>
    );
};

describe('AppContext', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('provides initial values', () => {
        render(
            <AppProvider>
                <TestComponent />
            </AppProvider>
        );
        expect(screen.getByTestId('api-key')).toHaveTextContent('');
        expect(screen.getByTestId('results-count')).toHaveTextContent('0');
    });

    it('updates state', async () => {
        const user = userEvent.setup();
        render(
            <AppProvider>
                <TestComponent />
            </AppProvider>
        );

        await user.click(screen.getByText('Set Key'));
        expect(screen.getByTestId('api-key')).toHaveTextContent('new-key');
    });

    it('adds results', async () => {
        const user = userEvent.setup();
        render(
            <AppProvider>
                <TestComponent />
            </AppProvider>
        );

        await user.click(screen.getByText('Add Result'));
        expect(screen.getByTestId('results-count')).toHaveTextContent('1');
    });
});
