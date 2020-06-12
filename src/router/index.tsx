import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from './config';
import '../styles/reset.css';

const Index: FC = () => {
    return (
        <Switch>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} component={route.component} />
            ))}
        </Switch>
    );
};

export default Index;
