import customAxios from "../config/axios.js";
import useSWR from "swr";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export const useAuth = ({middleware, url}) => {

    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate()

    const {data:user, error, mutate} = useSWR('/api/user', () =>
            customAxios('/api/user', {
            headers: {
                Authorization : `Bearer ${token}`
            }
        })
            .then(response => response.data)
            .catch(error => {
                throw Error(error?.response?.data?.errors)
            })
    )


    const login = async (form,setErrores) => {

        try {
            const {data} = await customAxios.post('/api/login',form)
            localStorage.setItem('AUTH_TOKEN', data.token)
            setErrores([])
            await mutate()
        }catch (error){
            setErrores(Object.values(error.response.data.errors))

        }
    }

    const registerCustomerUser = async (form,setErrores,setValidationErrors) => {

        try {
            const {data} = await customAxios.post('/api/register/customer/user',form,{
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })
            setErrores([])
            setValidationErrors({})
            await mutate()

            if (data.response){
                toast.success(data.message)
                navigate('/admin')
            }else {
                toast.error(data.message)
                console.log(data.exception)
            }

        }catch (error){
            setErrores(Object.values(error.response.data.errors))
            setValidationErrors(error.response.data.errors)
        }
    }

    const registerOperatorUser = async (form,setErrores,setValidationErrors) => {

        try {
            const {data} = await customAxios.post('/api/register/operator/user',form,{
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })
            setErrores([])
            setValidationErrors({})
            await mutate()

            if (data.response){
                toast.success(data.message)
                navigate('/admin')
            }else {
                toast.error(data.message)
            }

        }catch (error){
            setErrores(Object.values(error.response.data.errors))
            setValidationErrors(error.response.data.errors)
        }
    }

    const logout = async () => {

        try {
            await customAxios.post('/api/logout',null,{
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })

            localStorage.removeItem('AUTH_TOKEN')
            await mutate(undefined)
        }catch (error){
            throw Error(error?.response?.data?.errors)
        }
    }

    useEffect(()=>{
        if (middleware === 'guest' && url && user){
            navigate(url)
        }
        if (middleware === 'auth' && error){
            navigate('/auth/login')
        }
    },[user,error])

    return {
        login,
        registerCustomerUser,
        registerOperatorUser,
        logout,
        user,
        error
    }
}