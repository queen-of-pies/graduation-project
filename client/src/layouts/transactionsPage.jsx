import React, {useEffect, useState} from 'react';
import NewTransaction from "../components/ui/newTransaction";
import TransactionsList from "../components/ui/transactionsList";
import Loader from "../components/loader";
import {useDispatch, useSelector} from "react-redux";
import {getAccountsLoadingStatus, loadAccountsList} from "../store/accounts";
import Button from "../components/button";
import {getTransactionsLoadingStatus, loadTransactionsList} from "../store/transactions";

const TransactionsPage = () => {
    const [newTx, setNewTx] = useState(false)
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

    const resetForm = () => {
        setNewTx(false)
    }

    return <>
        <div className="container mt-5">
            {newTx && <NewTransaction resetForm = {resetForm}/>}
            {!newTx && <><Button title='Добавить транзакцию' onClick={() => setNewTx(true)}/> <div className="row">
                <TransactionsList/>
                </div></>}

        </div>
    </>;
};

export default TransactionsPage;
