import {createAction, createSlice} from "@reduxjs/toolkit";
import accountsService from "../services/accounts.service";
import history from "../utils/history";


const accountsSlice = createSlice({
    name: "accounts",
    initialState: {
        entities: [],
        isLoading: true,
        errors: null
    },
    reducers: {
        accountsRequested: (state) => {
            state.isLoading = true;
        },
        accountsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        accountsRequestedFailed: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        accountCreated: (state, action) => {
            state.entities.push(action.payload)
        },
        accountCreateRequestedFailed: (state, action) => {
            state.errors = action.payload;
        },
        accountUpdated: (state, action) => {
            const index = state.entities.findIndex(
                (account) => account._id === action.payload._id
            );
            state.entities[index] = action.payload;
        },
    }
});

const {actions, reducer: accountsReducer} = accountsSlice;
const {
    accountsRequested,
    accountsReceived,
    accountsRequestedFailed,
    accountCreated,
    accountCreateRequestedFailed,
    accountUpdated
} = actions;

const accountCreateRequested = createAction("accounts/accountCreateRequested");
const accountUpdateRequested = createAction("accounts/accountUpdateRequested");


export const loadAccountsList = () => async dispatch => {
    dispatch(accountsRequested())
    try {
        const data = await accountsService.get()
        dispatch(accountsReceived(data))
    } catch (error) {
        dispatch(accountsRequestedFailed(error.message))
    }
}

export const createAccount = (payload) => async dispatch => {
    dispatch(accountCreateRequested())
    try {
        const data = await accountsService.add(payload)
        dispatch(accountCreated(data))
        history.push("/accounts")
    } catch (error) {
        dispatch(accountCreateRequestedFailed())
    }
}

export const updateAccount = (payload) => async dispatch => {
    dispatch(accountUpdateRequested())
    try {
        const data = await accountsService.update(payload)
        dispatch(accountUpdated(data))
        history.push("/accounts")
    } catch (error) {
        dispatch(accountCreateRequestedFailed())
    }
}

export const getAccountsList = () => state => state.accounts.entities
export const getAccountById = (id) => state => state.accounts.entities.find(acc => acc._id === id);

export const getAccountsLoadingStatus = () => state => state.accounts.isLoading


export default accountsReducer;
