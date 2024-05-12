import useApp from "../../hooks/useApp.js";
import {Link, useNavigate} from "react-router-dom";
import customAxios from "../../config/axios.js";
import {useEffect, useState} from "react";
import ValidationFormAlert from "../../components/alerts/ValidationFormAlert.jsx";
import {toast} from "react-toastify";
import LoadingAlert from "../../components/alerts/LoadingAlert.jsx";


export default function NewServiceStep3() {


    const {serviceRequest, setServiceRequest, handleSaveForm1,
        handleSaveForm2, countries, states, towns, serviceTypes, setEvidencesList, setImages,
        setValidationErrors} = useApp()
    const [errores, setErrores] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const countryName = countries.filter(country => serviceRequest.serviceCountry === country.id)[0]
    const stateName = states.filter(state => serviceRequest.serviceState === state.id)[0]
    const townName = towns.filter(town => serviceRequest.serviceTown === town.id)[0]
    const serviceTypeName = serviceTypes.filter(serviceType => serviceRequest.serviceType === serviceType.id)[0]

    const navigate = useNavigate()

    useEffect(()=>{
        window.scroll({
            top: 200,
            behavior: 'smooth'
        })
    },[])

    const handleSaveServiceRequest = async (form) => {

        try {

            setIsLoading(true)
            const {data} = await customAxios.post('/api/new/service_request',form)

            console.log(data)

            if (data.response){
                toast.success(data.message)
                setServiceRequest({})
                handleSaveForm1({})
                handleSaveForm2({})
                setEvidencesList([])
                setImages([])
                navigate('/customer/services')
            }else {
                toast.error(data.message)
            }

        }catch (error){
            setErrores(Object.values(error.response.data.errors))
            setValidationErrors(error.response.data.errors)
        }finally {
            setIsLoading(false)
        }

        if (errores){
            window.scroll({
                top: 100,
                behavior: 'smooth'
            })
        }
    }

    return (

        <div>

            <div className="px-4 sm:px-0">

                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">Revisa que la información que vas a guardar esté correcta</p>

                {errores  && (errores.map(error => <ValidationFormAlert key={error}>{error}</ValidationFormAlert>))}

                {!isLoading && (
                    <div className='flex flex-col md:flex-row md:justify-between mt-5'>

                        <Link to={'/new/step_1'} className='flex gap-2 w-full bg-blue-600 hover:bg-blue-900 rounded justify-center text-white mt-5 p-3 uppercase font-bold cursor-pointer'>
                            <img src="../../img/back.png" alt="next"/>
                            <p>{errores.length > 0 ? 'corregir información' : 'editar'}</p>
                        </Link>
                    </div>
                )}

            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Nombre persona de contacto</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{serviceRequest.contactName ? serviceRequest.contactName.toUpperCase() : ''}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Telefono de contacto</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{serviceRequest.contactTelephone}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Correo electrónico de contacto</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{serviceRequest.contactEmail}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Dirección del servicio</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {`${serviceRequest.serviceAddress} - ${countryName ? countryName.name : ''} / ${stateName ? stateName.name : ''} - ${townName ? townName.name : ''}`}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Tipo de servicio</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{serviceTypeName ? serviceTypeName.name : ''}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Equipo a intervenir</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{serviceRequest.instrument ? serviceRequest.instrument.toUpperCase() : ''}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Ubicación del equipo</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{serviceRequest.location ? serviceRequest.location.toUpperCase() : ''}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Capacidad</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{serviceRequest.capacity}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Observaciones</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{serviceRequest.observation}</dd>
                    </div>
                </dl>
            </div>

            {isLoading && (<LoadingAlert/>)}


            {!isLoading && (
                <div className='flex flex-col md:flex-row md:justify-between mt-5'>
                    <button onClick={()=>handleSaveServiceRequest(serviceRequest)} type='submit' className='flex gap-2 w-full bg-green-600 hover:bg-green-900 rounded justify-center text-white mt-5 p-3 uppercase font-bold cursor-pointer'>
                        <p>guardar y finalizar</p>
                        <img src="../../img/next.png" alt="next"/>
                    </button>
                </div>
            )}

        </div>
    )
}