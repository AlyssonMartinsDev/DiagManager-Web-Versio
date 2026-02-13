import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loginThunk } from "../features/auth/authSlice";

export default function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {token, loading, error} = useAppSelector(
        (state: any ) => state.auth
    )
    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    useEffect(() => {
            if(token) {
                navigate("/dashboard")
            }
        }, [token, navigate])

    async function handleSubmit(e: any ){


        e.preventDefault();

        
        // Validaçãp Local
        if (!email || !password){
            return;
        }

        dispatch(
            loginThunk({
                username: email,
                password
            })
        );
        
        


        
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950">
            <div className="w-full max-w-sm rounded-xl border border-gray-800 bg-gray-900 p-6">
                <h1 className="text-xl font-semibold text-white">Entrar</h1>
                <p className="mt-1 text-sm text-gray-400">DiagManager Web</p>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-sm text-gray-300">Email</label>
                        <input
                            className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-white outline-none focus:border-gray-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="username"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-300">Senha</label>
                        <input
                            type="password"
                            className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-white outline-none focus:border-gray-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                    </div>

                    {error && (
                        <div className="rounded-lg border border-red-900 bg-red-950 px-3 py-2 text-sm text-red-200">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-white px-3 py-2 font-medium text-gray-900 disabled:opacity-60"
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                </form>
            </div>
        </div>
    );
}
