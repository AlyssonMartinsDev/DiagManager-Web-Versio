import { api } from "../../services/api"



export async function loginRequest(username: string, password: string) {
    const body = new URLSearchParams();
    body.append("username", username)
    body.append("password", password)

    
    


    const res = await api.post("/auth/login", body.toString(), {

        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
    });

    
    return res.data

}
