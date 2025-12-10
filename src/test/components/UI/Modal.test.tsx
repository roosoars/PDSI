import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import Modal from '../../../components/UI/Modal';

describe('Modal', () => {
    it('renders nothing when not open', () => {
        render(
            <Modal isOpen={false} onClose={() => { }}>
                Modal Content
            </Modal>
        );
        expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });

    it('renders content when open', () => {
        render(
            <Modal isOpen={true} onClose={() => { }}>
                Modal Content
            </Modal>
        );
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    it('calls onClose when close button is clicked', () => {
        const handleClose = vi.fn();

        render(
            <Modal isOpen={true} onClose={handleClose} title="Test Modal">
                Content
            </Modal>
        );

        const closeButton = screen.getByLabelText('Close modal');
        fireEvent.click(closeButton);

        act(() => {
            vi.advanceTimersByTime(250);
        });

        expect(handleClose).toHaveBeenCalled();
    });

    it('renders title and footer', () => {
        render(
            <Modal
                isOpen={true}
                onClose={() => { }}
                title="My Title"
                footer={<button>Footer Button</button>}
            >
                Content
            </Modal>
        );

        expect(screen.getByText('My Title')).toBeInTheDocument();
        expect(screen.getByText('Footer Button')).toBeInTheDocument();
    });

    // Note for backdrop click: it might be tricky to test strict backdrop click vs child click propogation without full browser event simulation, 
    // but we can try targeting the backdrop element specifically.
});
