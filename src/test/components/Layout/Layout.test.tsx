import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Layout from '../../../components/Layout/Layout';
import { BrowserRouter } from 'react-router-dom';

// Mock Header to avoid context/router issues
vi.mock('../../../components/Header/Header', () => ({
    default: () => <div data-testid="header">Header</div>
}));
// ... other mocks if needed

describe('Layout', () => {
    it('renders children and header', () => {
        render(
            <BrowserRouter>
                <Layout>
                    <div data-testid="child-content">Child</div>
                </Layout>
            </BrowserRouter>
        );
        expect(screen.getByTestId('child-content')).toHaveTextContent('Child');
        expect(screen.getByTestId('header')).toBeInTheDocument();
    });
});
