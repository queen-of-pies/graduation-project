import React from 'react';
import Dashboard from './dashboard';
import StartPage from './startPage';

const Main = ({ isAuthorized }) => {
    return isAuthorized ? <Dashboard /> : <StartPage />;
};

export default Main;
