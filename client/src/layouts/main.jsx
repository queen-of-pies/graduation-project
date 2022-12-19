import React from 'react';
import StartPage from './startPage';
import TransactionsPage from "./transactionsPage";

const Main = ({ isAuthorized }) => {
    return isAuthorized ? <TransactionsPage /> : <StartPage />;
};

export default Main;
