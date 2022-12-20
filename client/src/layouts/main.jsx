import React from 'react';
import StartPage from './startPage';
import TransactionsPage from "./transactionsPage";
import {useSelector} from "react-redux";
import {getIsLoggedIn} from "../store/users";

const Main = ( ) => {
    const isAuthorized = useSelector(getIsLoggedIn());

    return isAuthorized ? <TransactionsPage /> : <StartPage />;
};

export default Main;
