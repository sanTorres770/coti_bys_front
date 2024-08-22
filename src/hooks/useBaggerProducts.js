import customAxios from "../config/axios.js";
import {useState} from "react";

export const useBaggerProducts = () => {

    const [allBaggerProducts, setAllBaggerProducts] = useState([]);
    const [baggerProductData, setBaggerProductData] = useState({})
    const [baggerProductEditSupplies,setBaggerProductEditSupplies] = useState([])
    const [velocityServiceOptionEdit,setVelocityServiceOptionEdit] = useState({})
    const [packingMaterialServiceOptionEdit,setPackingMaterialServiceOptionEdit] = useState({})

    const config = () => {
        return {
            headers: {
                Authorization : `Bearer ${sessionStorage.getItem('token')}`
            }
        }
    }

    const saveNewBaggerProduct = async (newBaggerProduct) => {

        return await customAxios.post('/api/baggerProducts',newBaggerProduct,config())

    }

    const getAllBaggerProducts = async () => {

        try {

            const {data} = await customAxios('/api/baggerProducts',config())

            setAllBaggerProducts(data)

        }catch (error) {

        }

    }

    const getBaggerProductById = async (id) => {

        try {

            setBaggerProductData({})
            setBaggerProductEditSupplies([])
            setVelocityServiceOptionEdit({})
            setPackingMaterialServiceOptionEdit({})

            const {data} = await customAxios('/api/baggerProducts/' + id,config())

            setBaggerProductData(data)
            setBaggerProductEditSupplies(data.supplies)
            setVelocityServiceOptionEdit(data.velocity)
            setPackingMaterialServiceOptionEdit(data.packingMaterial)
        }catch (error) {

        }

    }

    const updateBaggerProduct = async (baggerProduct,id) => {

        setBaggerProductData({})
        setBaggerProductEditSupplies([])
        setVelocityServiceOptionEdit({})
        setPackingMaterialServiceOptionEdit({})

        return await customAxios.put(`/api/baggerProducts/${id}`,baggerProduct,config())


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