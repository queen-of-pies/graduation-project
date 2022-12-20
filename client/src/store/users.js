import {createAction, createSlice} from "@reduxjs/toolkit";
import usersService from "../services/users.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import history from "../utils/history";
import {toast} from "react-toastify";

const initialState = localStorageService.getAccessToken()
    ? {
        isLoading: true,
        errors: null,
        profile: {
            userId: localStorageService.getUserId(),
            userName: localStorageService.getUserName(),
            userEmail: localStorageService.getUserEmail()
        },
        isLoggedIn: true,
        dataLoaded: false
    }
    : {
        isLoading: false,
        errors: null,
        profile: null,
        isLoggedIn: false,
        dataLoaded: false
    };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        authRequestSuccess: (state, action) => {
            state.profile = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.errors = action.payload;
        },
        userLoggedOut: (state) => {
            state.profile = null;
            state.isLoggedIn = false;
            state.dataLoaded = false;
        },
        userUpdate: (state, action) => {
            state.profile = action.payload;
        }
    }
});

const {actions, reducer: usersReducer} = usersSlice;
const {
    authRequestSuccess,
    authRequestFailed,
    userLoggedOut,
    userUpdate
} = actions;

const authRequested = createAction("users/authRequested");
const userUpdateRequested = createAction("users/userUpdateRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");


export const getCurrentUserData = () => (state) => {
    return state.users.profile
};

export const updateUser = (payload) => async (dispatch) => {
    dispatch(userUpdateRequested());
    try {
        const data = await usersService.update(payload);
        localStorageService.updateUserData(data);
        dispatch(userUpdate({
            userId: data.userId,
            userName: data.userName,
            userEmail: data.email
        }));
    } catch (error) {
        dispatch(userUpdateFailed());
    }
};

export const signUp =
    (payload) =>
        async (dispatch) => {
            dispatch(authRequested());
            try {
                const data = await authService.register(payload);
                localStorageService.setTokens(data);
                dispatch(authRequestSuccess({
                    userId: data.userId,
                    userName: data.userName,
                    userEmail: data.email
                }));
                history.push("/")
            } catch (error) {
                dispatch(authRequestFailed(error.message));
            }
        };

export const signIn =
    ({payload, redirect}) =>
        async (dispatch) => {
            const {email, password} = payload;
            dispatch(authRequested());
            try {
                const data = await authService.login({email, password});
                localStorageService.setTokens(data);
                dispatch(authRequestSuccess({
                    userId: data.userId,
                    userName: data.userName,
                    userEmail: data.email
                }));
                history.push(redirect);
            } catch (error) {
                dispatch(authRequestFailed(error.message));
            }
        };

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getUserErrors = () => (state) => state.users.errors;

export default usersReducer;
