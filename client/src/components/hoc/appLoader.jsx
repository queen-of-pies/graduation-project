import {useDispatch, useSelector} from "react-redux";
import {getAccountsLoadingStatus, loadAccountsList} from "../../store/accounts";
import {getTransactionsLoadingStatus, loadTransactionsList} from "../../store/transactions";
import React, {useEffect} from "react";
import Loader from "../loader";
import {getIsLoggedIn} from "../../store/users";

const AppLoader = ({children}) => {
    const dispatch = useDispatch();
    const accountsLoading = useSelector(getAccountsLoadingStatus())
    const txLoading = useSelector(getTransactionsLoadingStatus())
    const isLoggedIn = useSelector(getIsLoggedIn())

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(loadAccountsList())
            dispatch(loadTransactionsList())
        }
    }, [dispatch, isLoggedIn])

    if (isLoggedIn && (accountsLoading || txLoading)) {
        return <Loader/>
    }

    return children
}

export default AppLoader