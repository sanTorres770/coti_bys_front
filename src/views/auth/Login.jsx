import {Link, Navigate} from 'react-router-dom'
import {createRef, useState} from "react";
import InputForm from "../../components/layout/InputForm.jsx";
import {useAuth} from "../../hooks/useAuth.js";
import FormSubmitButton from "../../components/button/FormSubmitButton.jsx";
import LoadingAlert from "../../components/alerts/LoadingAlert.jsx";


export default function Login() {

    const emailRef = createRef();
    const passwordRef = createRef();

    const [validationErrors, setValidationErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const {login,handlerLogin} = useAuth()

    const handleSubmit = e => {

        e.preventDefault();

        setValidationErrors({})

        if (emailRef.current.value.trim().length === 0 || passwordRef.current.value.trim().length === 0) {

            if (passwordRef.current.value.length === 0){
                setValidationErrors({...validationErrors, password: 'La contraseña no puede estar vacía'})
            }

            if (emailRef.current.value.length === 0){
                setValidationErrors({...validationErrors, email: 'El correo no puede estar vacío'})
            }


        }else {

            const form = {
                username: emailRef.current.value,
                password: passwordRef.current.value,
            }

            handlerLogin(form, setIsLoading)
        }
    }


    return (

        <>
            {login.isAuth ?

                <Navigate to={'/dashboard'}></Navigate>

                :

                !isLoading ?

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                        <div>
                            <div className="mt-2">
                                <InputForm
                                    validationErrors={validationErrors ? validationErrors.email ? validationErrors.email : null : null}
                                    inputId={'username'}
                                    type={'text'}
                                    labelValue={'Correo electrónico*'}
                                    reference={emailRef}
                                    placeholder={'Correo electrónico'}
                                    textColor={'text-black'}>
                                </InputForm>
                            </div>
                        </div>

                        <div>
                            <div className="mt-2">
                                <InputForm
                                    validationErrors={validationErrors ? validationErrors.password ? validationErrors.password : null : null}
                                    inputId={'password'}
                                    type={'password'}
                                    labelValue={'Contraseña *'}
                                    reference={passwordRef}
                                    placeholder={'Contraseña'}
                                    textColor={'text-black'}
                                    additionalLabelLink={true}>
                                </InputForm>
                            </div>
                        </div>

                        <div>
                            <FormSubmitButton handleSubmit={handleSubmit}
                                              value={'Iniciar sesión'}
                            ></FormSubmitButton>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Deseas cotizar nuestros servicios?{' '}
                        <Link to="/quot/step_1"
                              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Hazlo acá
                        </Link>
                    </p>
                </div>

                    :

                    <LoadingAlert></LoadingAlert>
            }
        </>
    )
}
