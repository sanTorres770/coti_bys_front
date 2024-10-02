import {CheckIcon,ArrowPathIcon, CloudArrowUpIcon, LockClosedIcon} from "@heroicons/react/20/solid/index.js";
import Icon from "../../assets/Icon.jsx";

export default function ProductOption({option,onClick,selectedOption,arraySelection}) {

    const {id, name, icon, description} = option;

    return (

        <div key={name} onClick={onClick ? onClick : null}
             className={`me-2 ${selectedOption !== null ? selectedOption === id ? 'bg-indigo-100 shadow-sm shadow-indigo-300' : '' : null} 
             ${arraySelection !== null ? arraySelection.some(selection => selection.id === id) ? 'bg-indigo-100 shadow-sm shadow-indigo-300' : '' : null}
             relative pl-16 hover:bg-indigo-100 hover:cursor-pointer lg:py-3 rounded-md hover:shadow-sm hover:shadow-indigo-300`}>
            {(selectedOption === id || (arraySelection !== null && arraySelection.some(selection => selection.id === id))) && (
                <span className={'text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4'}>
                    <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                </span>
            )}
            <dt className="text-base font-semibold leading-7 text-gray-900 mb-3">
                <div
                    className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 m-1">
                    <Icon svg={icon}/>
                </div>

                {id !== '11' ?

                    name
                    :

                    <img src="/ricelake.jpg" alt="ricelake" className='w-1/3 mt-2'/>
                }
            </dt>

            {id !== '11' ?
                <dd className="mt-2 text-base leading-7 text-gray-600 mb-3">{description}</dd>

                :

                ''
            }
        </div>

    )
};