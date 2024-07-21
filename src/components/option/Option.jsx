import useApp from "../../hooks/useApp.js";
import {Link} from "react-router-dom";

export default function Option({option,currentRole}) {


    const {handleOptionClick, currentOption, sidebarVisible} = useApp();
    const {id, name, icon, roles} = option


    return (


        /*roles.includes(currentRole) &&*/

        <Link onClick={()=> handleOptionClick(id)} type='button'
              className={`${currentOption.id === id ? 'bg-gray-800 shadow-sm shadow-blue-400' : 'bg-gray-900'} 
              flex items-center gap-4 border-b-4 border-sky-950 w-full hover:bg-gray-800 cursor-pointer
              ${sidebarVisible ? 'p-3' : 'md:flex hidden'}`}
              to={option.path}>

            <img src={`../../img/${icon}`} alt={`${icon} icon`} className='w-12'/>

            {sidebarVisible && (
                <p className='text-lg text-white font-bold cursor-pointer'>{name}</p>
            )}

        </Link>

    )
}