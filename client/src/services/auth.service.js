import axios from "axios";
import localStorageService from "./localStorage.service";
import config from "../config.json";
import {toast} from "react-toastify";

const httpAuth = axios.create({
    baseURL: config.apiEndpoint + "/auth/",
    params: { key: process.env.REACT_APP_FIREBASE_KEY }
});

const authService = {
    register: async (payload) => {
        try {
            const { data } = await httpAuth.post("signUp", payload);
            return data;
        } catch (e) {
            if (e.response.data.error.message === 'EMAIL_EXISTS') {
                toast('Пользователь с таким email уже существует')
            }
        }
    },
    login: async ({ email, password }) => {
        try {
            const { data } = await httpAuth.post("signInWithPassword", {
                email,
                password,
                returnSecureToken: true
            });
            return data;
        } catch (e) {
            toast('Ошибка авторизации')
        }
    },
    refresh: async () => {
        const { data } = await httpAuth.post("token", {
            grant_type: "refresh_token",
            refresh_token: localStorageService.getRefreshToken()
        });
        return data;
    }
};

export default authService;
