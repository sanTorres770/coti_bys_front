import DropdownItem from "./DropdownItem.jsx";
import {useAuth} from "../../hooks/useAuth.js";
export default function Dropdown({dropdownVisible, itemsList}) {

    const {user} = useAuth({middleware:'auth'})

    return (
            <div className={`absolute md:top-16 md:left-1 md:w-48 top-32 left-9 w-52 p-3 bg-white rounded-lg shadow bg-gradient-to-t from-gray-400 to-gray-300 dropdown-menu ${dropdownVisible ? 'active' : 'inactive'}`}>
                <ul className="text-sm">

                    {itemsList.map(filterOption => (

                        <DropdownItem key={filterOption.id} filterOption={filterOption} currentRole={user ? user.role  : null}></DropdownItem>

                    ))}

                </ul>
            </div>
    )
}