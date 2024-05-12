import customAxios from "../config/axios.js";
import useApp from "./useApp.js";

export const useServiceRequests = () => {

    const token = localStorage.getItem('AUTH_TOKEN')
    const {serviceSelected,
        setServiceSelected,
        servicesList,
        setServicesList,
        assignationsList,
        setAssignationsList,
        evidencesList,
        setEvidencesList,
        assignationServiceSelected,
        setAssignationServiceSelected,
        schedulingService,
        setSchedulingService,
        newAssignationSelected} = useApp()

    const serviceRequestsByCustomer = async () => {

        setServicesList([])
        setAssignationsList([])
        setEvidencesList([])

        try {
            const {data} = await customAxios('/api/customer/services', {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })
            setServicesList(data.data)
            setAssignationsList(data.assignations)
            setEvidencesList(data.evidences)


        }catch (error){
            console.log(error)
        }
    }

    const allServiceRequests = async () => {

        setServicesList([])
        setAssignationsList([])
        setEvidencesList([])

        try {
            const {data} = await customAxios('/api/all/service/request', {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })
            setServicesList(data.data)
            setAssignationsList(data.assignations)
            setEvidencesList(data.evidences)
        }catch (error){
            console.log(error)
        }
    }

    const serviceRequestsByOperator = async () => {

        try {
            const {data} = await customAxios('/api/operator/services', {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })
            setServicesList(data.data)
            setEvidencesList(data.evidences)
        }catch (error){
            console.log(error)
        }
    }

    const handleServiceSelected = id => {

        const serviceSelected = servicesList.filter(service => service.service_request_id === id)
        const assignations = assignationsList.filter(assignation => assignation.service_id === id)
        setAssignationServiceSelected(assignations)
        setServiceSelected({...serviceSelected[0],assignations})
    }

    const handleSelectSchedulingDate = date => {
        setSchedulingService({...[newAssignationSelected],date})
    }


    return {
        serviceRequestsByUser: serviceRequestsByCustomer,
        servicesList,
        allServiceRequests,
        handleServiceSelected,
        handleSelectSchedulingDate,
        serviceSelected,
        assignationsList,
        evidencesList,
        assignationServiceSelected,
        setAssignationServiceSelected,
        schedulingService,
        setSchedulingService,
        serviceRequestsByOperator
    }
}