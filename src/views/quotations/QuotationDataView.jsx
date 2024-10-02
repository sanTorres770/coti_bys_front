import useApp from "../../hooks/useApp.js";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import {commonConfig} from "../../hooks/commonConfig.js";
import {Switch, Transition} from "@headlessui/react";
import DashboardTable from "../../components/dashboard/DashboardTable.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState, Fragment} from "react";
import {useAuth} from "../../hooks/useAuth.js";
import clsx from "clsx";
import InputForm from "../../components/layout/InputForm.jsx";

export default function QuotationDataView() {


    const {baggerQuotationDataSelected,
        electronicSupplies,
        pneumaticSupplies,
        electronicSuppliesPriceResult,
        pneumaticSuppliesPriceResult,
        setSelectedVelocityServiceOption,
        setSelectedPackingMaterialServiceOption,
        totalQuotationPrice,
        getBaggerProductById,
        dollarCurrency,
        setDollarCurrency} = useApp();

    const {login} = useAuth();

    const {formatPriceToCurrency} = commonConfig()

    const [progress, setProgress] = useState(0)

    const [dollarEnabled, setDollarEnabled] = useState(false)

    const navigate = useNavigate()

    const {statusConfig,progressColor,capitalizeString,formatTimeStamp} = commonConfig()

    const {baggerQuotation, baggerProduct} = baggerQuotationDataSelected

    const columnNamesSuppliesTable = [
        {id: 1, name: 'Descripción'},
        {id: 2, name: 'Marca'},
        {id: 3, name: 'Cantidad'},
        {id: 4, name: 'Precio'},
    ]

    const handleCreateBaggerProduct = () => {

        setSelectedVelocityServiceOption(baggerQuotation.selectedBaggerProduct.velocity)
        setSelectedPackingMaterialServiceOption(baggerQuotation.selectedBaggerProduct.packingMaterial)

        navigate('/baggerProduct/create')

    }

    const handleSelectBaggerProductData = (id) => {

        getBaggerProductById(id)

    }

    const handleChangeDollarValue = (e) => {
        setDollarCurrency(Number(e.target.value))
    }


    /*useEffect(() => {

        setTimeout(() => {
            setProgress(baggerQuotation !== undefined && baggerQuotation.status === 'NE' ? 50 : 100)
        }, 900)

    }, []);*/

    return (

        <Transition
            as={'div'}
            appear={true}
            show={true}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >

        <>

            {(baggerQuotation !== undefined && baggerProduct !== null) ?

                <section>
                    <div className="py-4 px-4 mx-auto max-w-screen-xl sm:py-8 lg:px-6">

                        <div className="mb-4 lg:mb-8">
                            <div className='md:flex justify-between w-full'>
                                <h2 className="mb-4 text-4xl text-gray-600 font-semibold">{`Cotización: ${baggerQuotation.consecutive}`}</h2>
                            </div>

                            <div className="flex gap-4 items-center md:my-3 my-10">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                                     fill="currentColor"
                                     className="size-6 text-indigo-600">
                                    <path
                                        d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"/>
                                    <path fillRule="evenodd"
                                          d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                                          clipRule="evenodd"/>
                                </svg>
                                <p className="sm:text-xl text-gray-400 font-bold">Fecha y hora de solicitud:</p>
                                <p className="sm:text-xl text-gray-400">{formatTimeStamp(baggerQuotation.timestamps)}</p>
                            </div>

                            <div className="flex gap-4 items-center md:my-0 my-10">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                                     fill="currentColor"
                                     className="size-6 text-indigo-600">
                                    <path fillRule="evenodd"
                                          d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                          clipRule="evenodd"/>
                                </svg>
                                <p className="sm:text-xl text-gray-400 font-bold">Estado:</p>
                                <p className="sm:text-xl text-gray-400">{statusConfig(baggerQuotation.status)}</p>
                            </div>

                        </div>

                        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-2 md:gap-6 md:space-y-0">

                            {/*<div className='bg-white rounded-md border border-gray-100 p-4 shadow-md shadow-black/5'>
                                <div
                                    className="flex justify-start items-center gap-2 w-full h-10 rounded-full bg-primary-100 bg-primary-900">
                                    <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-primary-300"
                                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <h3 className="text-xl font-bold text-gray-400">Progreso</h3>
                                </div>
                                <div className='flex justify-center h-44'>
                                    <CircularProgressbar value={progress}
                                                         text={`${progress}%`}
                                                         styles={buildStyles({
                                                             pathColor: progressColor(baggerQuotation.status),
                                                             trailColor: '#7da0c2'
                                                         })}
                                    />
                                </div>
                            </div>*/}

                            <div className='bg-white rounded-md border border-gray-100 p-4 shadow-md shadow-black/5'>
                                <div
                                    className="flex justify-start items-center gap-2 w-full h-10 rounded-full bg-primary-100 bg-primary-900">
                                    <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-primary-300"
                                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <h3 className="text-xl font-bold text-gray-400">Contacto</h3>
                                </div>
                                <div className='flex justify-start mt-2'>
                                    <p className="text-gray-500">
                                        • Razón social: <span
                                        className='text-black'>{baggerQuotation.contact.businessName}</span>
                                    </p>
                                </div>
                                <div className='flex justify-start mt-2'>
                                    <p className="text-gray-500">
                                        • Nombre de contacto: <span
                                        className='text-black'>{baggerQuotation.contact.contactName}</span>
                                    </p>
                                </div>
                                <div className='flex justify-start mt-2'>
                                    <p className="text-gray-500">
                                        • Teléfono: <span
                                        className='text-black'>{baggerQuotation.contact.telephone}</span>
                                    </p>
                                </div>
                                <div className='flex justify-start mt-2'>
                                    <p className="text-gray-500">
                                        • Email: <span
                                        className='text-black'>{baggerQuotation.contact.email}</span>
                                    </p>
                                </div>
                                <div className='flex justify-start mt-2'>
                                    <p className="text-gray-500">
                                        • Dirección: <span
                                        className='text-black'>{`${baggerQuotation.contact.address} - ${capitalizeString(baggerQuotation.contact.town.name)} • ${capitalizeString(baggerQuotation.contact.state.name)} • ${capitalizeString(baggerQuotation.contact.country.name)}`}</span>
                                    </p>
                                </div>
                            </div>

                            <div className='bg-white rounded-md border border-gray-100 p-4 shadow-md shadow-black/5'>
                                <div
                                    className="flex justify-start items-center gap-2 w-full h-10 rounded-full bg-primary-100 bg-primary-900">
                                    <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-primary-300"
                                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <h3 className="text-xl font-bold text-gray-400">Equipo a fabricar seleccionado</h3>
                                </div>
                                <div className='flex justify-start mt-2'>
                                    <p className="text-black font-bold"><span
                                        className='font-normal'>{`• ${capitalizeString(baggerQuotation.selectedBaggerProduct.service.name)}`}</span>
                                    </p>
                                </div>
                            </div>

                            <div className='bg-white rounded-md border border-gray-100 p-4 shadow-md shadow-black/5'>
                                <div
                                    className="flex justify-start items-center gap-2 w-full h-10 rounded-full bg-primary-100 bg-primary-900">
                                    <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-primary-300"
                                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <h3 className="text-xl font-bold text-gray-400">Velocidad seleccionada</h3>
                                </div>
                                <div className='flex justify-start mt-2'>
                                    <p className="text-gray-500">
                                        {`• ${baggerQuotation.selectedBaggerProduct.velocity.type}`}: <span
                                        className='text-black'>{`${baggerQuotation.selectedBaggerProduct.velocity.name}`}</span>
                                    </p>
                                </div>
                            </div>

                            <div className='bg-white rounded-md border border-gray-100 p-4 shadow-md shadow-black/5'>
                                <div
                                    className="flex justify-start items-center gap-2 w-full h-10 rounded-full bg-primary-100 bg-primary-900">
                                    <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-primary-300"
                                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <h3 className="text-xl font-bold text-gray-400">Material a empacar seleccionado</h3>
                                </div>
                                <div className='flex justify-start mt-2'>
                                    <p className="text-gray-500">
                                        {`• ${baggerQuotation.selectedBaggerProduct.packingMaterial.type}`}: <span
                                        className='text-black'>{`${baggerQuotation.selectedBaggerProduct.packingMaterial.name}`}</span>
                                    </p>
                                </div>
                            </div>

                            <div className='bg-white rounded-md border border-gray-100 p-4 shadow-md shadow-black/5'>
                                <div
                                    className="flex justify-start items-center gap-2 w-full h-10 rounded-full bg-primary-100 bg-primary-900">
                                    <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-primary-300"
                                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <h3 className="text-xl font-bold text-gray-400">Material de fabricación
                                        seleccionado</h3>
                                </div>
                                <div className='flex justify-start mt-2'>
                                    <p className="text-gray-500">
                                        {`• ${baggerQuotation.selectedBaggerProduct.manufacturerMaterial.type}`}: <span
                                        className='text-black'>{`${baggerQuotation.selectedBaggerProduct.manufacturerMaterial.name}`}</span>
                                    </p>
                                </div>
                            </div>

                            <div className='bg-white rounded-md border border-gray-100 p-4 shadow-md shadow-black/5'>
                                <div
                                    className="flex justify-start items-center gap-2 w-full h-10 rounded-full bg-primary-100 bg-primary-900">
                                    <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-primary-300"
                                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <h3 className="text-xl font-bold text-gray-400">Fabricante partes Electrónicas
                                        seleccionado</h3>
                                </div>
                                <div className='flex justify-start mt-2'>
                                    <p className="text-gray-500">
                                <span
                                    className='text-black'>{`• ${baggerQuotation.selectedBaggerProduct.makersSelected.filter(maker => maker.type === "ELECTRONICA")[0].name}`}</span>
                                    </p>
                                </div>
                            </div>

                            <div className='bg-white rounded-md border border-gray-100 p-4 shadow-md shadow-black/5'>
                                <div
                                    className="flex justify-start items-center gap-2 w-full h-10 rounded-full bg-primary-100 bg-primary-900">
                                    <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-primary-300"
                                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <h3 className="text-xl font-bold text-gray-400">Fabricante partes Neumáticas
                                        seleccionado</h3>
                                </div>
                                <div className='flex justify-start mt-2'>
                                    <p className="text-gray-500">
                                <span
                                    className='text-black'>{`• ${baggerQuotation.selectedBaggerProduct.makersSelected.filter(maker => maker.type === "NEUMATICA")[0].name}`}</span>
                                    </p>
                                </div>
                            </div>

                            {baggerQuotation.selectedBaggerProduct.additionalSelected.length > 0 && (
                                <div
                                    className='bg-white rounded-md border border-gray-100 p-4 shadow-md shadow-black/5'>
                                    <div
                                        className="flex justify-start items-center gap-2 w-full h-10 rounded-full bg-primary-100 bg-primary-900">
                                        <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-primary-300"
                                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                                  clipRule="evenodd"></path>
                                        </svg>
                                        <h3 className="text-xl font-bold text-gray-400">Complementos seleccionados</h3>
                                    </div>

                                    {baggerQuotation.selectedBaggerProduct.additionalSelected.map(additional => (
                                        <div key={additional.id} className='flex justify-start mt-2'>
                                            <p className="text-gray-500">
                                                <span className='text-black'>{`• ${additional.name}`}</span>
                                            </p>
                                        </div>
                                    ))}

                                </div>
                            )}
                        </div>

                        {login.isAdmin &&


                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                <DashboardTable
                                    tableTitle={'Insumos partes control y eléctricas'}
                                    columnNames={columnNamesSuppliesTable}
                                    data={electronicSupplies}
                                    priceResult={electronicSuppliesPriceResult}
                                    dollarEnabled={dollarEnabled}
                                    dollarCurrency={dollarCurrency}
                                >
                                </DashboardTable>

                                <DashboardTable
                                    tableTitle={'Insumos partes neumática'}
                                    columnNames={columnNamesSuppliesTable}
                                    data={pneumaticSupplies}
                                    priceResult={pneumaticSuppliesPriceResult}
                                    dollarEnabled={dollarEnabled}
                                    dollarCurrency={dollarCurrency}
                                >
                                </DashboardTable>
                            </div>

                        }

                        <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md mt-6">
                            <div
                                className="flex justify-start items-center gap-2 w-full h-10 rounded-full bg-primary-100 bg-primary-900">
                                <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-primary-300"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                          clipRule="evenodd"></path>
                                </svg>
                                <h3 className="text-xl font-bold text-gray-400">Producto cotizado</h3>

                                {login.isAdmin && (

                                    <>

                                        <label htmlFor="dollarId" className='ms-10'>Dolar</label>

                                        <InputForm inputId={'dollarId'}
                                                   type={'number'}
                                                   placeholder={'Dolar'}
                                                   defaultValue={dollarCurrency}
                                                   onChangeFunction={handleChangeDollarValue}
                                        >
                                        </InputForm>

                                        <Switch checked={dollarEnabled} onChange={setDollarEnabled} as={Fragment}>
                                            {({ checked, disabled }) => (
                                                <button
                                                    className={clsx(
                                                        'group inline-flex h-6 w-11 items-center rounded-full',
                                                        checked ? 'bg-blue-600' : 'bg-gray-200',
                                                        disabled && 'cursor-not-allowed opacity-50'
                                                    )}
                                                >
                                                    <span className="sr-only">Enable notifications</span>
                                                    <span
                                                        className={clsx('size-4 rounded-full bg-white transition', checked ? 'translate-x-6' : 'translate-x-1')}
                                                    />
                                                </button>

                                            )}
                                        </Switch>

                                    </>

                                )}

                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[540px]">
                                    <thead>
                                    <tr>
                                        <td className='py-2 border-b border-b-gray-50'></td>
                                        <td className='py-2 border-b border-b-gray-50'>
                                            <span className='text-sm font-medium text-gray-400'>
                                                Material de fabricación
                                            </span>
                                        </td>

                                        {login.isAdmin &&
                                            <td className='py-2 border-b border-b-gray-50'>
                                            <span className='text-sm font-medium text-gray-400'>
                                                Precio de fabricación
                                            </span>
                                            </td>
                                        }

                                        <td className='py-2 border-b border-b-gray-50'>
                                            <span className='text-sm font-medium text-gray-400'>
                                                Precio total (IE+IN+PF)
                                            </span>
                                        </td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="py-2 border-b border-b-gray-50">
                                            {login.isAdmin ?

                                                <Link to={'/baggerProduct/edit'}
                                                      onClick={() => handleSelectBaggerProductData(baggerProduct.id)}
                                                      className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                                                >
                                                    {baggerProduct.name}
                                                </Link> :

                                                <span className="text-gray-600 text-sm font-medium truncate"
                                                >
                                                    {baggerProduct.name}
                                                </span>
                                            }
                                        </td>
                                        <td className="py-2 border-b border-b-gray-50">
                                            <span className="text-gray-600 text-sm font-medium truncate">
                                                {baggerQuotation.selectedBaggerProduct.manufacturerMaterial.name}
                                            </span>
                                        </td>

                                        {login.isAdmin &&

                                            <td className="py-2 border-b border-b-gray-50">
                                                <span className="text-gray-600 text-sm font-medium truncate">
                                                    {baggerQuotation.selectedBaggerProduct.manufacturerMaterial.type === 'INOX' ?
                                                        formatPriceToCurrency(dollarEnabled ? baggerProduct.stainlessSteelPrice : (baggerProduct.stainlessSteelPrice / dollarCurrency), dollarEnabled) :
                                                        formatPriceToCurrency(dollarEnabled ? baggerProduct.carbonSteelPrice : (baggerProduct.carbonSteelPrice / dollarCurrency), dollarEnabled)}
                                                </span>
                                            </td>
                                        }
                                        <td className="py-2 border-b border-b-gray-50">
                                            <span className="text-gray-600 text-sm font-medium truncate">
                                                {formatPriceToCurrency(dollarEnabled ? totalQuotationPrice : (totalQuotationPrice / dollarCurrency), dollarEnabled)}
                                            </span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>


                    </div>
                </section>

                :

                baggerQuotation !== undefined &&

                <section>
                    <div className="py-4 px-4 mx-auto max-w-screen-xl sm:py-8 lg:px-6">

                        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-2 md:gap-6 md:space-y-0">

                            <div className='bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5 col-span-6'>
                                <div
                                    className="flex justify-start items-center gap-2 w-full h-10 rounded-full bg-primary-100 bg-primary-900">
                                    <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-primary-300"
                                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <h3 className="text-xl font-bold text-gray-400">
                                        No se ha creado un producto de ensacadora con las opciones seleccionadas.
                                        Presione sobre
                                        <span onClick={()=>handleCreateBaggerProduct()} className='underline hover:cursor-pointer hover:text-indigo-600 mx-1'>
                                            {`${baggerQuotation.selectedBaggerProduct.velocity.type}-${baggerQuotation.selectedBaggerProduct.packingMaterial.type}`}
                                        </span>
                                        para crear el producto con estas opciones y así poder generar la cotización.
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            }


        </>

        </Transition>
    );
}