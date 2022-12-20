import React from "react";
import {deleteTransaction, getTransactionsList} from "../../store/transactions";
import {useDispatch, useSelector} from "react-redux";

const TransactionList = () => {
    const transactionsList = useSelector(getTransactionsList())
    const dispatch = useDispatch()

    const handleDelete = (id) => {
        dispatch(deleteTransaction(id))
    }

    return <div className="col-md-12 my-shadow">
        <h3 className="transaction-title box mb-4">Список транзакций</h3>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Дата</th>
                <th>Сумма</th>
                <th>Валюта</th>
                <th>Тип</th>
                <th>Счет</th>
                <th>Комментарий</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {transactionsList.map(tx => <tr key = {tx._id}>
                    <td>{new Date(tx.txDate.toString()).toLocaleString()}</td>
                    <td>{tx.amount}</td>
                    <td>{tx.accountId.currency}</td>
                    <td>{tx.type}</td>
                    <td>{tx.accountId.name}</td>
                    <td>{tx.description}</td>
                <td>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => handleDelete(tx._id)}></button></td>
                </tr>
            )}
            </tbody>
        </table>
    </div>

}

export default TransactionList