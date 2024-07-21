import {Link} from "react-router-dom";
import useApp from "../../hooks/useApp.js";
import {commonConfig} from "../../hooks/commonConfig.js";
import InputForm from "../layout/InputForm.jsx";
import {Transition} from "@headlessui/react";

export default function AssignSupplyTableRow({data,index}) {

    const {description,
        reference,
    maker,
    id} = data;

    return (
        <tr className="hover:bg-gray-50">
            <td className="p-4 text-xs font-semibold w-1/3">
                {description}
            </td>
            <td className="p-4 text-xs font-semibold">
                {reference}
            </td>
            <td className="p-4 text-xs w-1/3">
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
                        <button type='button' className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                            <span className="m-auto text-2xl font-thin">−</span>
                        </button>
                        <input type="text" id={`amount_${index}`} defaultValue={1} className="appearance-none text-center w-full border-gray-300 bord font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-500"></input>
                        <button type='button' className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                            <span className="m-auto text-2xl font-thin">+</span>
                        </button>
                    </div>
                </div>
                </Transition>
            </td>
        </tr>
    );
}