import Option from "../option/Option.jsx";
import useApp from "../../hooks/useApp.js";
import {useAuth} from "../../hooks/useAuth.js";
import {Link} from "react-router-dom";
export default function SidebarLite() {

    const {options, handleClickSidebarVisibility, sidebarVisible} = useApp();

    const {logout, user} = useAuth({middleware:'auth'})

    const handleClickRotateIcon = () => {

        return sidebarVisible ? '' : 'rotate(180deg)'

    }

    return (

        <>

            <button type='button' onClick={()=> handleClickSidebarVisibility()} className='hidden md:block'>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                     style={{transform : handleClickRotateIcon()}}
                     className="bi bi-arrow-bar-left text-blue-500 hover:animate-pulse cursor-pointer" viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                          d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z"/>
                </svg>
            </button>

            <div className='flex justify-center'>
                <button type='button' onClick={()=> handleClickSidebarVisibility()} className='md:hidden'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                         style={{transform : handleClickRotateIcon()}}
                         className="bi bi-arrow-bar-left text-blue-500 hover:animate-pulse cursor-pointer" viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                              d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                </button>
            </div>


            <div>

                {!sidebarVisible && (

                    <>

                        <div className='flex flex-col gap-10 mt-10'>

                            <div className='flex justify-center'>
                                <Link to={'/'}>
                                    <img src="../../../logo-bys.png" alt="logo" className='md:w-10 w-40 text-center'/>
                                </Link>
                            </div>

                            {options.map( option => (

                                <Option
                                    key= {option.id}
                                    option= {option}
                                    currentRole={user ? user.role: null}
                                />

                            ))}
                        </div>

                        <footer className="bg-gray-900 mt-10">
                            <p className='italic text-gray-700 text-center md:hidden block'>Centro de servicios</p>
                            <p className='italic text-gray-700 text-sm text-center'>©STP</p>
                        </footer>

                    </>
                )}

            </div>


        </>

    )
}