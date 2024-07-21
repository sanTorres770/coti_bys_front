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


    const saveNewBaggerQuotation = async (newBaggerQuotation) => {

        try {

            const {data} = await customAxios.post('/api/baggerQuotations',newBaggerQuotation)


        }catch (error) {
            console.log(error)
        }

    }

    const getAllBaggerQuotation = async () => {

        try {

            const {data} = await customAxios('/api/baggerQuotations')

            handleSetNewBaggerQuotationLength(data.filter(item => item.status === 'NE').length)


            setAllBaggerQuotations(data)

        }catch (error) {
            console.log(error)
        }

    }

    const getBaggerQuotationById = async (baggerQuotationId) => {

        try {

            const {data} = await customAxios('/api/bagger/calculate/' + baggerQuotationId)

            setBaggerQuotationDataSelected(data)


            if (data.baggerProduct !== null){

                setElectronicSupplies(data.electronic.supplyList)
                setPneumaticSupplies(data.pneumatic.supplyList)
                setElectronicSuppliesPriceResult(data.electronic.priceResult)
                setPneumaticSuppliesPriceResult(data.pneumatic.priceResult)
                setTotalQuotationPrice(data.totalPrice)
            }


        }catch (error) {
            console.log(error)
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