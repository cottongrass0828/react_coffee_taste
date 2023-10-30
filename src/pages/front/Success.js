import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom"
import axios from "axios";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

function Success() {
    const { orderid } = useParams();
    const [orderData, setOrderData] = useState({})
    const getOrderDetail = async (orderid) => {
        const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderid}`)
        console.log(res);
        setOrderData(res.data.order)
    }
    useEffect(() => {
        getOrderDetail(orderid)
    }, [orderid])
    return (
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col">
                <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">訂單 #{orderData.id?.slice(-6)}</h1>
                <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">{new Date(orderData.create_at).toLocaleDateString('zh-tw', { year: 'numeric', month: '2-digit', day: '2-digit' })} {new Date(orderData.create_at).toLocaleTimeString('it-IT')}</p>
            </div>
            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                        <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">訂單商品</p>
                        {(Object.values(orderData.products || {})).map((product) => (
                            <div key={product.id} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                <div className="pb-4 md:pb-8 w-full md:w-40">
                                    <img className="w-full" src={product.imageUrl} alt={product.product.title} />
                                </div>
                                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                                        <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{product.product.title}</h3>
                                    </div>
                                    <div className="flex justify-between space-x-8 items-start w-full">
                                        <p className="text-base dark:text-white xl:text-lg leading-6">NT${product.product.price} {product.product.price !== product.product.origin_price && <span className="text-coffee-300 line-through"> NT${product.product.origin_price}</span>}</p>
                                        <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">{product.qty}</p>
                                        <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">NT${product.total}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">總金額</h3>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">訂單金額</p>
                                <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">NT${orderData.total}</p>
                            </div>
                        </div>
                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">付款狀態</h3>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">{orderData.is_paid?(<><div className="inline-block bg-green-400 rounded-full h-3 w-3 mr-2"></div>付款成功</>):(<><div className="inline-block bg-red-400 rounded-full h-3 w-3 mr-2"></div>尚未付款</>)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">收件人資料</h3>
                    <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                        <div className="flex flex-col justify-start items-start flex-shrink-0">
                            <div className="flex w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                <div className="flex justify-start items-start flex-col space-y-2">
                                    <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">{orderData.user?.name}</p>
                                </div>
                            </div>
                            <div className="flex text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                <EnvelopeIcon className="inline h-5 w-5 mr-1" />
                                <p className="cursor-pointer text-sm leading-5 ">{orderData.user?.email}</p>
                            </div>
                            <div className="flex text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                <PhoneIcon className="inline h-5 w-5 mr-1" />
                                <p className="cursor-pointer text-sm leading-5 ">{orderData.user?.tel}</p>
                            </div>
                        </div>
                        <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                            <div className="w-full flex justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                                <div className="w-full flex justify-start flex-col space-y-4 xl:mt-8">
                                    <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">收件地址</p>
                                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-left text-sm leading-5 text-gray-600">{orderData.user?.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Success