import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import {createStore} from "./store/createStore";
import history from "./utils/history";

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore();

root.render(
    <Provider store={store}>
        <BrowserRouter history={history}>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </BrowserRouter>
    </Provider>
);

reportWebVitals();
