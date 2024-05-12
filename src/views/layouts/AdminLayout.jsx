import {Outlet} from "react-router-dom";
import Steps from "../../components/steps/Steps.jsx";
import AdminNav from "../../components/steps/AdminNav.jsx";
import useApp from "../../hooks/useApp.js";


export default function AdminLayout() {

    const {adminOptions, currentOption} = useApp()

    const navOptions = adminOptions.filter(option => option.adminOption === currentOption.id)

    return (

        <div>
            <h1 className="text-xl font-bold leading-7 text-gray-900">{currentOption.name}</h1>
            <p className="mt-1 text-sm leading-6 text-gray-600">Ingrese a una de las opciones</p>

            <AdminNav navOptions={navOptions}/>

            <Outlet/>

        </div>
    )
}