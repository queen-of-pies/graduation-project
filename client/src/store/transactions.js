import {createAction, createSlice} from "@reduxjs/toolkit";
import transactionsService from "../services/transactions.service";
import {loadAccountsList} from "./accounts";

const sortByDateAsc = (a, b) => {
    const a_ = Date.parse(a.txDate);
    const b_ = Date.parse(b.txDate);
    return a_ < b_ ? 1 : -1;
};

const transactionsSlice = createSlice({
    name: "transactions",
    initialState: {
        entities: [],
        isLoading: true,
        errors: null
    },
    reducers: {
        transactionsRequested: (state) => {
            state.isLoading = true;
        },
        transactionsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        transactionsRequestedFailed: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        transactionCreated: (state, action) => {
            state.entities.push(action.payload)
            state.entities = state.entities.sort(sortByDateAsc)
        },
        transactionCreateRequestedFailed: (state, action) => {
            state.errors = action.payload;
        },
        transactionDeleted: (state, action) => {
            state.entities = state.entities.filter(tx => tx._id !== action.payload)
        },
        transactionDeleteRequestedFailed: (state, action) => {
            state.errors = action.payload;
        }
    }
});

const {actions, reducer: transactionsReducer} = transactionsSlice;
const {
    transactionsRequested,
    transactionsReceived,
    transactionsRequestedFailed,
    transactionCreated,
    transactionCreateRequestedFailed,
    transactionDeleted,
    transactionDeleteRequestedFailed
} = actions;

const transactionCreateRequested = createAction("transactions/transactionCreateRequested");
const transactionDeleteRequested = createAction("transactions/transactionDeleteRequested");


export const loadTransactionsList = () => async dispatch => {
    dispatch(transactionsRequested())
    try {
        const data = await transactionsService.get()
        dispatch(transactionsReceived(data))
    } catch (error) {
        dispatch(transactionsRequestedFailed(error.message))
    }
}

export const createTransaction = (payload) => async dispatch => {
    dispatch(transactionCreateRequested())
    try {
        const data = await transactionsService.add(payload)
        dispatch(transactionCreated(data))
        dispatch(loadAccountsList())
    } catch (error) {
        dispatch(transactionCreateRequestedFailed())
    }
}

export const deleteTransaction = (payload) => async dispatch => {
    dispatch(transactionDeleteRequested())
    try {
        const data = await transactionsService.delete(payload)
        if (data === "deleted") {
            dispatch(transactionDeleted(payload))
            dispatch(loadAccountsList())
        }
    } catch (error) {
        dispatch(transactionDeleteRequestedFailed())
    }
}

export const getTransactionsList = () => state => state.transactions.entities

export const getTransactionsLoadingStatus = () => state => state.transactions.isLoading


export default transactionsReducer;
