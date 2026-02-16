import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAppSelector } from "../app/hooks";


interface Props {
    children: ReactNode;
}

export default function ProtectedRout({ children }: Props) {
    const token = useAppSelector((state: any) => state.auth.token)


    if (!token) {
        return <Navigate to="/login" replace />;
    }
    // Inicio da logica: 1-Se não possui token redireciona para o login



    return children;
}