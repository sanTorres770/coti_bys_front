import customAxios from "../config/axios.js";
import {useState} from "react";

export const useBaggerProducts = () => {


    const saveNewBaggerProduct = async (newBaggerProduct) => {

        try {

            const {data} = await customAxios.post('/api/baggerProducts',newBaggerProduct)

            console.log(data)


        }catch (error) {
            console.log(error)
        }

    }


    return {
        saveNewBaggerProduct,
    }

}