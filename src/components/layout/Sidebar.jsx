import Option from "../option/Option.jsx";
import useApp from "../../hooks/useApp.js";
import {useAuth} from "../../hooks/useAuth.js";
import {Link} from "react-router-dom";
export default function Sidebar() {

    const {options} = useApp();

    const {logout, user} = useAuth({middleware:'auth'})

    return (

        <div className='md:w-64 min-h-full md:p-2 pt-2 bg-gray-900'>

        <div className='flex p-4 mt-3 justify-center'>
            <Link to={'/'}>
                <img src="../../../logo-bys.png" alt="logo" className='w-40 text-center'/>
            </Link>
        </div>

        <div className='bg-gray-800 w-full p-2 my-10 rounded border-b-4 border-gray-900'>

            <div className='flex items-center gap-4 w-full p-1'>


                <button type='button' onClick={logout}>
                    <img className='w-16 rounded-full hover:shadow-lg hover:shadow-blue-400' src="../../../img/logout.png" alt="logout"/>
                </button>

                <p className='text-lg text-white font-bold flex-wrap truncate'>{user ? user.name.toUpperCase() : null}</p>

            </div>

        </div>

        <div>
            {options.map( option => (

                <Option
                    key= {option.id}
                    option= {option}
                    currentRole={user ? user.role: null}
                />

            ))}

            <footer className="bg-gray-900 mt-10">
                <p className='italic text-gray-700 text-center'>Centro de servicios</p>
                <p className='italic text-gray-700 text-center'>©STP</p>
            </footer>

        </div>

        </div>

    )
}