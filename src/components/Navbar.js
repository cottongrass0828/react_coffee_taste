import { Disclosure} from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
function Navbar({ cartData, setIsShopingCartActive }) {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <Disclosure as="nav" className="bg-coffee-800">
            {({ open }) => (
                <>
                    <div className="mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-coffee-400 hover:bg-coffee-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <NavLink to='/'>
                                        <img
                                            className="h-8 w-auto rounded-lg"
                                            src="/logo200.png"
                                            alt="logo"
                                        />
                                    </NavLink>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        <NavLink
                                            to='/products'
                                            className={({ isActive }) =>
                                                classNames(
                                                    isActive ? 'bg-coffee-900 text-white' : 'text-coffee-300 hover:bg-coffee-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )
                                            }
                                        >
                                            所有商品
                                        </NavLink>
                                        <NavLink
                                            to='/articles'
                                            className={({ isActive }) =>
                                                classNames(
                                                    isActive ? 'bg-coffee-900 text-white' : 'text-coffee-300 hover:bg-coffee-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )
                                            }
                                        >
                                            咖啡駐所
                                        </NavLink>
                                        <NavLink
                                            to='/about'
                                            className={({ isActive }) =>
                                                classNames(
                                                    isActive ? 'bg-coffee-900 text-white' : 'text-coffee-300 hover:bg-coffee-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )
                                            }
                                        >
                                            咖啡味故事
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    onClick={() => setIsShopingCartActive(true)}
                                    type="button"
                                    className="relative rounded-full bg-coffee-800 p-1 text-coffee-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-coffee-800"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View Cart</span>
                                    <span className="absolute -right-2 -top-2 inline-flex items-center rounded-full bg-coffee-50 px-2 py-1 text-xs font-medium text-coffee-700 ring-1 ring-inset ring-coffee-600/10">
                                        {cartData.carts?.length}
                                    </span>
                                    <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            <NavLink
                                to='/products'
                                className={({ isActive }) =>
                                    classNames(
                                        isActive ? 'bg-coffee-900 text-white' : 'text-coffee-300 hover:bg-coffee-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )
                                }
                            >
                                所有商品
                            </NavLink>
                            <NavLink
                                to='/articles'
                                className={({ isActive }) =>
                                    classNames(
                                        isActive ? 'bg-coffee-900 text-white' : 'text-coffee-300 hover:bg-coffee-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )
                                }
                            >
                                咖啡駐所
                            </NavLink>
                            <NavLink
                                to='/about'
                                className={({ isActive }) =>
                                    classNames(
                                        isActive ? 'bg-coffee-900 text-white' : 'text-coffee-300 hover:bg-coffee-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )
                                }
                            >
                                咖啡味故事
                            </NavLink>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
export default Navbar