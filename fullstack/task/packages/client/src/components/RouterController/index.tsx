import React, { FC } from 'react';
import { RoutesPath } from '../../routes';
import './styles.css';

type Props = {
    navigate: (path: RoutesPath) => void;
};

const RouterController: FC<Props> = ({ navigate }) => {
    return (
        <div>
            <button class="button" onClick={() => navigate(RoutesPath.ExchangeRate)}>
                Go to Exchange Rates page
            </button>
            <button class="button" onClick={() => navigate(RoutesPath.HOME)}>
                Go to Home page
            </button>
        </div>
    );
};

export default RouterController;
