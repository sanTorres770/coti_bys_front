import {createRef, Fragment, useEffect, useState} from "react";
import {Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild} from "@headlessui/react";
import useApp from "../../hooks/useApp.js";
import {Link, useNavigate} from "react-router-dom";
import InputForm from "../../components/layout/InputForm.jsx";
import {ArrowLeftCircleIcon} from "@heroicons/react/20/solid/index.js";
import SelectListBox from "../../components/layout/SelectListBox.jsx";
import {toast} from "react-toastify";
import ValidationFormAlert from "../../components/alerts/ValidationFormAlert.jsx";
import FormSubmitButton from "../../components/button/FormSubmitButton.jsx";
import LoadingAlert from "../../components/alerts/LoadingAlert.jsx";



export default function QuotationStep4() {

    const navigate = useNavigate()

    const {countries,
        states,
        towns,
        validationErrors,
        setValidationErrors,
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
        saveNewBaggerQuotation,
        isExternEntry} = useApp();

    const businessNameRef = createRef()
    const contactNameRef = createRef()
    const telephoneRef = createRef()
    const emailRef = createRef()
    const addressRef = createRef()

    const [errores, setErrores] = useState([])
    const [isLoading, setIsLoading] = useState(false)

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

        setValidationErrors({})
        setErrores([])
        setIsLoading(true)

        const form = {
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


        saveNewBaggerQuotation(form).then(data => {

            if (data.status === 200 || data.status === 201) {
                toast.success(`La cotización ${data.data.consecutive} se creó correctamente!`)
                navigate(isExternEntry ? '/quot/ext_step_1' : '/quot/step_1')
            }else {
                toast.error('Error en el proceso.')
            }

        }).catch(error => {

            if (error.code === "ERR_BAD_REQUEST"){
                setErrores(Object.values(error.response.data))
                setValidationErrors(error.response.data)
                toast.error('Revisa los campos que faltan por diligenciar en el formulario.')
            }

            if (error.code === "ERR_NETWORK"){
                toast.error('Error de conexión.')
            }


        }).finally(() => setIsLoading(false))

    }

    useEffect(() => {
        setValidationErrors({})

        if (serviceSelectedData === null) {
            toast.info('Sigue los pasos para conocer lo mejor de nuestro portafolio')
            navigate('/quot/step_1')
        }

    }, []);


    return (

        <>

            <Button
                onClick={()=> navigate('/quot/step_1')}
                className="rounded-full bg-black/20 py-2 px-2 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
            >
                <ArrowLeftCircleIcon className="h-5 w-5" aria-hidden="true" />
            </Button>


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

                    {errores  && (errores.map(error => <ValidationFormAlert key={error}>{error}</ValidationFormAlert>))}


                    <div className="my-10 lg:text-start">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Datos de contacto</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Ingresa los datos de contacto para poder darte la mejor atención.
                        </p>
                    </div>

                    <div className="my-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-2">
                            <InputForm
                                validationErrors={validationErrors ? validationErrors["contact.businessName"] ? validationErrors["contact.businessName"] : null : null}
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
                                validationErrors={validationErrors ? validationErrors["contact.contactName"] ? validationErrors["contact.contactName"] : null : null}
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
                                       validationErrors={validationErrors ? validationErrors["contact.telephone"] ? validationErrors["contact.telephone"] : null : null}
                                       type={'text'}
                                       labelValue={'Teléfono de contacto *'}
                                       reference={telephoneRef}
                                       placeholder={'Teléfono'}
                            >
                            </InputForm>
                        </div>

                        <div className="sm:col-span-3">
                            <InputForm inputId={'contactEmail'}
                                       validationErrors={validationErrors ? validationErrors["contact.email"] ? validationErrors["contact.email"] : null : null}
                                       type={'email'}
                                       labelValue={'Correo electrónico de contacto *'}
                                       reference={emailRef}
                                       placeholder={'Email'}
                            >
                            </InputForm>

                        </div>

                        <div className="sm:col-span-3">
                            <InputForm inputId={'serviceAddress'}
                                       validationErrors={validationErrors ? validationErrors["contact.address"] ? validationErrors["contact.address"] : null : null}
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
                                validationErrors={validationErrors ? validationErrors["contact.country"] ? validationErrors["contact.country"] : null : null}
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
                                validationErrors={validationErrors ? validationErrors["contact.state"] ? validationErrors["contact.state"] : null : null}
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
                                validationErrors={validationErrors ? validationErrors["contact.town"] ? validationErrors["contact.town"] : null : null}
                                selected={townQuotationSelected}
                                setSelected={handleTownChange}
                                displayAttribute={'name'}
                            >
                            </SelectListBox>
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        {!isLoading ?

                            <FormSubmitButton value={'Crear cotización'} handleSubmit={handleSubmit}></FormSubmitButton>

                            :

                            <LoadingAlert/>
                        }
                    </div>

                </form>

            </Transition>

        </>

    );
}
