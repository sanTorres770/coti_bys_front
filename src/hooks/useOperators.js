import customAxios from "../config/axios.js";
import useApp from "./useApp.js";

export const useOperators = () => {

    const token = localStorage.getItem('AUTH_TOKEN')
    const {operators,
        setOperators} = useApp()

    const getAllOperators = async () => {

        try {
            const {data} = await customAxios('/api/all/operators', {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })
            setOperators(data)
        }catch (error){
            console.log(error)
        }
    }

    return {operators,
        getAllOperators}

}