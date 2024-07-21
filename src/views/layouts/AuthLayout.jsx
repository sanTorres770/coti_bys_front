import {Outlet} from "react-router-dom";
import {Transition} from "@headlessui/react";

export default function AuthLayout() {
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
                <div className='flex flex-col md:flex-row items-center px-10 py-5'>

                    <div
                        className="flex min-h-min shadow-md rounded-md px-5 py-10 flex-1 flex-col justify-center lg:px-8 bg-gray-100">

                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img
                                className="mx-auto h-10 w-auto"
                                src='../logo-bys.png'
                                alt='logoBYS'
                            />
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Centro de servicios de Básculas y Suministros
                            </h2>
                        </div>

                        <Outlet/>
                    </div>

                </div>


            </Transition>


        </main>
    )
}