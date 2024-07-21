import {createRef, useEffect, useState} from "react";
import ValidationFormAlert from "../../components/alerts/ValidationFormAlert.jsx";
import useApp from "../../hooks/useApp.js";
/*import {useAuth} from "../../hooks/useAuth.js";*/
import {useCustomers} from "../../hooks/useCustomers.js";
import SelectForm from "../../components/layout/SelectForm.jsx";
import InputForm from "../../components/layout/InputForm.jsx";

export default function Register() {

    const nitRef = createRef();
    const documentRef = createRef();
    const nameRef = createRef();
    const addressRef = createRef();
    const countryRef = createRef();
    const stateRef = createRef();
    const townRef = createRef();
    const telephoneRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const {countries, states, towns, handleSelectState, handleSelectTown, currentAdminOption, validationErrors, setValidationErrors} = useApp();

    const {customers, getAllCustomers} = useCustomers()

    /*const { registerCustomerUser, registerOperatorUser } = useAuth({
        middleware: 'auth',
        url: '/'
    })*/

    const [errores, setErrores] = useState([])

    const handleSubmit = async e => { //funcion para el evento de enviar formulario
        e.preventDefault();

        //se crea objeto de request

        const form = {
            nit: nitRef?.current?.value,
            document: documentRef?.current?.value,
            name: nameRef?.current?.value,
            address: addressRef?.current?.value,
            country: countryRef?.current?.value,
            state: stateRef?.current?.value,
            town: townRef?.current?.value,
            telephone: telephoneRef?.current?.value,
            email: emailRef?.current?.value,
            password: passwordRef?.current?.value,
            password_confirmation: passwordConfirmationRef?.current?.value
        }

        if (currentAdminOption.id === '4'){

            registerCustomerUser(form,setErrores,setValidationErrors)

        }else {
            registerOperatorUser(form,setErrores,setValidationErrors)
        }

        if (errores){

            window.scroll({
                top: 100,
                behavior: 'smooth'
            })
        }
    }

    useEffect(()=>{
        getAllCustomers()
        handleSelectState(countries[0].id)
    },[])

    useEffect(()=>{
        setErrores([])
        setValidationErrors({})
    },[currentAdminOption])

    return (
        <>
            <div className="bg-gray-300 shadow-md rounded-md mt-10 px-5 py-10 border-2 border-gray-600 shadow-gray-500">
                <form onSubmit={handleSubmit} noValidate>

                    {errores ? errores.map(error => <ValidationFormAlert key={error}>{error}</ValidationFormAlert>) : null}

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        {currentAdminOption.id === '4' && (
                            <div className="sm:col-span-3">
                                <SelectForm dataList={customers}
                                            reference={nitRef}
                                            labelValue={'Cliente *'}
                                            validationErrors={validationErrors ? validationErrors.nit ? validationErrors.nit : null : null}
                                            textColor={'text-black'}
                                            bgLabelColor={'bg-gray-300'}>
                                </SelectForm>
                            </div>
                        )}

                        {currentAdminOption.id === '5' && (
                            <div className="sm:col-span-3">
                                <InputForm validationErrors={validationErrors ? validationErrors.document ? validationErrors.document : null : null}
                                           type={'text'}
                                           labelValue={'N° de Cédula *'}
                                           reference={documentRef}
                                           textColor={'text-black'}
                                           bgLabelColor={'bg-gray-300'}>
                                </InputForm>
                            </div>
                        )}

                        <div className="sm:col-span-3">
                            <InputForm validationErrors={validationErrors ? validationErrors.name ? validationErrors.name : null : null}
                                       textUppercase={true}
                                       type={'text'}
                                       labelValue={currentAdminOption.id === '5' ? 'Nombre del técnico' : 'Nombre del responsable'}
                                       reference={nameRef}
                                       textColor={'text-black'}
                                       bgLabelColor={'bg-gray-300'}>
                            </InputForm>
                        </div>

                        <div className="sm:col-span-3">
                            <InputForm validationErrors={validationErrors ? validationErrors.telephone ? validationErrors.telephone : null : null}
                                       type={'text'}
                                       labelValue={'Teléfono de contacto *'}
                                       reference={telephoneRef}
                                       textColor={'text-black'}
                                       bgLabelColor={'bg-gray-300'}>
                            </InputForm>
                        </div>

                        <div className="sm:col-span-3">
                            <InputForm validationErrors={validationErrors ? validationErrors.email ? validationErrors.email : null : null}
                                       type={'text'}
                                       labelValue={'Correo electrónico *'}
                                       reference={emailRef}
                                       textColor={'text-black'}
                                       bgLabelColor={'bg-gray-300'}>
                            </InputForm>
                        </div>

                        <div className="sm:col-span-3">
                            <InputForm validationErrors={validationErrors ? validationErrors.password ? validationErrors.password : null : null}
                                       type={'password'}
                                       labelValue={'Contraseña *'}
                                       reference={passwordRef}
                                       textColor={'text-black'}
                                       bgLabelColor={'bg-gray-300'}>
                            </InputForm>
                        </div>

                        <div className="sm:col-span-3">
                            <InputForm validationErrors={validationErrors ? validationErrors.password ? validationErrors.password : null : null}
                                       type={'password'}
                                       labelValue={'Repetir Contraseña *'}
                                       reference={passwordConfirmationRef}
                                       textColor={'text-black'}
                                       bgLabelColor={'bg-gray-300'}>
                            </InputForm>
                        </div>
                    </div>

                    <input type="submit" value="Crear usuario" className="bg-blue-800 hover:bg-blue-600 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"/>
                </form>
            </div>
        </>
    )
}
