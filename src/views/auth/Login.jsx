import { Link } from 'react-router-dom'
import {createRef, useEffect, useState} from "react";
import ValidationFormAlert from "../../components/alerts/ValidationFormAlert.jsx";
import {useAuth} from "../../hooks/useAuth.js";

export default function Login() {

    const emailRef = createRef();
    const passwordRef = createRef();

    const [errores, setErrores] = useState([])

    const { login } = useAuth({
         middleware: 'guest',
         url: '/'
    })

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
            <h1 className="text-4xl font-black">Iniciar Sesión</h1>
            <p>Centro de servicios de Básculas y suministros</p>

            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form onSubmit={handleSubmit} noValidate>

                    {errores ? errores.map((error, i) => <ValidationFormAlert key={i}>{error}</ValidationFormAlert>)  : null }

                    <div className="mb-4">
                        <label className="text-slate-800" htmlFor="email">Correo electrónico:</label>
                        <input type="email" id="email" className="mt-2 w-full p-3 bg-gray-50" name="email" placeholder="Correo electrónico" ref={emailRef}/>
                    </div>

                    <div className="mb-4">
                        <label className="text-slate-800" htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" className="mt-2 w-full p-3 bg-gray-50" name="password" placeholder="Contraseña" ref={passwordRef}/>
                    </div>

                    <input type="submit" value="Iniciar Sesión" className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"/>
                </form>
            </div>

            {/*<nav className="mt-5">
                <Link to="/auth/register">
                    ¿No tienes cuenta? Crea una
                </Link>
            </nav>*/}
        </>
    )
}
