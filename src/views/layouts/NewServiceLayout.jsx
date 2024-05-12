import {Outlet} from "react-router-dom";
import Steps from "../../components/steps/Steps.jsx";


export default function NewServiceLayout() {

    return (

        <>
            <h1 className="text-xl font-bold leading-7 text-gray-900">Solicitar nuevo servicio</h1>
            <p className="mt-1 text-sm leading-6 text-gray-700 font-bold">Indícanos la información precisa de tu solicitud para atenderte de la mejor manera!</p>

            <Steps/>

            <div className="bg-gray-300 shadow-md rounded-md mt-10 px-5 py-10 border-2 border-gray-600 shadow-gray-500">

                <Outlet/>

            </div>

        </>
    )
}