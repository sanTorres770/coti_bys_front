import customAxios from "../config/axios.js";
import {useState} from "react";

export const useBaggerProducts = () => {

    const [allBaggerProducts, setAllBaggerProducts] = useState([]);
    const [baggerProductData, setBaggerProductData] = useState({})
    const [baggerProductEditSupplies,setBaggerProductEditSupplies] = useState([])
    const [velocityServiceOptionEdit,setVelocityServiceOptionEdit] = useState({})
    const [packingMaterialServiceOptionEdit,setPackingMaterialServiceOptionEdit] = useState({})


    const saveNewBaggerProduct = async (newBaggerProduct) => {

        let response;

        try {

            const {data} = await customAxios.post('/api/baggerProducts',newBaggerProduct)

            response = data


        }catch (error) {
            console.log(error)
        }

        return response
    }

    const getAllBaggerProducts = async () => {

        try {

            const {data} = await customAxios('/api/baggerProducts')

            setAllBaggerProducts(data)

        }catch (error) {
            console.log(error)
        }

    }

    const getBaggerProductById = async (id) => {

        try {

            setBaggerProductData({})
            setBaggerProductEditSupplies([])
            setVelocityServiceOptionEdit({})
            setPackingMaterialServiceOptionEdit({})

            const {data} = await customAxios('/api/baggerProducts/' + id)

            setBaggerProductData(data)
            setBaggerProductEditSupplies(data.supplies)
            setVelocityServiceOptionEdit(data.velocity)
            setPackingMaterialServiceOptionEdit(data.packingMaterial)
        }catch (error) {
            console.log(error)
        }

    }

    const updateBaggerProduct = async (baggerProduct,id) => {

        let response;

        try {

            const {data} = await customAxios.put(`/api/baggerProducts/${id}`,baggerProduct)

            setBaggerProductData({})
            setBaggerProductEditSupplies([])
            setVelocityServiceOptionEdit({})
            setPackingMaterialServiceOptionEdit({})

            response = data

        }catch (error) {
            console.log(error)
        }

        return response

    }



    return {
        saveNewBaggerProduct,
        allBaggerProducts,
        getAllBaggerProducts,
        baggerProductData,
        getBaggerProductById,
        baggerProductEditSupplies,
        setBaggerProductEditSupplies,
        velocityServiceOptionEdit,
        setVelocityServiceOptionEdit,
        packingMaterialServiceOptionEdit,
        setPackingMaterialServiceOptionEdit,
        updateBaggerProduct
    }

}