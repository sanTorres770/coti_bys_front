import useApp from "../../hooks/useApp.js";

export default function Navigation() {


    const {handleClickSidebarVisibility} = useApp();


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
                    <li className="mr-1 dropdown">
                        <button type="button"
                                className="dropdown-toggle text-gray-400 mr-4 w-8 h-8 rounded flex items-center justify-center  hover:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                            </svg>

                        </button>
                        <div
                            className="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-xs w-full bg-white rounded-md border border-gray-100">
                            <form action="" className="p-4 border-b border-b-gray-100">
                                <div className="relative w-full">
                                    <input type="text"
                                           className="py-2 pr-4 pl-10 bg-gray-50 w-full outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500"
                                           placeholder="Search..."/>
                                    <i className="ri-search-line absolute top-1/2 left-4 -translate-y-1/2 text-gray-900"></i>
                                </div>
                            </form>
                        </div>
                    </li>
                    <li className="dropdown">
                        <button type="button"
                                className="dropdown-toggle text-gray-400 mr-4 w-8 h-8 rounded flex items-center justify-center  hover:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                 fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                                <path
                                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path
                                    d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                            </svg>
                        </button>
                        <div
                            className="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-xs w-full bg-white rounded-md border border-gray-100">
                            <div
                                className="flex items-center px-4 pt-4 border-b border-b-gray-100 notification-tab">
                                <button type="button" data-tab="notification" data-tab-page="notifications"
                                        className="text-gray-400 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1 active">Notifications
                                </button>
                                <button type="button" data-tab="notification" data-tab-page="messages"
                                        className="text-gray-400 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1">Messages
                                </button>
                            </div>
                            <div className="my-2">
                                <ul className="max-h-64 overflow-y-auto" data-tab-for="notification"
                                    data-page="notifications">
                                    <li>
                                        <a href="#"
                                           className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                            <img src="https://placehold.co/32x32" alt=""
                                                 className="w-8 h-8 rounded block object-cover align-middle"/>
                                            <div className="ml-2">
                                                <div
                                                    className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">New
                                                    order
                                                </div>
                                                <div className="text-[11px] text-gray-400">from a user</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                            <img src="https://placehold.co/32x32" alt=""
                                                 className="w-8 h-8 rounded block object-cover align-middle"/>
                                            <div className="ml-2">
                                                <div
                                                    className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">New
                                                    order
                                                </div>
                                                <div className="text-[11px] text-gray-400">from a user</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                            <img src="https://placehold.co/32x32" alt=""
                                                 className="w-8 h-8 rounded block object-cover align-middle"/>
                                            <div className="ml-2">
                                                <div
                                                    className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">New
                                                    order
                                                </div>
                                                <div className="text-[11px] text-gray-400">from a user</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                            <img src="https://placehold.co/32x32" alt=""
                                                 className="w-8 h-8 rounded block object-cover align-middle"/>
                                            <div className="ml-2">
                                                <div
                                                    className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">New
                                                    order
                                                </div>
                                                <div className="text-[11px] text-gray-400">from a user</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                            <img src="https://placehold.co/32x32" alt=""
                                                 className="w-8 h-8 rounded block object-cover align-middle"/>
                                            <div className="ml-2">
                                                <div
                                                    className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">New
                                                    order
                                                </div>
                                                <div className="text-[11px] text-gray-400">from a user</div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <ul className="max-h-64 overflow-y-auto hidden" data-tab-for="notification"
                                    data-page="messages">
                                    <li>
                                        <a href="#"
                                           className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                            <img src="https://placehold.co/32x32" alt=""
                                                 className="w-8 h-8 rounded block object-cover align-middle"/>
                                            <div className="ml-2">
                                                <div
                                                    className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">John
                                                    Doe
                                                </div>
                                                <div className="text-[11px] text-gray-400">Hello there!
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                            <img src="https://placehold.co/32x32" alt=""
                                                 className="w-8 h-8 rounded block object-cover align-middle"/>
                                            <div className="ml-2">
                                                <div
                                                    className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">John
                                                    Doe
                                                </div>
                                                <div className="text-[11px] text-gray-400">Hello there!
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                            <img src="https://placehold.co/32x32" alt=""
                                                 className="w-8 h-8 rounded block object-cover align-middle"/>
                                            <div className="ml-2">
                                                <div
                                                    className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">John
                                                    Doe
                                                </div>
                                                <div className="text-[11px] text-gray-400">Hello there!
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                            <img src="https://placehold.co/32x32" alt=""
                                                 className="w-8 h-8 rounded block object-cover align-middle"/>
                                            <div className="ml-2">
                                                <div
                                                    className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">John
                                                    Doe
                                                </div>
                                                <div className="text-[11px] text-gray-400">Hello there!
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                            <img src="https://placehold.co/32x32" alt=""
                                                 className="w-8 h-8 rounded block object-cover align-middle"/>
                                            <div className="ml-2">
                                                <div
                                                    className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">John
                                                    Doe
                                                </div>
                                                <div className="text-[11px] text-gray-400">Hello there!
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <button id="fullscreen-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-check-circle" viewBox="0 0 16 16">
                            <path
                                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path
                                d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                        </svg>
                    </button>
                    {/*<script>
                                    const fullscreenButton = document.getElementById('fullscreen-button');

                                    fullscreenButton.addEventListener('click', toggleFullscreen);

                                    function toggleFullscreen() {
                                    if (document.fullscreenElement) {
                                    // If already in fullscreen, exit fullscreen
                                    document.exitFullscreen();
                                } else {
                                    // If not in fullscreen, request fullscreen
                                    document.documentElement.requestFullscreen();
                                }
                                }
                                </script>*/}

                    <li className="dropdown ml-3">
                        <button type="button" className="dropdown-toggle flex items-center">
                            <div className="flex-shrink-0 w-10 h-10 relative">
                                <div className="p-1 bg-white rounded-full focus:outline-none focus:ring">
                                    <img className="w-8 h-8 rounded-full"
                                         src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
                                         alt=""/>
                                    <div
                                        className="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping"></div>
                                    <div
                                        className="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full"></div>
                                </div>
                            </div>
                            <div className="p-2 md:block text-left">
                                <h2 className="text-sm font-semibold text-gray-800">John Doe</h2>
                                <p className="text-xs text-gray-500">Administrator</p>
                            </div>
                        </button>
                        <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                            <li>
                                <a href="#"
                                   className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50">Profile</a>
                            </li>
                            <li>
                                <a href="#"
                                   className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50">Settings</a>
                            </li>
                            <li>
                                <form method="POST" action="">
                                    <a role="menuitem"
                                       className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50 cursor-pointer">
                                        Log Out
                                    </a>
                                </form>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

        </>
    );
}
