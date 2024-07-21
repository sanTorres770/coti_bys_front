import {createRef, Fragment, useState} from "react";
import {Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild} from "@headlessui/react";
import useApp from "../../hooks/useApp.js";
import {useNavigate} from "react-router-dom";
import InputForm from "../../components/layout/InputForm.jsx";
import {ArrowLeftCircleIcon} from "@heroicons/react/20/solid/index.js";
import SelectListBox from "../../components/layout/SelectListBox.jsx";



export default function QuotationStep4() {

    const navigate = useNavigate()

    const {countries,
        states,
        towns,
        validationErrors,
        countryQuotationSelected,
        stateQuotationSelected,
        townQuotationSelected,
        handleSelectQuotationCountry,
        handleSelectQuotationState,
        handleSelectQuotationTown,
        velocityOptionSelected,
        packingMaterialSelected,
        manufacturerMaterialSelected,
        additionalProductsSelected,
        manufacturerMaterialAdditionalSelected,
        brandsSelected,
        serviceSelectedData,
        saveNewBaggerQuotation} = useApp();

    const businessNameRef = createRef()
    const contactNameRef = createRef()
    const telephoneRef = createRef()
    const emailRef = createRef()
    const addressRef = createRef()

    const [isOpen, setIsOpen] = useState(true)

    const handleCountryChange = (country) => {

        handleSelectQuotationCountry(country.id,true)

    }

    const handleStateChange = (state) => {

        handleSelectQuotationState(state.id,true)

    }

    const handleTownChange = (town) => {

        handleSelectQuotationTown(town.id)

    }

    const handleSubmit = e => {

        e.preventDefault()

        const form = {
            consecutive: "Real",
            contact: {
                businessName: businessNameRef.current.value,
                contactName: contactNameRef.current.value,
                telephone: telephoneRef.current.value,
                email: emailRef.current.value,
                address: addressRef.current.value,
                country: countryQuotationSelected,
                state: stateQuotationSelected,
                town: townQuotationSelected
            },
            selectedBaggerProduct: {
                service: serviceSelectedData,
                velocity: velocityOptionSelected,
                packingMaterial: packingMaterialSelected,
                manufacturerMaterial: manufacturerMaterialSelected,
                additionalSelected: additionalProductsSelected,
                manufacturerAdditionalMaterial: manufacturerMaterialAdditionalSelected,
                makersSelected: brandsSelected
            },
            status: "NE"
        }


        saveNewBaggerQuotation(form)
        //navigate('/new/step_3')
    }



    return (

        <>
            <>
                <Button
                    onClick={()=> navigate('/quot/step_3')}
                    className="rounded-full bg-black/20 py-2 px-2 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
                >
                    <ArrowLeftCircleIcon className="h-5 w-5" aria-hidden="true" />
                </Button>

                {/*<Transition appear show={isOpen}>
                    <Dialog as="div" className="relative z-10 focus:outline-none" onClose={()=>setIsOpen(true)}>
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4">
                                <div className="fixed inset-0 bg-black/50" aria-hidden="true"/>
                                <TransitionChild
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 transform-[scale(95%)]"
                                    enterTo="opacity-100 transform-[scale(100%)]"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 transform-[scale(100%)]"
                                    leaveTo="opacity-0 transform-[scale(95%)]"
                                >
                                    <DialogPanel
                                        className="w-full max-w-md rounded-xl bg-indigo-600/60 p-6 backdrop-blur-2xl">
                                        <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                                            Datos de contacto
                                        </DialogTitle>
                                        <p className="mt-2 text-sm/6 text-white/50">
                                            Puedes validar otro correo electrónico de contacto si lo deseas.
                                        </p>
                                        <div className="flex justify-center mt-4">
                                            <Button
                                                className="inline-flex items-center me-1 gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                                                onClick={()=>setIsOpen(false)}
                                            >
                                                Dejarlo así
                                            </Button>
                                            <Button
                                                className="inline-flex items-center ms-1 gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                                                onClick={() => handleValidateEmail()}
                                            >
                                                Validar otro
                                            </Button>
                                        </div>
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </div>
                    </Dialog>
                </Transition>*/}
            </>

            <Transition
                appear={true}
                show={true}
                enter="transition-all ease-in-out duration-500 delay-[200ms]"
                enterFrom="opacity-0 translate-y-6"
                enterTo="opacity-100 translate-y-0"
                leave="transition-all ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >

                <form onSubmit={handleSubmit} noValidate className="mb-10">
                    <div className="my-10 lg:text-start">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Datos de contacto</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Ingresa los datos de contacto para poder darte la mejor atención.
                        </p>
                    </div>

                    <div className="my-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-2">
                            <InputForm
                                validationErrors={validationErrors ? validationErrors.businessName ? validationErrors.businessName : null : null}
                                inputId={'businessName'}
                                type={'text'}
                                labelValue={'Nombre ó razón social *'}
                                reference={businessNameRef}
                                placeholder={'Razón social'}
                            >
                            </InputForm>
                        </div>

                        <div className="sm:col-span-2">
                            <InputForm
                                validationErrors={validationErrors ? validationErrors.contactName ? validationErrors.contactName : null : null}
                                inputId={'contactName'}
                                type={'text'}
                                labelValue={'Nombre de contacto *'}
                                reference={contactNameRef}
                                placeholder={'Nombre'}
                            >
                            </InputForm>
                        </div>

                        <div className="sm:col-span-2">
                            <InputForm inputId={'contactTelephone'}
                                       validationErrors={validationErrors ? validationErrors.telephone ? validationErrors.telephone : null : null}
                                       type={'text'}
                                       labelValue={'Teléfono de contacto *'}
                                       reference={telephoneRef}
                                       placeholder={'Teléfono'}
                            >
                            </InputForm>
                        </div>

                        <div className="sm:col-span-3">
                            <InputForm inputId={'contactEmail'}
                                       validationErrors={validationErrors ? validationErrors.email ? validationErrors.email : null : null}
                                       type={'email'}
                                       labelValue={'Correo electrónico de contacto *'}
                                       reference={emailRef}
                                       placeholder={'Email'}
                            >
                            </InputForm>

                        </div>

                        <div className="sm:col-span-3">
                            <InputForm inputId={'serviceAddress'}
                                       validationErrors={validationErrors ? validationErrors.address ? validationErrors.address : null : null}
                                       type={'text'}
                                       labelValue={'Dirección del servicio *'}
                                       reference={addressRef}
                                       placeholder={'Dirección'}
                            >
                            </InputForm>
                        </div>

                        <div className="sm:col-span-2">
                            <SelectListBox
                                data={countries}
                                labelText={'País *'}
                                validationErrors={validationErrors ? validationErrors.country ? validationErrors.country : null : null}
                                selected={countryQuotationSelected}
                                setSelected={handleCountryChange}
                                displayAttribute={'name'}
                            >
                            </SelectListBox>
                        </div>

                        <div className="sm:col-span-2">
                            <SelectListBox
                                data={states}
                                labelText={'Departamento/Estado *'}
                                validationErrors={validationErrors ? validationErrors.state ? validationErrors.state : null : null}
                                selected={stateQuotationSelected}
                                setSelected={handleStateChange}
                                displayAttribute={'name'}
                            >
                            </SelectListBox>
                        </div>

                        <div className="sm:col-span-2">
                            <SelectListBox
                                data={towns}
                                labelText={'Municipio/Ciudad *'}
                                validationErrors={validationErrors ? validationErrors.town ? validationErrors.town : null : null}
                                selected={townQuotationSelected}
                                setSelected={handleTownChange}
                                displayAttribute={'name'}
                            >
                            </SelectListBox>
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <button
                            type="submit"
                            onClick={() => handleSubmit}
                            className="flex w-full justify-center rounded-md bg-indigo-600 mt-0 md:mt-6 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Crear cotización
                        </button>
                    </div>

                </form>

            </Transition>

        </>

    );
}
