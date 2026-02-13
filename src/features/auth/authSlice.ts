import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginRequest } from "./authApi";

export const loginThunk = createAsyncThunk(
    "auth/login",
    async ({username, password}: {username: string; password: string;}, thunkApi) => {
        try {
            const data = await loginRequest(username, password)

            if (!data?.access_token){
                return thunkApi.rejectWithValue("Login inválido");
            }

            return data.access_token;
        } catch (err: any) {
            const detail = err?.response?.data?.detail; 
            
            if (Array.isArray(detail) && detail[0]?.msg){
                return thunkApi.rejectWithValue(detail[0].msg);
            }

            if (typeof detail === "string") {
                return thunkApi.rejectWithValue(detail);
            }

            return thunkApi.rejectWithValue("Erro ao tentar fazer o login.")
        }
    }
);

const initialState = {
    token: localStorage.getItem("accessToken") || null,
    loading: false,
    error: null as string | null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.error = null;
            state.loading = false;
            localStorage.removeItem("accessToken");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                localStorage.setItem("accessToken", action.payload);
            })
            .addCase(loginThunk.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload || "Falha no login"
            })
    }
})


export const {logout} = authSlice.actions;
export default authSlice.reducer;

