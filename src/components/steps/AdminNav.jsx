import {Link} from "react-router-dom";
import useApp from "../../hooks/useApp.js";

export default function AdminNav({navOptions}) {

    const {handleAdminOptionClick, currentAdminOption} = useApp();

    return (

        <>
            <div className='flex md:flex-row flex-col items-center gap-5 md:gap-0 my-5 w-full'>
                {navOptions.map(option => (
                    <Link to={option.path} key={option.id}
                          className={`${option.id === currentAdminOption.id ? 'border-b-4 border-b-blue-900 rounded-b' : 'border-b-4 border-b-gray-50'} flex justify-center items-center gap-2 text-lg font-bold rounded-b hover:border-b-4 hover:border-b-blue-900 w-full text-center`}
                          onClick={()=> handleAdminOptionClick(option.id)}>
                        <img src={`../../${option.icon}`} alt="img" className='text-white'/>
                        {option.name}
                    </Link>
                ))}
            </div>

        </>
    )
}