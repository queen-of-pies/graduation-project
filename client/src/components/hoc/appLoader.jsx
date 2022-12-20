import {useDispatch, useSelector} from "react-redux";
import {getAccountsLoadingStatus, loadAccountsList} from "../../store/accounts";
import {getTransactionsLoadingStatus, loadTransactionsList} from "../../store/transactions";
import React, {useEffect} from "react";
import Loader from "../loader";

const AppLoader = ({children}) => {
    const dispatch = useDispatch();
    const accountsLoading = useSelector(getAccountsLoadingStatus())
    const txLoading = useSelector(getTransactionsLoadingStatus())

    useEffect(() => {
        dispatch(loadAccountsList())
        dispatch(loadTransactionsList())
    }, [])

    if (accountsLoading || txLoading) {
        return <Loader/>
    }

    return children
}

export default AppLoader