import customAxios from "../config/axios.js";
import {useState} from "react";

export const useSupplies = () => {

    const [allSupplies, setAllSupplies] = useState([]);

    const saveNewSupply = async (newSupply) => {

        try {

            const {data} = await customAxios.post('/api/supplies',newSupply)

            console.log(data)


        }catch (error) {
            console.log(error)
        }

    }

    const getAllSupplies = async () => {

        try {

            const {data} = await customAxios('/api/supplies')

            setAllSupplies(data)


        }catch (error) {
            console.log(error)
        }

    }


    return {
        saveNewSupply,
        getAllSupplies,
        allSupplies
    }

}