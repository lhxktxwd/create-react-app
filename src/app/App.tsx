import React from 'react';
import Router from '../router';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import Header from '@cnstrong/components-business-header';
import MiniHeader from '@cnstrong/components-mini-header';
import Footer from '@cnstrong/components-footer';

const App = () => {
    const { pathname } = useLocation();

    return (
        <div>
            <Helmet>
                <title>{pathname.includes('homework') ? '作业报告' : '预习报告'}</title>
            </Helmet>
            <MiniHeader />
            <Header
                projectName="homework"
                renderHeader={() => (pathname.includes('homework') ? '作业报告' : '预习报告')}
                hideToolbar={true}
                hidePhoto
            />
            <Router />
            <Footer />
        </div>
    );
};

export default App;
