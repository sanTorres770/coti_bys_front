import useApp from "../../hooks/useApp.js";
import {useAuth} from "../../hooks/useAuth.js";
import LogoutDropdown from "../dropdown/LogoutDropdown.jsx";
import {useNavigate} from "react-router-dom";

export default function Navigation() {


    const {handleClickSidebarVisibility} = useApp();

    const {login, handlerLogout} = useAuth();

    const navigate = useNavigate()

    const handlerLogoutFunction = () => {

        handlerLogout().then(r => {
            navigate('/auth/login')
        })

    }


    return (
        <>

            <div className="py-2 px-6 bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
                <button type='button' onClick={() => handleClickSidebarVisibility()} className='md:block'>

                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                         viewBox="0 0 24 24" fill="currentColor" className="size-6 cursor-pointer text-gray-400">
                        <path fillRule="evenodd"
                              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                              clipRule="evenodd"/>
                    </svg>

                </button>


                <ul className="ml-auto flex items-center">
                    <LogoutDropdown isAdmin={login && login.isAdmin}
                                    userName={login.user && login.user.username}
                                    logout={handlerLogoutFunction}>
                    </LogoutDropdown>
                </ul>
            </div>

        </>
    );
}
