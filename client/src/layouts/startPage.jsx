import React from 'react';
import StartImage from '../img/start-image.webp';
import Button from '../components/button';
import { Link } from 'react-router-dom';

const StartPage = () => {
    return (
        <div className="d-flex justify-content-around">
            <img className="img-fluid mt-4" src={StartImage} alt="Start image" />
            <div className="d-flex flex-column mt-xxl-5">
                <h1 className="display-1 start-title">EasyMoney</h1>
                <figure className="text-end mt-4">
                    <blockquote className="blockquote">
                        <p className="start-blockquote">
                            И сколько же это будет стоить?
                        </p>
                        <p className="start-blockquote">Это бесплатно!</p>
                        <p className="start-blockquote">Звучит дороговато.</p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                        Гомер Симпсон (The Simpsons)
                    </figcaption>
                </figure>
                <div className="d-flex justify-content-between mt-4">
                    <Link to="/login">
                        <Button title={'Вход'} />
                    </Link>
                    <Link to="/register">
                        <Button title={'Регистрация'} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StartPage;
