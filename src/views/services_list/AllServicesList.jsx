import {useServiceRequests} from "../../hooks/useServiceRequests.js";
import ServiceRequestRow from "../../components/services/ServiceRequestRow.jsx";
import {useEffect} from "react";
import useApp from "../../hooks/useApp.js";
import ServiceRequestHeader from "../../components/services/ServiceRequestHeader.jsx";

export default function AllServicesList() {

    const {servicesList, allServiceRequests} = useServiceRequests();
    const {setCurrentAdminOption, filterOptionsSelected} = useApp();

    useEffect(()=>{
        allServiceRequests()
        setCurrentAdminOption({
            id: '1',
            name: 'Servicios',
            path: '/admin/services',
            adminOption: '5'
        })
    },[])

    useEffect(()=>{

        filterServicesList(servicesList)

    },[filterOptionsSelected])


    const filterServicesList = (list) => {

        let listFiltered = list

        if (filterOptionsSelected.includes('1')){

            listFiltered = list.filter(service => !service.finished)
        }
        if (filterOptionsSelected.includes('2')){

            listFiltered = list.filter(service => service.finished)
        }
/*        if (filterOptionsSelected.includes('3')){

            list = list.filter(service => service.finished)
        }*/
        return listFiltered

    }

    return (

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">


        <ServiceRequestHeader isAdmin={true}></ServiceRequestHeader>


        {filterServicesList(servicesList).length > 0 ? filterServicesList(servicesList).map(service => (

            <ServiceRequestRow key={service.service_request_id} service={service} isAdmin={true}></ServiceRequestRow>

        )):
            <div className='w-full mt-1 rounded-md bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                <p className='px-6 py-6 font-medium text-gray-900 whitespace-nowrap text-center dark:text-white hover:text-white'>
                    {'No existen registros de servicios por el momento!'}
                </p>
            </div>

        }

    </div>

    )
}