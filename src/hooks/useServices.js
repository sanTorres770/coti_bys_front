import customAxios from "../config/axios.js";
import {useState} from "react";

export const useServices = () => {

    const token = localStorage.getItem('AUTH_TOKEN')
    const [services, setServices] = useState([])
    const [serviceSelectedData, setServiceSelectedData] = useState(null)

    const getAllServices = async () => {

        try {

            const {data} = await customAxios('/api/services')

            setServices(data)

        }catch (error){

        }
    }

    const getServiceById = async (serviceId) => {

        try {

            const {data} = await customAxios('/api/services/' + serviceId)

            setServiceSelectedData(data)

        }catch (error){

        }
    }

    return {services,
        getAllServices,
        serviceSelectedData,
        setServiceSelectedData,
        getServiceById}

}