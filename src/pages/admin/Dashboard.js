import { SquaresPlusIcon, DocumentTextIcon, BookOpenIcon, ArrowRightOnRectangleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useReducer } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios';
import Message from '../../components/Message';
import { MessageContext, messageReducer, initState } from '../../store/messageStore';
import Loading from '../../components/Loading';
import { useState } from 'react';
import { Disclosure } from '@headlessui/react'

function Dashboard() {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const reducer = useReducer(messageReducer, initState)

    const logout = () => {
        document.cookie = `hexToken=;`;
        navigate('/login');
    }

    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('hexToken='))
        ?.split('=')[1];
    axios.defaults.headers.common['Authorization'] = token;
    useEffect(() => {
        if (!token) {
            return navigate('/login');
        }
        (async () => {
            try {
                setIsLoading(true)
                await axios.post('/v2/api/user/check')
                setIsLoading(false)
            } catch (error) {
                if (!error.response.data.success) {
                    navigate('/login');
                }
            }
        })()
    }, [navigate, token])

    return (
        <MessageContext.Provider value={reducer}>
            <div className='sm:h-full grow flex flex-col'>
                <Disclosure as="nav" className="sticky top-0 z-10 bg-white sm:hidden">
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
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="sm:hidden">
                                <div className="px-5 pb-3 pt-2">
                                    <div className="font-bold text-sm mb-[12px]">主選單</div>
                                    <ul className="text-[#9299A9]">
                                        <li className='mb-2'>
                                            <NavLink
                                                to="/admin/products"
                                                className={({ isActive }) =>
                                                    isActive ? 'block bg-coffee-100 rounded-lg pt-[15px] pb-[16px] px-[26px] text-coffee-400' : 'block rounded-lg pt-[15px] pb-[16px] px-[26px]  hover:text-coffee-400'
                                                }
                                            >
                                                <SquaresPlusIcon className="h-6 w-6 mr-[20px] inline-block" /><span>產品列表</span>
                                            </NavLink>
                                        </li>
                                        <li className='mb-2'>
                                            <NavLink
                                                to="/admin/articles"
                                                className={({ isActive }) =>
                                                    isActive ? 'block bg-coffee-100 rounded-lg pt-[15px] pb-[16px] px-[26px] text-coffee-400' : 'block rounded-lg pt-[15px] pb-[16px] px-[26px]  hover:text-coffee-400'
                                                }
                                            >
                                                <DocumentTextIcon className="h-6 w-6 mr-[20px] inline-block" /><span>文章列表</span>
                                            </NavLink>
                                        </li>
                                        <li className='mb-2'>
                                            <NavLink
                                                to="/admin/orders"
                                                className={({ isActive }) =>
                                                    isActive ? 'block bg-coffee-100 rounded-lg pt-[15px] pb-[16px] px-[26px] text-coffee-400' : 'block rounded-lg pt-[15px] pb-[16px] px-[26px]  hover:text-coffee-400'
                                                }
                                            >
                                                <BookOpenIcon className="h-6 w-6  mr-[20px] inline-block" /><span>訂單列表</span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                    <div className="border-b border-b-[#F4F4F4] my-[18px]"></div>
                                    <div className="font-bold text-sm mb-[12px]">帳戶</div>
                                    <ul className="text-[#9299A9]">
                                        <li>
                                            <button onClick={logout} type="button" className="block w-full text-start rounded-lg pt-[15px] pb-[16px] px-[26px]  hover:text-coffee-400"><ArrowRightOnRectangleIcon className="h-6 w-6  mr-[20px] inline-block" />登出</button>
                                        </li>
                                    </ul>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <div className="grow flex h-full">
                    <Loading isLoading={isLoading} />
                    <Message />
                    <nav className="hidden sm:block h-full min-w-[290px] bg-white px-[26px] py-6 border-r border-r-[#EFF0F1]">
                        <div className="inline-block w-[45px] ml-[2px] mr-3.5"><img className="object-cover rounded-lg" src="/logo200.png" alt="logo" /></div>
                        <div className="inline-block mb-[52px]">
                            <div className="font-bold text-xl">咖啡味</div>
                            <div>後臺管理</div>
                        </div>
                        <div className="font-bold text-sm mb-[24px]">主選單</div>
                        <ul className="text-[#9299A9]">
                            <li className='mb-2'>
                                <NavLink
                                    to="/admin/products"
                                    className={({ isActive }) =>
                                        isActive ? 'block bg-coffee-100 rounded-lg pt-[15px] pb-[16px] px-[26px] text-coffee-400' : 'block rounded-lg pt-[15px] pb-[16px] px-[26px]  hover:text-coffee-400'
                                    }
                                >
                                    <SquaresPlusIcon className="h-6 w-6 mr-[20px] inline-block" /><span>產品列表</span>
                                </NavLink>
                            </li>
                            <li className='mb-2'>
                                <NavLink
                                    to="/admin/articles"
                                    className={({ isActive }) =>
                                        isActive ? 'block bg-coffee-100 rounded-lg pt-[15px] pb-[16px] px-[26px] text-coffee-400' : 'block rounded-lg pt-[15px] pb-[16px] px-[26px]  hover:text-coffee-400'
                                    }
                                >
                                    <BookOpenIcon className="h-6 w-6 mr-[20px] inline-block" /><span>文章列表</span>
                                </NavLink>
                            </li>
                            <li className='mb-2'>
                                <NavLink
                                    to="/admin/orders"
                                    className={({ isActive }) =>
                                        isActive ? 'block bg-coffee-100 rounded-lg pt-[15px] pb-[16px] px-[26px] text-coffee-400' : 'block rounded-lg pt-[15px] pb-[16px] px-[26px]  hover:text-coffee-400'
                                    }
                                >
                                    <DocumentTextIcon className="h-6 w-6  mr-[20px] inline-block" /><span>訂單列表</span>
                                </NavLink>
                            </li>
                        </ul>
                        <div className="border-b border-b-[#F4F4F4] my-[36px]"></div>
                        <div className="font-bold text-sm mb-[24px]">帳戶</div>
                        <ul className="text-[#9299A9]">
                            <li><button onClick={logout} type="button" className="block w-full text-start rounded-lg pt-[15px] pb-[16px] px-[26px]  hover:text-coffee-400"><ArrowRightOnRectangleIcon className="h-6 w-6  mr-[20px] inline-block" />登出</button></li></ul>
                    </nav>
                    <div className='h-full bg-coffee-100 grow p-[12px] sm:p-[26px] overflow-y-auto'>
                        {token && <Outlet />}
                    </div>
                </div>
            </div>
        </MessageContext.Provider>

    )
}

export default Dashboard