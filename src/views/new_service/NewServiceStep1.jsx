import useApp from "../../hooks/useApp.js";
import {createRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";
/*import {useAuth} from "../../hooks/useAuth.js";*/
import InputForm from "../../components/layout/InputForm.jsx";
import SelectForm from "../../components/layout/SelectForm.jsx";

export default function NewServiceStep1() {

    const {countries, states, towns, handleSelectState, handleSelectTown, handleSaveForm1, form1:serviceRequest, validationErrors} = useApp();
    /*const { user } = useAuth({
        middleware: 'auth',
        url: '/'
    })*/

    /*serviceRequest["contactName"] === undefined && (serviceRequest["contactName"] = user ? user.name : null)
    serviceRequest["contactTelephone"] === undefined && (serviceRequest["contactTelephone"] = user ? user.telephone : null)
    serviceRequest["contactEmail"] === undefined && (serviceRequest["contactEmail"] = user ? user.email : null)*/


    const navigate = useNavigate()
    const contactNameRef = createRef()
    const contactTelephoneRef = createRef()
    const contactEmailRef = createRef()
    const serviceAddressRef = createRef()
    const serviceCountryRef = createRef()
    const serviceStateRef = createRef()
    const serviceTownRef = createRef()


    const handleSubmit = e => {

        e.preventDefault()

        const form = {
            contactName: contactNameRef.current.value,
            contactTelephone: contactTelephoneRef.current.value,
            contactEmail: contactEmailRef.current.value,
            serviceAddress: serviceAddressRef.current.value,
            serviceCountry: serviceCountryRef.current.value,
            serviceState: serviceStateRef.current.value,
            serviceTown: serviceTownRef.current.value,
            /*customer: user.fk_customer,*/
            /*user: user.id*/
        }

        handleSaveForm1(form)
        navigate('/new/step_2')
    }

    useEffect(()=>{

        window.scroll({
            top: 100,
            behavior: 'smooth'
        })

    },[])

    return (

            <form onSubmit={handleSubmit} noValidate>

            <div className="px-4 sm:px-0">
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-700 font-bold">Ingresa la información de contacto y dirección donde prestaremos el servicio</p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                <div className="sm:col-span-3">
                    <InputForm validationErrors={validationErrors ? validationErrors.contactName ? validationErrors.contactName : null : null}
                               textUppercase={true}
                               inputId={'contactName'}
                               type={'text'}
                               defaultValue={serviceRequest.contactName}
                               labelValue={'Nombre de contacto *'}
                               reference={contactNameRef}
                               textColor={'text-black'}
                               bgLabelColor={'bg-gray-300'}>
                    </InputForm>
                </div>

                <div className="sm:col-span-3">
                    <InputForm inputId={'contactTelephone'}
                               validationErrors={validationErrors ? validationErrors.contactTelephone ? validationErrors.contactTelephone : null : null}
                               type={'number'}
                               defaultValue={serviceRequest.contactTelephone}
                               labelValue={'Teléfono de contacto *'}
                               reference={contactTelephoneRef}
                               textColor={'text-black'}
                               bgLabelColor={'bg-gray-300'}>
                    </InputForm>
                </div>

                <div className="sm:col-span-full">
                    <InputForm inputId={'contactEmail'}
                               validationErrors={validationErrors ? validationErrors.contactEmail ? validationErrors.contactEmail : null : null}
                               type={'email'}
                               defaultValue={serviceRequest.contactEmail}
                               labelValue={'Correo electrónico de contacto *'}
                               reference={contactEmailRef}
                               textColor={'text-black'}
                               bgLabelColor={'bg-gray-300'}
                               mediaQuery={'w-1/2'}>
                    </InputForm>
                </div>

                <div className="sm:col-span-3">
                    <InputForm inputId={'serviceAddress'}
                               textUppercase={true}
                               validationErrors={validationErrors ? validationErrors.serviceAddress ? validationErrors.serviceAddress : null : null}
                               type={'text'}
                               defaultValue={serviceRequest.serviceAddress}
                               labelValue={'Dirección del servicio *'}
                               reference={serviceAddressRef}
                               textColor={'text-black'}
                               bgLabelColor={'bg-gray-300'}>
                    </InputForm>
                </div>

                <div className="sm:col-span-1">
                    <SelectForm selectId={'country'}
                                dataList={countries}
                                reference={serviceCountryRef}
                                textColor={'text-black'}
                                bgLabelColor={'bg-gray-300'}
                                defaultValue={serviceRequest.serviceCountry}
                                labelValue={'País *'}
                                inputId={'serviceCountry'}
                                validationErrors={validationErrors ? validationErrors.serviceCountry ? validationErrors.serviceCountry : null : null}
                                onChangeFunction={handleSelectState}>
                    </SelectForm>
                </div>

                <div className="sm:col-span-1">
                    <SelectForm selectId={'state'}
                                dataList={states}
                                reference={serviceStateRef}
                                textColor={'text-black'}
                                bgLabelColor={'bg-gray-300'}
                                defaultValue={serviceRequest.serviceState}
                                labelValue={'Departamento *'}
                                inputId={'serviceState'}
                                validationErrors={validationErrors ? validationErrors.serviceState ? validationErrors.serviceState : null : null}
                                onChangeFunction={handleSelectTown}>
                    </SelectForm>
                </div>

                <div className="sm:col-span-1">
                    <SelectForm selectId={'town'}
                                dataList={towns}
                                reference={serviceTownRef}
                                textColor={'text-black'}
                                bgLabelColor={'bg-gray-300'}
                                defaultValue={serviceRequest.serviceTown}
                                labelValue={'Municipio *'}
                                inputId={'serviceTown'}
                                validationErrors={validationErrors ? validationErrors.serviceTown ? validationErrors.serviceTown : null : null}>
                    </SelectForm>
                </div>
            </div>

            <p className='mt-5'>(*) Obligatorio</p>

            <div className='flex md:justify-end justify-center mt-5'>
                <button type='submit' className='flex gap-2 bg-blue-600 hover:bg-blue-900 rounded text-white mt-5 p-3 uppercase font-bold cursor-pointer'>
                    <p>siguiente</p>
                    <img src="../../img/next.png" alt="next"/>
                </button>
            </div>

            </form>

    )
}