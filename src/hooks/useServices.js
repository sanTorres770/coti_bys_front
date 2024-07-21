import customAxios from "../config/axios.js";
import useApp from "./useApp.js";
import {useState} from "react";

export const useServices = () => {

    const token = localStorage.getItem('AUTH_TOKEN')
    const [services, setServices] = useState([])
    const [serviceSelectedData, setServiceSelectedData] = useState({})

    const getAllServices = async () => {

        try {

            const {data} = await customAxios('/api/services')

            setServices(data)

        }catch (error){
            console.log(error)
        }
    }

    const getServiceById = async (serviceId) => {

        try {

            const {data} = await customAxios('/api/services/' + serviceId)

            setServiceSelectedData(data)

        }catch (error){
            console.log(error)
        }
    }

    return {services,
        getAllServices,
        serviceSelectedData,
        getServiceById}

}