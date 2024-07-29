import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import {ChevronRightIcon} from '@heroicons/react/20/solid'
import useApp from "../../hooks/useApp.js";
import {Link} from "react-router-dom";
import {useEffect} from "react";

export default function SidebarDisclosure({options}) {

    const {handleSidebarOption,
        selectedSidebarOption,
        selectedSidebarSubOption,
        handleSidebarSubOption,
        newBaggerQuotationLength} = useApp();


    const handleClickSidebarOption = (option) => {

        const buttonToClose = document.getElementById(`sidebar_option_${selectedSidebarOption.id}`);

        if (buttonToClose !== null){
            buttonToClose.click()
        }

        handleSidebarOption(option)

    }


    return (

        <div className="w-full">

            {options.map(option => (

                <div key={option.id} className="mx-auto mb-2 w-full max-w-lg divide-y divide-white/5 rounded-xl bg-indigo-600/50">
                    <Disclosure as="div"
                                className={`p-4 text-[#c7d2fe] hover:bg-indigo-800 hover:text-gray-100 font-semibold rounded-md
                                ${option.id === selectedSidebarOption.id ? 'bg-indigo-800 text-gray-100' : ''}`}
                                defaultOpen={false}>

                        <DisclosureButton className="group flex w-full items-center justify-between"
                                          onClick={() => handleClickSidebarOption(option)}
                                          id={`sidebar_option_${option.id}`}>
                            {option.options.length > 0 ?

                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         width="24" height="24"
                                         stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d={option.icon}/>
                                    </svg>
                                    <span>{option.name}</span>

                                    {(option.displayBadge && newBaggerQuotationLength > 0) && (
                                        <span
                                            className="px-2 py-0.5 text-xs font-medium text-red-600 bg-red-200 rounded-full">
                                        {newBaggerQuotationLength}
                                    </span>
                                    )}

                                    <ChevronRightIcon
                                        className='w-5 group-data-[open]:rotate-90'/>
                                </>

                                :

                                <Link to={option.path} className="group flex w-full items-center justify-between"
                                      onClick={() => handleClickSidebarOption(option)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         width="24" height="24"
                                         stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d={option.icon}/>
                                    </svg>
                                    <span>{option.name}</span>
                                    {(option.displayBadge && newBaggerQuotationLength > 0) && (
                                        <span className="px-2 py-0.5 text-xs font-medium text-red-600 bg-red-200 rounded-full">
                                        {newBaggerQuotationLength}
                                        </span>
                                    )}
                                    <ChevronRightIcon className='w-5 text-transparent'/>
                                </Link>
                            }
                        </DisclosureButton>

                        {option.options.length > 0 && (

                            <DisclosurePanel as={'ul'} className="mt-4 text-sm/5 text-white/50">

                                {option.options.map(subOption => (
                                    <li key={subOption.id} className="mb-1 group">
                                        <Link to={subOption.path}
                                              className={`flex font-semibold items-center py-2 px-4 text-[#c7d2fe] rounded-md hover:bg-indigo-900 hover:text-gray-100
                                                                ${subOption.id === selectedSidebarSubOption.id ? 'bg-indigo-900 text-gray-100' : ''}`}
                                              onClick={() => handleSidebarSubOption(subOption)}>
                                            <span className="text-md ml-3">{`► ${subOption.name}`}</span>
                                            {(subOption.displayBadge && newBaggerQuotationLength > 0) && (
                                                <span className="px-2 py-0.5 text-xs font-medium text-red-600 bg-red-200 ml-12 rounded-full">
                                                    {newBaggerQuotationLength}
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                ))}

                            </DisclosurePanel>

                        )}


                    </Disclosure>
                </div>

            ))}

        </div>

    )
}
