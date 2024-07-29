import {Transition} from "@headlessui/react";
import {Link} from "react-router-dom";
import useApp from "../../hooks/useApp.js";

export default function AssignSupplyTableRow({data,index,viewDataPath}) {

    const {getSupplyById} = useApp();

    const {description,
        supplyAmount,
        reference,
        maker,
        id} = data;

    const handleSelectSupplyData = (id) => {

        getSupplyById(id)

    }

    return (

        <tr className="hover:bg-gray-50">
                    <td className="p-4 text-xs font-semibold w-1/3">
                        {description}
                    </td>
                    <td className="p-4 text-xs font-semibold">
                        {reference}
                    </td>
                    <td className="p-4 text-xs">
                        <div className="flex gap-2">
                    <span
                        className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600">
                        {maker.name}
                    </span>
                        </div>
                    </td>
                    <td className="p-2">
                        <Transition
                            as={'div'}
                            appear={true}
                            show={true}
                            enter="transition-all ease-in-out duration-500 delay-[200ms]"
                            enterFrom="opacity-0 translate-y-6"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition-all ease-in-out duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="h-8 w-24">
                                <div className="flex flex-row h-8 w-full rounded-lg relative bg-transparent">

                                    {viewDataPath ?

                                        <Link to={viewDataPath} onClick={() => handleSelectSupplyData(id)}
                                              className='flex py-1 justify-center rounded-full bg-gray-500/10 hover:text-indigo-600'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth="1.5"
                                                 stroke="currentColor" className="h-6 w-6" x-tooltip="tooltip">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
                                            </svg>
                                        </Link>

                                        :
                                        <input type="number" id={`amount_${index}`} defaultValue={supplyAmount}
                                               className="appearance-none text-center rounded-md w-full border-gray-300 bord font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-500"></input>

                                    }


                                </div>
                            </div>
                        </Transition>
                    </td>
        </tr>

    );
}