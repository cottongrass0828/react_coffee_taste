import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { PlusIcon, MinusIcon } from '@heroicons/react/20/solid'
import axios from 'axios'
import { Link } from 'react-router-dom'

function ShoppingCart({ cartData, isShopingCartActive, setIsShopingCartActive, getCart }) {
    const [loadingItems, setLoadingItems] = useState([])
    const removeCartItem = async (id) => {
        try {
            const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`)
            getCart()
        } catch (error) {
            console.log(error);
        }
    }

    const updateCartItem = async (item, quantity) => {
        const data = {
            data: {
                product_id: item.product_id,
                qty: quantity
            }
        }
        setLoadingItems([...loadingItems, item.id])
        try {
            const res = await axios.put(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`, data)
            getCart()
            setLoadingItems(loadingItems.filter((obj) => { obj !== item.id }))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Transition.Root show={isShopingCartActive} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setIsShopingCartActive}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">購物車({cartData.carts?.length})</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={() => setIsShopingCartActive(false)}
                                                    >
                                                        <span className="absolute -inset-0.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                        {cartData?.carts?.map((item) => (
                                                            <li key={item.id} className="flex py-6">
                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                    <img
                                                                        src={item.product.imageUrl}
                                                                        alt={item.id}
                                                                        className="h-full w-full object-cover object-center"
                                                                    />
                                                                </div>

                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                                            <h3>
                                                                                <span>{item.product.title}</span>
                                                                            </h3>
                                                                            <p className="ml-4">{item.final_total}</p>
                                                                        </div>
                                                                        <p className="mt-1 text-sm text-gray-500">{item.product.unit}</p>
                                                                    </div>
                                                                    <div className="flex flex-1 items-center justify-between text-sm">
                                                                        <div className="flex">
                                                                            <button type="button"
                                                                                onClick={() => { updateCartItem(item, item.qty - 1) }}
                                                                                disabled={item.qty === 1 || loadingItems.includes(item.id)} className="disabled:text-gray-300">
                                                                                <MinusIcon className={`block h-6 w-6`} />
                                                                            </button>
                                                                            <input type="number" value={item.qty}
                                                                                disabled={loadingItems.includes(item.id)}
                                                                                className="block max-w-[9rem] disabled:text-gray-300 text-center border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0  sm:leading-6"
                                                                                readOnly />
                                                                            <button type="button"
                                                                                disabled={loadingItems.includes(item.id)} className="disabled:text-gray-300"
                                                                                onClick={() => { updateCartItem(item, item.qty + 1) }}>
                                                                                <PlusIcon className="block h-6 w-6" />
                                                                            </button>
                                                                        </div>
                                                                        <div className="flex shrink-0">
                                                                            <button
                                                                                onClick={() => removeCartItem(item.id)}
                                                                                type="button"
                                                                                className="font-medium text-coffee-600 hover:text-coffee-500"
                                                                            >
                                                                                移除
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>總金額</p>
                                                <p>NT${cartData.final_total}</p>
                                            </div>
                                            <div className="mt-6">
                                                <Link to='checkout'
                                                    className="flex items-center justify-center rounded-md border border-transparent bg-coffee-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-coffee-700"
                                                >
                                                    前往結帳
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
export default ShoppingCart