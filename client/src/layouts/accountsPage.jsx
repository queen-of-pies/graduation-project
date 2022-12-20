import React from 'react';
import {useSelector} from "react-redux";
import {getAccountsList} from "../store/accounts";
import Button from "../components/button";
import history from "../utils/history";

const AccountsPage = () => {
    const accountsList = useSelector(getAccountsList())

    return <div className="container mt-5">
        <Button title="Добавить счет" onClick={() => history.push("/createAccount")}/>
        {accountsList && accountsList.length !== 0 ?
            <div className="accounts-wrapper">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Название счета</th>
                        <th>Баланс</th>
                        <th>Валюта</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {accountsList.map(account => <tr key = {account._id}>
                            <td>{account.name}</td>
                            <td>{account.balance}</td>
                            <td>{account.currency}</td>
                            <td className="last-column">
                                <button type="button" className="btn btn-success" onClick={() => history.push(`/updateAccount/${account._id}`)} >Изменить</button></td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            :
            <h1 className="account-title">У вас еще нет счетов</h1>}

    </div>
};

export default AccountsPage;
