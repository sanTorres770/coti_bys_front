import customAxios from "../config/axios.js";
import {useState} from "react";

export const useSupplies = () => {

    const [allSupplies, setAllSupplies] = useState([]);

    const config = () => {
        return {
            headers: {
                Authorization : `Bearer ${sessionStorage.getItem('token')}`
            }
        }
    }

    const saveNewSupply = async (newSupply) => {

        return await customAxios.post('/api/supplies',newSupply,config())

    }

    const getAllSupplies = async () => {

        try {

            const {data} = await customAxios('/api/supplies',config())

            setAllSupplies(data)


        }catch (error) {

        }

    }

    const getSupplyById = async (id) => {

        try {

            const {data} = await customAxios(`/api/supplies/${id}`,config())


        }catch (error) {

        }

    }

    const updateSupply = async (supply,id) => {

        return await customAxios.put(`/api/supplies/${id}`,supply,config())

    }



    return {
        saveNewSupply,
        getAllSupplies,
        allSupplies,
        getSupplyById,
        updateSupply
    }

}