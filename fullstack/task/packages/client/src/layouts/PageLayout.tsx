import React, { FC, PropsWithChildren } from 'react';
import './page-layout.css';

const PageLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="page-layout">
            <div className="centered-content">{children}</div>
        </div>
    );
};

export default PageLayout;
