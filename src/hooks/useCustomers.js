import customAxios from "../config/axios.js";
import useApp from "./useApp.js";

export const useCustomers = () => {

    const token = localStorage.getItem('AUTH_TOKEN')
    const {customers, setCustomers} = useApp()

    const getAllCustomers = async () => {

        try {
            const {data} = await customAxios('/api/all/customers', {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })
            setCustomers(data)
        }catch (error){
            console.log(error)
        }
    }

    return {customers,
        getAllCustomers}

}