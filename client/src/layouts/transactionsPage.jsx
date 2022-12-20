import React, {useState} from 'react';
import NewTransaction from "../components/ui/newTransaction";
import TransactionsList from "../components/ui/transactionsList";
import Button from "../components/button";

const TransactionsPage = () => {
    const [newTx, setNewTx] = useState(false)


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
