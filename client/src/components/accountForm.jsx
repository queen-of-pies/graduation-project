import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import validator from "../utils/validator";
import TextField from "../components/textField";
import Button from "../components/button";
import SelectField from "../components/selectField";
import currencyTypes from "../types/currencyTypes.json"
import {createAccount, updateAccount} from "../store/accounts";
import history from "../utils/history";

const AccountForm = ({initState, mode}) => {
    const [data, setData] = useState(initState);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()

    useEffect(() => {
        validate();
    }, [data]);

    const validateConfig = {
        name: {
            isRequired: {message: `Поле имя обязательно к заполнению.`}
        },
        balance: {
            isRequired: {message: `Поле баланс обязательно к заполнению.`}
        },
        currency: {
            isRequired: {message: `Поле валюта обязательно к заполнению.`}
        }
    };

    const validate = () => {
        const errors = validator(data, validateConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

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
        if (mode === 'new') {
            dispatch(createAccount(data))
        } else {
            dispatch(updateAccount(data))
        }
    };

    const currencyValue = currencyTypes.find(type=> type.name===data.currency)

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 p-5 my-shadow">
                    <h3 className="mb-4 text-center auth-title">{mode === 'new' ? 'Добавление счета' : 'Изменение счета'}</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            onChange={handleChange}
                            name="name"
                            value={data.name}
                            error={errors.name}
                        />
                        <TextField
                            label="Баланс"
                            type="number"
                            onChange={handleChange}
                            name="balance"
                            value={data.balance.toString()}
                            error={errors.balance}
                            placeholder="Введите сумму"
                        />
                        <SelectField
                            label={"Валюта счета"}
                            optionLabel={"Выберите валюту счета"}
                            options={currencyTypes}
                            onChange={handleChange}
                            name="currency"
                            value={currencyValue || ""}
                            error={errors.currency}
                        />
                        <div className="button-wrapper">
                            <Button title={mode === 'new' ? 'Добавить' : 'Изменить'} disabled={!isValid}/>
                            <Button title="Отмена" type="button" onClick={() => history.push("/accounts")} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AccountForm