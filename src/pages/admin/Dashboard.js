import { SquaresPlusIcon, DocumentTextIcon, TicketIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { useEffect, useReducer } from 'react';
import { Outlet, useNavigate, Link, NavLink } from 'react-router-dom'
import axios from 'axios';
import Message from '../../components/Message';
import { MessageContext, messageReducer, initState } from '../../store/messageStore';
import Loading from '../../components/Loading';
import { useState } from 'react';

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
            <div className="flex h-full">
                <Loading isLoading={isLoading} />
                <Message />
                <nav className="h-full min-w-[290px] bg-white px-[26px] py-6 border-r border-r-[#EFF0F1]">
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
                                to="/admin/coupons"
                                className={({ isActive }) =>
                                    isActive ? 'block bg-coffee-100 rounded-lg pt-[15px] pb-[16px] px-[26px] text-coffee-400' : 'block rounded-lg pt-[15px] pb-[16px] px-[26px]  hover:text-coffee-400'
                                }
                            >
                                <TicketIcon className="h-6 w-6 mr-[20px] inline-block" /><span>優惠券列表</span>
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
                <div className='h-full bg-coffee-100 grow p-[26px] overflow-y-auto'>
                    {token && <Outlet />}
                </div>
            </div>
        </MessageContext.Provider>

    )
}

export default Dashboard