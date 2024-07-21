import useApp from "../../hooks/useApp.js";
/*import {useAuth} from "../../hooks/useAuth.js";*/
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import AssignationRow from "./AssignationRow.jsx";
import {useOperators} from "../../hooks/useOperators.js";
import customAxios from "../../config/axios.js";
import {toast} from "react-toastify";
import ValidationFormAlert from "../alerts/ValidationFormAlert.jsx";
import {commonConfig} from "../../hooks/commonConfig.js";
import {CircularProgressbar, buildStyles} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
/*import Map from "../map/Map.jsx";*/
/*import MapContainer from "../map/MapContainer.jsx";*/

export default function ServiceData() {

    const {serviceSelected,
        handleClickAssignationsModal,
        handleClickSchedulingServiceModal,
        handleClickFinishServiceModal,
        assignationServiceSelected:assignations,
        schedulingService,
        setSchedulingService,
        newAssignationSelected:newAssignations,
        setNewAssignationSelected,
        schedulingDate,
        setSchedulingDate,
        evidencesList} = useApp()


    /*const {user} = useAuth({middleware:'auth'})*/
    const navigate = useNavigate()
    const {getAllOperators} = useOperators()
    const [errores, setErrores] = useState([])
    const [progress, setProgress] = useState(0)
    const {serviceState,progressColor} = commonConfig()
    const imagesPath = import.meta.env.VITE_API_URL
    /*const apiGoogleMaps = import.meta.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY*/

    const { service_request_id,
        request_date,
        contact_name,
        contact_telephone,
        contact_email,
        service_address,
        observation,
        progress:serviceProgress,
        finished,
        instrument_description,
        capacity,
        unit_capacity,
        unit_scale_division,
        scale_division,
        location,
        business_name,
        country_name,
        state_name,
        town_name,
        service_types_name,
        scheduling_date,
        finished_date,
        state,
        customer_user_name,
        customer_user_email,
        operator_finisher_name,
        operator_finisher_email
    } = serviceSelected



    useEffect(()=> {

        setTimeout(() => {
            setProgress(serviceProgress)
        }, 900)

        window.scroll({
            top: 100,
            behavior: 'smooth'
        })

        setNewAssignationSelected([])
        setSchedulingDate('')
        assignations

        getAllOperators()

        if(business_name === undefined) {
            navigate('/')
        }
    },[serviceSelected])

    useEffect(()=> {

        setSchedulingService({newAssignations,schedulingDate, serviceSelected})

    },[newAssignations, schedulingDate])


    const operatorEvidences = evidencesList.filter(evidence => evidence.user_type === 3 && evidence.service_id === service_request_id)
    const customerEvidences = evidencesList.filter(evidence => evidence.user_type === 2 && evidence.service_id === service_request_id)

    const handleSaveSchedulingService = async () => {

        try {
            const {data} = await customAxios.post('/api/scheduling/service',schedulingService)

            if (data.response){
                setErrores([])
                toast.success(data.message)
                navigate('/admin/services')
            }else {
                console.log(data)
                toast.error(data.message)
            }

        }catch (error){
            console.log(error)
            setErrores(Object.values(error.response.data.errors))
        }

        if (errores){

            window.scroll({
                top: 100,
                behavior: 'smooth'
            })
        }

    }

    return (

        <section className="bg-gray-900 rounded-xl shadow-xl shadow-gray-600">
                <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">

                    {errores ? errores.map(error => <ValidationFormAlert key={error}>{error}</ValidationFormAlert>) : null}

                    <div className="mb-8 lg:mb-16">

                        <div className='md:flex justify-between w-full'>

                            <h2 className="mb-4 text-4xl tracking-tight text-white font-extrabold">{`Servicio: ${service_request_id}`}</h2>

                            {(user ? user.role === 'admin' && scheduling_date === null : null) && (
                                <button type='button' onClick={()=>handleClickSchedulingServiceModal()}
                                        className="flex gap-4 bg-blue-500 hover:bg-blue-300 text-white w-52 mb-4 p-3 rounded-md uppercase font-bold cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                         className="bi bi-table text-black" viewBox="0 0 16 16">
                                        <path
                                            d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/>
                                    </svg>
                                    <p className='text-black font-bold text-lg uppercase'>agendar</p>
                                </button>
                            )}

                            {scheduling_date !== null && (

                                <div className="flex gap-4 md:my-0 my-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                         className="bi bi-table text-white" viewBox="0 0 16 16">
                                        <path
                                            d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/>
                                    </svg>
                                    <p className="sm:text-xl text-gray-400 underline">
                                        {finished_date === null ?
                                            `Agendado para el: ${scheduling_date}` :
                                            `Atendido el: ${finished_date}`}
                                    </p>
                                </div>
                            )}

                        </div>
                        <div className='md:flex gap-2'>
                            <p className="sm:text-xl text-gray-400 font-bold">Fecha y hora de solicitud:</p>
                            <p className="sm:text-xl text-gray-400">{`${request_date}`}</p>
                        </div>
                        <p className="sm:text-xl text-gray-400 font-bold">Estado: <span className='font-normal'>{` ${serviceState(state)}`}</span></p>
                    </div>

                    <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-2 md:gap-2 md:space-y-0">

                        <div className='bg-gray-800 border-b-4 border-gray-800 rounded-md hover:bg-gray-950 hover:shadow-lg hover:border-b-4 hover:border-gray-500 hover:shadow-gray-800 p-3'>
                            <div
                                className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 bg-primary-900">
                                <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-primary-300"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                          clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-white">Progreso</h3>
                            <div className='flex justify-center h-44'>
                                <CircularProgressbar value={progress}
                                                     text={`${progress}%`}
                                                     styles={buildStyles({
                                                         pathColor: progressColor(serviceProgress),
                                                         trailColor: '#7da0c2'
                                                     })}
                                />
                            </div>
                        </div>

                        <div className='bg-gray-800 border-b-4 border-gray-800 rounded-md hover:bg-gray-950 hover:shadow-lg hover:border-b-4 hover:border-gray-500 hover:shadow-gray-800 p-3'>
                            <div
                                className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 bg-primary-900">
                                <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-primary-300"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                          clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-white">Equipo a intervenir</h3>
                            <p className="text-gray-400 font-bold"><span className='font-normal'>{`•${instrument_description}`}</span></p>
                            <p className="text-gray-400 font-bold">•Capacidad: <span className='font-normal'>{`${capacity} ${unit_capacity}`}</span></p>
                            <p className="text-gray-400 font-bold">•División de escala: <span className='font-normal'>{`${scale_division} ${unit_scale_division}`}</span></p>
                            <p className="text-gray-400 font-bold">•Ubicación: <span className='font-normal'>{`${location}`}</span></p>
                        </div>
                        <div className='bg-gray-800 border-b-4 border-gray-800 rounded-md hover:bg-gray-950 hover:shadow-lg hover:border-b-4 hover:border-gray-500 hover:shadow-gray-800 p-3'>
                            <div
                                className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 bg-primary-900">
                                <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-primary-300"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-white">Contacto</h3>
                            <p className="text-gray-400 font-bold">•Cliente: <span className='font-normal'>{`${business_name ? business_name.toUpperCase() : business_name}`}</span></p>
                            <p className="text-gray-400 font-bold">•Nombre de contacto: <span className='font-normal'>{`${contact_name ? contact_name.toUpperCase() : contact_name}`}</span></p>
                            <p className="text-gray-400 font-bold">•Teléfono de contacto: <span className='font-normal'>{`${contact_telephone}`}</span></p>
                            <p className="text-gray-400 font-bold">•Email de contacto: <span className='font-normal'>{`${contact_email}`}</span></p>
                        </div>

                        {finished && (
                            <div className='bg-gray-800 border-b-4 border-gray-800 rounded-md hover:bg-gray-950 hover:shadow-lg hover:border-b-4 hover:border-gray-500 hover:shadow-gray-800 p-3'>
                                <div
                                    className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 bg-primary-900">
                                    <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-primary-300"
                                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                              clipRule="evenodd"></path>
                                        <path
                                            d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-white">Dirección de servicio</h3>
                                <p className="text-gray-400 mb-5">
                                    {`•${service_address ? service_address.toUpperCase() : service_address} - ${town_name} - ${state_name} / ${country_name}`}
                                </p>
                            </div>
                        )}

                        <div className='bg-gray-800 border-b-4 border-gray-800 rounded-md hover:bg-gray-950 hover:shadow-lg hover:border-b-4 hover:border-gray-500 hover:shadow-gray-800 p-3'>
                            <div
                                className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 bg-primary-900">
                                <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-primary-300"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                                    <path fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                                          clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-white">Tipo de servicio</h3>
                            <p className="text-gray-400">{`•${service_types_name}`}</p>
                        </div>

                        {(user ? user.role !== 'operator' : null) && (
                            <div className='bg-gray-800 border-b-4 border-gray-800 rounded-md hover:bg-gray-950 hover:shadow-lg hover:border-b-4 hover:border-gray-500 hover:shadow-gray-800 p-3'>
                                <div
                                    className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 bg-primary-900">
                                    <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-primary-300"
                                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-white">Técnicos asignados</h3>

                                {
                                    assignations.length === 0 && (
                                        <div className='bg-gray-900 flex items-center gap-4 border-b-4 border-sky-950 w-full p-3 cursor-pointer'>
                                            <img src="../../img/error.png" alt="error"/>
                                            <p className='text-gray-500 text-center'>NO SE HAN ASIGNADO TÉCNICOS PARA REALIZAR EL SERVICIO !</p>

                                        </div>
                                    )
                                }

                                {
                                    assignations.length > 0 && (
                                        assignations.map(assignation => (
                                            <AssignationRow key={assignation.operator_id} operator={assignation} isAssignation={false}></AssignationRow>
                                        )))
                                }

                                {
                                    (assignations.length >= 0 && assignations.length < 3 && scheduling_date === null && user ? user.role === 'admin' : null) &&  (
                                        <button type='button' onClick={()=>handleClickAssignationsModal()}
                                                className='bg-blue-500 flex items-center gap-4 mt-2 w-full p-3 hover:bg-blue-300 cursor-pointer rounded-md'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                                 fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
                                                <path
                                                    d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                                <path
                                                    d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                                            </svg>
                                            <p className='text-black font-bold text-lg uppercase'>Asignar técnico</p>
                                        </button>
                                    )
                                }

                            </div>
                        )}

                        <div className='bg-gray-800 border-b-4 border-gray-800 rounded-md hover:bg-gray-950 hover:shadow-lg hover:border-b-4 hover:border-gray-500 hover:shadow-gray-800 p-3 mt-2'>
                            <div
                                className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 bg-primary-900">
                                <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-primary-300"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-white">Observaciones</h3>
                            <p className="text-gray-400">{observation !== null ? `•${observation}` : ''}</p>
                        </div>

                    </div>

                    {!finished && (
                        <div className='bg-gray-800 border-b-4 border-gray-800 rounded-md hover:bg-gray-950 hover:shadow-lg hover:border-b-4 hover:border-gray-500 hover:shadow-gray-800 p-3 mt-2'>
                            <div
                                className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 bg-primary-900">
                                <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-primary-300"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                          clipRule="evenodd"></path>
                                    <path
                                        d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-white">Dirección de servicio</h3>
                            <p className="text-gray-400 mb-5">
                                {`•${service_address ? service_address.toUpperCase() : service_address} - ${town_name} - ${state_name} / ${country_name}`}
                            </p>

                            {/*<MapContainer/>*/}

                        </div>
                    )}

                    <div className='bg-gray-800 border-b-4 border-gray-800 rounded-md hover:bg-gray-950 hover:shadow-lg hover:border-b-4 hover:border-gray-500 hover:shadow-gray-800 p-3 mt-2'>
                        <div
                            className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 bg-primary-900">
                            <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-primary-300"
                                 fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                                <path fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-white">Evidencias cliente</h3>

                        <p className="text-gray-400 font-bold">•Usuario solicitud de servicio: <span className='font-normal'>{`${customer_user_name} / ${customer_user_email}`}</span></p>

                        {customerEvidences.length > 0 ?
                            <>
                                <div className='flex md:flex-wrap md:justify-center flex-col gap-2 md:flex-row mb-10 mt-2'>

                                    {customerEvidences.map((image, index) => (
                                        <embed key={index}
                                               src={`${imagesPath}/${image.image_name}`}
                                               alt="image"
                                               className='md:max-h-20 md:max-w-xs border-2 max-h-20 max-w-xs hover:bg-gray-500'/>
                                    ))}
                                </div>

                            </>
                            :

                            <p className="text-gray-400">{`•No se han subido evidencias por parte de ${business_name  ? business_name.toUpperCase() : ''}.`}</p>

                        }
                    </div>

                    {finished && (
                        <div className='bg-gray-800 border-b-4 border-gray-800 rounded-md hover:bg-gray-950 hover:shadow-lg hover:border-b-4 hover:border-gray-500 hover:shadow-gray-800 p-3 mt-2'>
                            <div
                                className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 bg-primary-900">
                                <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-primary-300"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                                    <path fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                                          clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-white">Evidencias técnico</h3>


                            {finished ?

                                <p className="text-gray-400 font-bold">•Usuario técnico que atendió: <span className='font-normal'>{`${operator_finisher_name} / ${operator_finisher_email}`}</span></p>

                                :

                                null
                            }

                            {operatorEvidences.length > 0 ?

                                <>
                                    <div className='flex md:flex-wrap md:justify-center flex-col gap-2 md:flex-row mb-10 mt-2'>
                                        {operatorEvidences.map((image, index) => (
                                            <embed key={index}
                                                   src={`${imagesPath}/${image.image_name}`}
                                                   alt="image"
                                                   className='md:max-h-20 md:max-w-xs border-2 max-h-20 max-w-xs hover:bg-gray-500'/>
                                        ))}
                                    </div>

                                </>
                                :

                                <p className='text-gray-400'>•No se han subido evidencias por parte del personal técnico.</p>

                            }
                        </div>
                    )}

                    <div className='flex justify-center mt-10'>
                        {(user ? user.role === 'admin' && scheduling_date === null: null) && (
                            <button type='button' onClick={()=>handleSaveSchedulingService()}
                                    className="flex gap-4 bg-blue-500 hover:bg-blue-300 text-white w-auto mb-4 p-3 rounded-md uppercase font-bold cursor-pointer">
                                <img src="../../img/check.png" alt="error"/>
                                <p className='text-black font-bold text-lg uppercase'>Realizar agendamiento</p>
                            </button>
                        )}

                        {(user ? (user.role === 'admin' || user.role === 'operator') && !finished && scheduling_date !== null : null) && (
                            <button type='button' onClick={()=>handleClickFinishServiceModal()}
                                    className="flex gap-4 bg-blue-500 hover:bg-blue-300 text-white w-auto mb-4 p-3 rounded-md uppercase font-bold cursor-pointer">
                                <img src="../../img/check.png" alt="error"/>
                                <p className='text-black font-bold text-lg uppercase'>Finalizar servicio</p>
                            </button>
                        )}
                    </div>

                </div>
            </section>

    )
}