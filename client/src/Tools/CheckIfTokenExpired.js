import { token } from "@/pages/auth/Token";
import { isExpired } from "react-jwt"

export const checkIfTokenExpired = ()=>{
    if(isExpired(token)){
        window.location.href = "/auth/sign-in"
    } 
}