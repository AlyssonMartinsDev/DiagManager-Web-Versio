import { api } from "../../services/api"

type LoginResponse = {
    access_token: string;
    token_type: "bearer" | string;
};

export async function loginRequest(email: string, password: string) {
    const body = new URLSearchParams();
    body.append("email", email)
    body.append("password", password)

    const res = await api.post<LoginResponse>("/auth/login", body, {

        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    return res.data

}
