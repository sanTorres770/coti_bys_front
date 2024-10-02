import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function LogoutDropdown({userName, isAdmin, logout}) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="flex items-center">
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
                        <h2 className="text-sm font-semibold text-gray-800">{userName && userName}</h2>
                        <p className="text-xs text-gray-500">{isAdmin ? 'Administrador' : 'Usuario'}</p>
                    </div>
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <p
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm cursor-pointer'
                                    )}
                                    onClick={() => logout()}
                                >
                                    Cerrar sesión
                                </p>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
