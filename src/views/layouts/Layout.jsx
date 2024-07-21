import {Outlet} from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar.jsx";
/*import {useAuth} from "../../hooks/useAuth.js";*/
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import useApp from "../../hooks/useApp.js";
import Navigation from "../../components/layout/Navigation.jsx";
import {Transition} from "@headlessui/react";


export default function Layout() {

    /*const {user, error} = useAuth({middleware:'auth'})*/
    const {sidebarVisible} = useApp()


    return (

        <>

            {sidebarVisible &&

                <Transition
                    appear={'div'}
                    show={true}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="-translate-x-full"
                >

                    <div>
                        <Sidebar/>
                    </div>

                </Transition>
            }

            <main className={`w-full md:w-[calc(100%-256px)] ${sidebarVisible ? 'md:ml-64' : 'md:ml-0 md:w-full'} pb-4 bg-gray-200 min-h-screen transition-all`}>

                <Navigation/>

                <Outlet/>

            </main>

            <ToastContainer/>

        </>
    )
}