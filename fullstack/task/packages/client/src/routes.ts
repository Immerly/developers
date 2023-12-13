import React from 'react';
import { IndexRouteObject } from 'react-router-dom';
import Home from './pages/Home';
import ExchangeRateList from './pages/ExchangeRate';

export interface AppRoute extends Partial<IndexRouteObject> {
    path: string;
    Component: React.ComponentType | null;
}

export enum RoutesPath {
    HOME = '/',
    ExchangeRate = '/exchange-rate',
}

export const routes = [
    {
        path: '/',
        Component: Home,
    },
    {
        path: '/exchange-rate',
        Component: ExchangeRateList,
    },
];
