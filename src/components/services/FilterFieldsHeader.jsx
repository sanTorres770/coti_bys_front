import Dropdown from "../dropdown/Dropdown.jsx";
import {useState} from "react";
import {filterOptions} from "../../data/filter_options.js";

export default function FilterFieldsHeader() {

    const [dropdownVisible, setDropdownVisible] = useState(false)


    return (

        <div className="relative shadow-md bg-gray-800 sm:rounded-lg">
            <div className="flex flex-col-reverse items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md-4:space-x">
                <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                    <div className="flex items-center w-full space-x-3 md:w-auto">
                        <button onClick={()=> setDropdownVisible(!dropdownVisible)}
                                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                                 className='w-4 h-4 mr-2 text-gray-400' viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                                      clipRule="evenodd"/>
                            </svg>
                            Filtrar
                            <svg className={`-mr-1 ml-1.5 w-5 h-5 icon-filter ${!dropdownVisible ? 'active' : 'inactive'}`} fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path clipRule="evenodd" fillRule="evenodd"
                                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                            </svg>
                        </button>
                        <Dropdown dropdownVisible={dropdownVisible} itemsList={filterOptions}></Dropdown>
                    </div>
                </div>

                <div className="w-full md:w-1/2">
                    <form className="flex items-center">
                        <div className="relative w-full mb-5 md:m-0">
                            <div
                                className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                          clipRule="evenodd"/>
                                </svg>
                            </div>
                            <input type="text"
                                   className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                   placeholder="Buscar"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}