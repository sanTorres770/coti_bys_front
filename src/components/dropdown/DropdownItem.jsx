import useApp from "../../hooks/useApp.js";
import {useState} from "react";


export default function DropdownItem({filterOption, currentRole}) {

    const {filterOptionsSelected, setFilterOptionsSelected, setIdSelected} = useApp()

    const {id, name, icon, roles} = filterOption

    const [dropdownCustomersVisible, setDropdownCustomersVisible] = useState(false)

    const handleSelectFilter = (itemIdSelected)=>{

        if (filterOptionsSelected.includes(itemIdSelected)){

            const filterOptionsUpdated = filterOptionsSelected.filter(option => option !== itemIdSelected)

            setFilterOptionsSelected(filterOptionsUpdated)

        }else {

            setFilterOptionsSelected([...itemIdSelected, ...filterOptionsSelected])
        }

    }

    return (

         roles.includes(currentRole) && (
                <li>
                    <button onClick={()=> {
                        setIdSelected(id)
                        handleSelectFilter(id)
                        isDropdown ? setDropdownCustomersVisible(!dropdownCustomersVisible) : null}}
                            type="button"
                            className="flex items-center text-lg justify-around space-x-2 w-full hover:bg-gray-500 rounded-md p-3 border-b border-b-gray-800">
                        <img src={`../${icon}`} alt="img"/>

                        {name}

                        {filterOptionsSelected.includes(id) ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-check2-square" viewBox="0 0 16 16">
                                <path
                                    d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
                                <path
                                    d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                            </svg> :

                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-square" viewBox="0 0 16 16">
                                <path
                                    d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            </svg>

                        }
                    </button>
                </li>
            )

    )
}