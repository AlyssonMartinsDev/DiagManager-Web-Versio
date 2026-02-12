import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


type AuthState = {
    accessToken: string | null;
};

const initialState: AuthState = {
    accessToken: localStorage.getItem("accessToken"),
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            localStorage.setItem("accessToken", action.payload)
        },
        clearToken: (state) => {
            state.accessToken = null;
            localStorage.removeItem("accessToken")
        },
    },
});


export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer
