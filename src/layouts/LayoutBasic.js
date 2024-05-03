import React from 'react';
import Navbar from "../components/Navbar";
import './LayoutBasic.scss';

export default function LayoutBasic({ children }) {
    return (
        <div className="layout-basic">
            <Navbar />
            <div className="layout-basic__content">
                {children}
            </div>
        </div>
    );
}
