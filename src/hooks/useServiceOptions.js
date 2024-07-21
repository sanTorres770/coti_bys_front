import customAxios from "../config/axios.js";
import {useState} from "react";

export const useServiceOptions = () => {

    const [serviceOptionsByType, setServiceOptionsByType] = useState([])

    const getServiceOptionsByType = async (types) => {

        try {

            const {data} = await customAxios('/api/serviceOptions/types',{params:{types:types}})

            setServiceOptionsByType(data)

        }catch (error){
            console.log(error)
        }
    }

    return {serviceOptionsByType,
        getServiceOptionsByType}

}