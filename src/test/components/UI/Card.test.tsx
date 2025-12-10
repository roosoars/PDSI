import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card, { CardHeader, CardBody, CardFooter } from '../../../components/UI/Card';

describe('Card', () => {
    it('renders children correctly', () => {
        render(<Card>Card Content</Card>);
        expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('applies variant classes', () => {
        render(<Card variant="bordered">Bordered Card</Card>);
        // Note: We might need to find by text parent or specific role depending on Card impl
        // finding by text and getting parent usually works if Card renders single div wrapping children
        const cardContent = screen.getByText('Bordered Card');
        expect(cardContent).toHaveClass('card-bordered');
    });

    it('renders subcomponents', () => {
        render(
            <Card>
                <CardHeader>Header</CardHeader>
                <CardBody>Body</CardBody>
                <CardFooter>Footer</CardFooter>
            </Card>
        );

        expect(screen.getByText('Header')).toHaveClass('card-header');
        expect(screen.getByText('Body')).toHaveClass('card-body');
        expect(screen.getByText('Footer')).toHaveClass('card-footer');
    });

    it('applies loading state', () => {
        render(<Card loading>Loading Card</Card>);
        const card = screen.getByText('Loading Card');
        expect(card).toHaveClass('card-loading');
    });
});
