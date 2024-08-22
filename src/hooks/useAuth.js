import customAxios from "../config/axios.js";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

export const useAuth = () => {

    const [login, setLogin] = useState(
        JSON.parse(sessionStorage.getItem('cb_login')) ||
        {
            isAuth: false,
            isAdmin: false,
            user: undefined,
        }
    );

    const config = () => {
        return {
            headers: {
                Authorization : `Bearer ${sessionStorage.getItem('token')}`
            }
        }

    }

    const handlerLogin = async (form,setIsLoading) => {

        setIsLoading(true)

        try {
            const {data} = await customAxios.post('/login',form)

            const token = data.token;

            sessionStorage.setItem('token', `Bearer ${token}`);

            const claims = JSON.parse(atob(token.split(".")[1]));

            const user = { username: claims.sub }

            const login = {
                isAuth: true,
                isAdmin: claims.isAdmin,
                user,
            }

            sessionStorage.setItem('cb_login', JSON.stringify(login));
            sessionStorage.setItem('login_message', data.message);
            setLogin(login)

        }catch (error){

            if (error.code === "ERR_BAD_REQUEST"){
                setIsLoading(false)
                toast.error(error.response.data.message)
            }

            if (error.code === "ERR_NETWORK"){
                toast.error('Error de conexión.')
                setIsLoading(false)
            }



        }
    }

    const handlerLogout = async () => {

        sessionStorage.removeItem('token');
        sessionStorage.removeItem('cb_login');
        sessionStorage.clear();
        setLogin({
            isAuth: false,
            isAdmin: false,
            user: undefined,
        })
    }

    const getUserByUsername = async (username) => {

        return customAxios(`/users/${username}`,config())

    }

    return {
        handlerLogin,
        handlerLogout,
        login,
        getUserByUsername
    }
}
