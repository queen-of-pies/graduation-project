import React, { useEffect, useState } from 'react';
import TextField from '../components/textField';
import validator from '../utils/validator';
import Button from '../components/button';

const AuthPage = () => {
    const [data, setData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        validate();
    }, [data]);

    const validateConfig = {
        email: {
            isRequired: { message: `Поле email обязательно к заполнению.` },
            isEmail: { message: 'Введеный email некорректный' }
        },
        password: {
            isRequired: { message: `Поле password обязательно к заполнению.` },
            isCapitalSymbol: {
                message: `Поле password должно содержать хотя бы одну заглавную букву.`
            },
            isDigit: {
                message: `Поле password должно содержать хотя бы одну цифру.`
            },
            min: {
                message: `Поле password должно содержать не менее 8 символов.`,
                value: 8
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validateConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 p-5 my-shadow">
                    <h3 className="mb-4 text-center auth-title">Авторизация</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Электронная почта"
                            onChange={handleChange}
                            name="email"
                            value={data.email}
                            error={errors.email}
                        />
                        <TextField
                            label="Пароль"
                            type="password"
                            onChange={handleChange}
                            name="password"
                            value={data.password}
                            error={errors.password}
                        />
                        <div className="button-wrapper">
                            <Button title="Войти" disabled={!isValid} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
