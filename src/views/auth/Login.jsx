import { Link } from 'react-router-dom'
import {createRef, useEffect, useState} from "react";
import ValidationFormAlert from "../../components/alerts/ValidationFormAlert.jsx";
import InputForm from "../../components/layout/InputForm.jsx";
/*import {useAuth} from "../../hooks/useAuth.js";*/

export default function Login() {

    const emailRef = createRef();
    const passwordRef = createRef();

    const [errores, setErrores] = useState([])

    /*const { login } = useAuth({
         middleware: 'guest',
         url: '/'
    })*/

    const handleSubmit = async e => {
        e.preventDefault();

        const form = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        login(form,setErrores)

        if (errores){

            window.scroll({
                top: 100,
                behavior: 'smooth'
            })
        }
    }


    return (

        <>

            {errores ? errores.map((error, i) => <ValidationFormAlert key={i}>{error}</ValidationFormAlert>)  : null }

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <div className="mt-2">
                            <InputForm
                                inputId={'username'}
                                type={'text'}
                                labelValue={'Correo electrónico*'}
                                textColor={'text-black'}>
                            </InputForm>
                        </div>
                    </div>

                    <div>
                        <div className="mt-2">
                            <InputForm
                                inputId={'username'}
                                type={'text'}
                                labelValue={'Contraseña *'}
                                textColor={'text-black'}
                                additionalLabelLink={true}>
                            </InputForm>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Deseas cotizar nuestros servicios?{' '}
                    <Link to="/quot/step_1" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Hazlo acá
                    </Link>
                </p>
            </div>


        </>
    )
}
