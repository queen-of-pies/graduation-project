import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router } from "react-router-dom";
import {Provider} from "react-redux";
import {createStore} from "./store/createStore";
import history from "./utils/history";

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore();

root.render(
    <Provider store={store}>
        <Router history={history}>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </Router>
    </Provider>
);

reportWebVitals();
