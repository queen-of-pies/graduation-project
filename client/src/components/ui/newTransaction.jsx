import React, {useEffect, useState} from "react";
import Button from "../button";
import {useDispatch, useSelector} from "react-redux";
import {getAccountsList} from "../../store/accounts";
import transactionTypes from "../../types/transactionTypes.json"
import validator from "../../utils/validator";
import SelectField from "../selectField";
import SimpleTextField from "../simpleTextField";
import {createTransaction} from "../../store/transactions";
import {toast} from "react-toastify";

const NewTransaction = ({resetForm}) => {
    const dispatch = useDispatch()
    const accounts = useSelector(getAccountsList())
    const [currency, setCurrency] = useState("")
    const [balance, setBalance] = useState(0)
    const initialState = {
        accountId: "",
        amount: "",
        type: "",
        description: ""
    }
    const [data, setData] = useState(initialState);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (data.accountId) {
            const account = accounts.find(i => i._id === data.accountId)
            setCurrency(account.currency)
            setBalance(+account.balance)
        }
    }, [data.accountId])

    useEffect(() => {
        if (data.accountId === "" && data.type === "") return
        validate();
    }, [data]);

    const validateConfig = {
        accountId: {
            isRequired: {message: `Поле счет обязательно к заполнению.`}
        },
        amount: {
            positive: {message: `Сумма должна быть больше 0.`}
        },
        type: {
            isRequired: {message: `Поле тип операции обязательно к заполнению.`}
        }
    };

    const validate = () => {
        const errors = validator(data, validateConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const setDescription = (e) => {
        setData({
            ...data,
            description: e.target.value
        })
    }

    const handleChange = ({target}) => {
        const val = target.name === 'accountId' ? target.value._id : target.value.name
        setData((prevState) => ({
            ...prevState,
            [target.name]: val
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        if (data.type === "Расход" && +data.amount > balance) {
            toast("Недостаточно средств на счету");
            return;
        }
        dispatch(createTransaction(data))
        resetForm()
    };

    const handleCancel = (e) => {
        e.preventDefault();
        resetForm()
    }

    return <div className="col-md-4 offset-4 box my-shadow">
        <h3 className="transaction-title mb-4">Добавить транзакцию</h3>
        <form className="transaction-form">
            <SelectField
                optionLabel="Выберите счет"
                label="Счет"
                options={accounts}
                onChange={handleChange}
                name="accountId"
                value={data.accountId}
                error={errors.accountId}/>

            <SelectField
                optionLabel="Выберите тип транзакции"
                label="Тип транзакции"
                options={transactionTypes}
                onChange={handleChange}
                name="type"
                value={data.type}
                error={errors.type}
            />
            <div className="count-group">
                <div className="balance-field">
                    <SimpleTextField
                        type="number"
                        value={data.amount}
                        onChange={handleChange}
                        name="amount"
                        error={errors.amount}
                        placeholder="Введите сумму"
                        maxAmount={data.type === "Расход" ? balance : 9999999999999999}
                    />

                    <span>Баланс: {balance} {currency}</span>
                </div>
            </div>
            <textarea className="transaction-description" value={data.description} onChange={setDescription} placeholder="Комментарий"/>
            <div className="button-wrapper">
                <Button title="Добавить" disabled={!isValid} onClick={handleSubmit}/>
                <Button title="Отмена" onClick={handleCancel}/>
            </div>
        </form>
    </div>
}

export default NewTransaction