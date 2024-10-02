import customAxios from "../config/axios.js";
import {useState} from "react";

export const useBaggerQuotations = () => {

    const [allBaggerQuotations, setAllBaggerQuotations] = useState([]);
    const [baggerQuotationDataSelected, setBaggerQuotationDataSelected] = useState({})
    const [electronicSupplies, setElectronicSupplies] = useState([])
    const [pneumaticSupplies, setPneumaticSupplies] = useState([])
    const [electronicSuppliesPriceResult, setElectronicSuppliesPriceResult] = useState(0)
    const [pneumaticSuppliesPriceResult, setPneumaticSuppliesPriceResult] = useState(0)
    const [totalQuotationPrice, setTotalQuotationPrice] = useState(0)
    const [newBaggerQuotationLength, setNewBaggerQuotationLength] = useState(0)

    const config = () => {
        return {
            headers: {
                Authorization : `Bearer ${sessionStorage.getItem('token')}`
            }
        }
    }

    const saveNewBaggerQuotation = async (newBaggerQuotation) => {

        return await customAxios.post('/api/baggerQuotations',newBaggerQuotation)

    }

    const getAllBaggerQuotation = async () => {

        try {

            const {data} = await customAxios('/api/baggerQuotations',config())

            handleSetNewBaggerQuotationLength(data.filter(item => item.status === 'NE').length)


            setAllBaggerQuotations(data)

        }catch (error) {

        }

    }

    const getBaggerQuotationById = async (baggerQuotationId,consecutive) => {

        try {

            const {data} = await customAxios(`/api/bagger/calculate/${baggerQuotationId}/${consecutive}`,config())

            setBaggerQuotationDataSelected(data)


            if (data.baggerProduct !== null){

                setElectronicSupplies(data.electronic.supplyList)
                setPneumaticSupplies(data.pneumatic.supplyList)
                setElectronicSuppliesPriceResult(data.electronic.priceResult)
                setPneumaticSuppliesPriceResult(data.pneumatic.priceResult)
                setTotalQuotationPrice(data.totalPrice)
            }


        }catch (error) {

        }

    }

    const handleSetNewBaggerQuotationLength = (newBaggerQuotationLength) => {

        setNewBaggerQuotationLength(newBaggerQuotationLength)
    }

    return {
        saveNewBaggerQuotation,
        allBaggerQuotations,
        getAllBaggerQuotation,
        getBaggerQuotationById,
        baggerQuotationDataSelected,
        electronicSupplies,
        pneumaticSupplies,
        electronicSuppliesPriceResult,
        pneumaticSuppliesPriceResult,
        newBaggerQuotationLength,
        totalQuotationPrice,
        setTotalQuotationPrice,
        setNewBaggerQuotationLength,
        handleSetNewBaggerQuotationLength
    }

}