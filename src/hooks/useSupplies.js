import customAxios from "../config/axios.js";
import {useState} from "react";

export const useSupplies = () => {

    const [allSupplies, setAllSupplies] = useState([]);

    const saveNewSupply = async (newSupply) => {

        return await customAxios.post('/api/supplies',newSupply)

    }

    const getAllSupplies = async () => {

        try {

            const {data} = await customAxios('/api/supplies')

            setAllSupplies(data)


        }catch (error) {
            console.log(error)
        }

    }

    const getSupplyById = async (id) => {

        try {

            const {data} = await customAxios(`/api/supplies/${id}`)


        }catch (error) {
            console.log(error)
        }

    }

    const updateSupply = async (supply,id) => {

        return await customAxios.put(`/api/supplies/${id}`,supply)

    }



    return {
        saveNewSupply,
        getAllSupplies,
        allSupplies,
        getSupplyById,
        updateSupply
    }

}