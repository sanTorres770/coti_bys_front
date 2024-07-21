import Option from "../option/Option.jsx";
import useApp from "../../hooks/useApp.js";
/*import {useAuth} from "../../hooks/useAuth.js";*/
import {Link} from "react-router-dom";
import SidebarDisclosure from "../disclosure/SidebarDisclosure.jsx";
import {useEffect} from "react";
export default function Sidebar() {

    const {sidebarVisible,handleClickSidebarVisibility,sidebarOptions,setSelectedSidebarOption} = useApp();

    /*const {logout, user} = useAuth({middleware:'auth'})*/

    useEffect(() => {
        setSelectedSidebarOption({})
    }, []);

    return (

        <>

            <div className="fixed left-0 top-0 w-64 h-full bg-indigo-600 p-4 z-50 transition-transform">
                <div className="pb-5 border-b border-[#c7d2fe]">
                    <Link to={'/'}>
                        <h2 className="font-bold text-2xl text-white">COTI <span
                            className="bg-[#f8f4f3] text-indigo-600 px-2 rounded-md">BYS</span></h2>
                    </Link>
                </div>
                <ul className="mt-4">
                    {/*<span className="text-gray-400 font-bold">ADMIN</span>*/}
                    <li className="mb-1 group">
                        <SidebarDisclosure options={sidebarOptions}></SidebarDisclosure>
                    </li>
                </ul>
            </div>
            <div className={`fixed top-0 left-0 w-full h-full bg-black/50 z-40 ${sidebarVisible ? 'md:hidden' : ''}`}
                 onClick={() => handleClickSidebarVisibility()}></div>
        </>

    )
}