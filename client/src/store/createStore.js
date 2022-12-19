import {combineReducers, configureStore} from "@reduxjs/toolkit";
import usersReducer from "./users";
import accountsReducer from "./accounts";
import transactionsReducer from "./transactions";

const rootReducer = combineReducers({
    users: usersReducer,
    accounts: accountsReducer,
    transactions: transactionsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
