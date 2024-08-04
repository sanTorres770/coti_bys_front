import {Outlet} from "react-router-dom";
import Steps from "../../components/steps/Steps.jsx";
import {Transition} from "@headlessui/react";
import {ToastContainer} from "react-toastify";

export default function QuotationLayout() {
    return (
        <main className='max-w-4xl m-auto flex justify-center'>

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
                <div
                    className="flex min-h-full shadow-md rounded-md ring-1 ring-inset ring-gray-300 flex-1 flex-col my-5 justify-center px-6 py-12 lg:px-8 bg-gray-100">

                    <div className="grid grid-cols-2 justify-between">
                        <div>
                            <h1 className="text-xl font-bold leading-7">Cotiza nuestros productos</h1>
                            <p className="mt-1 text-sm font-medium leading-6 text-gray-700">
                                Acá conocerás nuestros servicios con más detalle!
                            </p>
                        </div>
                        <div>
                            <img
                                className="mx-auto h-10 w-auto"
                                src='../logo-bys.png'
                                alt='logoBYS'
                            />
                        </div>
                    </div>

                    <Steps option={'newQuotation'}/>

                    <div
                        className="bg-white px-5 py-3 rounded-md border border-gray-300">

                        <Outlet/>

                    </div>

                </div>

            </Transition>

            <ToastContainer/>

        </main>
    );
}