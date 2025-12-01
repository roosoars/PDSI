import React from 'react';
import Header from '../Header/Header';
import './Layout.css';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="layout">
            <Header />
            <div className="layout__content">
                {children}
            </div>
        </div>
    );
}
