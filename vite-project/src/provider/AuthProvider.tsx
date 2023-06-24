import {useState,useEffect } from "react";
import { AuthContext } from "../context";
import { useNavigate } from "react-router-dom";



const AuthProvider = ({children}:any) => {

    const navigate = useNavigate()
    const [auth,setAuth] = useState(false)

useEffect(() => {
    const password = localStorage.getItem("password");
    if(password && auth === false){
        navigate("/login")
    } else if (password && auth === true){
        navigate("/home")
    }
    if(!password){
        navigate("/")
    }
}
,[navigate,auth])

return (
        <AuthContext.Provider value={{
            auth,
            setAuth
    }}>
        {children}
    </AuthContext.Provider>)
}


export default AuthProvider;
