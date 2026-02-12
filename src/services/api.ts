import axios from "axios";
import { store } from "../app/store"

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    timeout: 10000,
});


api.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
});