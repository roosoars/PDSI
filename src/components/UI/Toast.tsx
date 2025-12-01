import { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import './Toast.css';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
    message: string;
    type: ToastType;
    title?: string;
    onClose: () => void;
    duration?: number;
    showProgress?: boolean;
}

export default function Toast({
    message,
    type,
    title,
    onClose,
    duration = 3000,
    showProgress = true
}: ToastProps) {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 200); // Match animation duration
    };

    const icons = {
        success: <CheckCircle size={20} />,
        error: <AlertCircle size={20} />,
        info: <Info size={20} />,
        warning: <AlertTriangle size={20} />
    };

    return (
        <div className="toast-container">
            <div className={`toast toast-${type} ${isClosing ? 'closing' : ''}`} role="alert">
                <div className="toast-icon">{icons[type]}</div>

                <div className="toast-content">
                    {title && <div className="toast-title">{title}</div>}
                    <p className="toast-message">{message}</p>
                </div>

                <button
                    className="toast-close"
                    onClick={handleClose}
                    aria-label="Close notification"
                >
                    <X size={16} />
                </button>

                {showProgress && (
                    <div
                        className="toast-progress"
                        style={{ animationDuration: `${duration}ms` }}
                    />
                )}
            </div>
        </div>
    );
}
