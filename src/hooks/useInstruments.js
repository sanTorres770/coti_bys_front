import customAxios from "../config/axios.js";
import useApp from "./useApp.js";

export const useInstruments = () => {

    const token = localStorage.getItem('AUTH_TOKEN')
    const {instruments,
        setInstruments} = useApp()

    const getAllInstruments = async () => {

        try {
            const {data} = await customAxios('/api/all/instruments', {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })

            const instruments = data.map(item => {
                return {
                    id: item.instrument_id,
                    name: item.name,
                    fk_type_measure : item.fk_type_measure
                }
            })

            setInstruments(instruments)
        }catch (error){
            console.log(error)
        }
    }

    return {instruments,
        getAllInstruments}

}