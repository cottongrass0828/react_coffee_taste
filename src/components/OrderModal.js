import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { MessageContext, handleSuccessMessage, handleErrorMessage } from '../store/messageStore'

function OrderModal({
    isModalActive,
    closeModal,
    getOrders,
    tempOrder,
    setIsLoading }) {
    const [tempData, setTempData] = useState({
        create_at: 1555459200,
        id: '',
        is_paid: false,
        message: '',
        products: {},
        user: {},
    })

    const [, dispatch] = useContext(MessageContext)
    const [modalMessage, setModalMessage] = useState('')

    const [createDate, setCreateDate] = useState(new Date())
    useEffect(() => {
        setModalMessage('')
        setTempData({
            create_at: 1555459200,
            id: '',
            is_paid: false,
            message: '',
            products: {},
            user: {}
        })
        setTempData(tempOrder)
        setCreateDate(new Date(tempOrder.create_at))
    }, [tempOrder])

    const handleChange = (e) => {
        const { value, name } = e.target;
        let data;
        if (name === 'is_paid') {
            data = !!value
        } else {
            data = value
        }
        setTempData({ ...tempData, [name]: data })
    }

    const submit = async () => {
        try {
            setIsLoading(true)
            let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${tempOrder.id}`
            let method = 'put'
            // let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders/all`
            // let method = 'delete'
            const res = await axios[method](api, {
                data: tempData
            })
            handleSuccessMessage(dispatch, res)
            getOrders()
            closeModal()
        } catch (error) {
            console.log(error);
            setModalMessage(Array.isArray(error?.response?.data?.message) ? error?.response?.data?.message.join('，') : error?.response?.data?.message)
            setIsLoading(false)
        }
    }

    const cancelButtonRef = useRef(null)
    return (
        <Transition.Root show={isModalActive} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => { }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                                <form>
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                                            編輯 {tempData.id}
                                        </Dialog.Title>
                                        <div className={`mt-5 sm:mt-4 w-full rounded-lg overflow-hidden bg-red-100 mb-2 ${modalMessage ? 'block' : 'hidden'}`}>
                                            <div className="p-4">
                                                <p className="text-red-400">儲存失敗：{modalMessage}</p>
                                            </div>
                                        </div>
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-5 sm:mt-4 sm:mr-2">
                                                <div className="p-2 pb-5">
                                                    <p className="text-base font-semibold leading-7 text-gray-900">買家資訊</p>
                                                    <div className="mt-6 block text-sm font-medium leading-6 text-gray-900">
                                                        <span className="border border-gray-500 rounded px-2 py-1">收件人</span>
                                                    </div>
                                                    <p className="mt-2 sm:max-w-md">{tempData.user?.name}</p>
                                                    <div className="mt-6 block text-sm font-medium leading-6 text-gray-900">
                                                        <span className="border border-gray-500 rounded px-2 py-1">Email</span>
                                                    </div>
                                                    <p className="mt-2 sm:max-w-md">{tempData.user?.email}</p>
                                                    <div className="mt-6 block text-sm font-medium leading-6 text-gray-900">
                                                        <span className="border border-gray-500 rounded px-2 py-1">聯絡電話</span>
                                                    </div>
                                                    <p className="mt-2 sm:max-w-md">{tempData.user?.tel}</p>
                                                    <div className="mt-6 block text-sm font-medium leading-6 text-gray-900">
                                                        <span className="border border-gray-500 rounded px-2 py-1">收件地址</span>
                                                    </div>
                                                    <p className="mt-2 sm:max-w-md">{tempData.user?.address}</p>
                                                </div>
                                            </div>
                                            <div className="grow mt-5 sm:mt-4 sm:ml-2">
                                                <div className="p-2 pb-5">
                                                    <p className="text-base font-semibold leading-7 text-gray-900">訂單內容</p>
                                                    <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                                                        <div className="sm:col-span-6">
                                                            <div className="table__wrapper min-w-[295px]">
                                                                <table className="table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="row">商品名稱</th>
                                                                            <th scope="col">單位</th>
                                                                            <th scope="col">數量</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {(Object.values(tempData.products || {})).map((item) => {
                                                                            return (
                                                                                <tr key={item.id}>
                                                                                    <th scope="row" className="font-normal">{item.product.title}</th>
                                                                                    <td data-header="單位"><div>{item.product.unit}</div></td>
                                                                                    <td data-header="數量"><div>{item.qty}</div></td>
                                                                                </tr>
                                                                            )
                                                                        })}
                                                                        <tr>
                                                                            <td colSpan={3} className='text-right'>總金額 NT${tempData.total}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-6">
                                                            <div className="block text-sm font-medium leading-6 text-gray-900">
                                                                <span className="border border-gray-500 rounded px-2 py-1">買家留言</span>
                                                            </div>
                                                            <div className="mt-2">
                                                                <p>{tempData?.message !== undefined ? tempData.message : <small>(無留言)</small>}</p>
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-6">
                                                            <div className="block text-sm font-medium leading-6 text-gray-900">
                                                                <span className="border border-gray-500 rounded px-2 py-1">建立時間</span>
                                                            </div>
                                                            <div className="mt-2">
                                                                <p>{`${createDate.getFullYear().toString()}-${(createDate.getMonth() + 1).toString().padStart(2, 0)}-${createDate.getDate().toString().padStart(2, 0)}`}  {createDate.toLocaleTimeString('it-IT')}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-2 sm:mt-1 border rounded-lg border-gray-900/10 p-2 pb-5">
                                                    <p className="text-base font-semibold leading-7 text-gray-900">訂單狀態</p>
                                                    <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                                                        <div className="col-span-full">
                                                            <label htmlFor="is_paid" className="block text-sm font-medium leading-6 text-gray-900">
                                                                付款狀態
                                                            </label>
                                                            <div className="mt-2">
                                                                <select
                                                                    value={tempData.is_paid}
                                                                    onChange={handleChange}
                                                                    id="is_paid"
                                                                    name="is_paid"
                                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                >
                                                                    <option value={true}>已付款</option>
                                                                    <option value={false}>尚未付款</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-span-full">
                                                            <label htmlFor="deliver_status" className="block text-sm font-medium leading-6 text-gray-900">
                                                                外送狀態
                                                            </label>
                                                            <div className="mt-2">
                                                                <select
                                                                    value={tempData?.deliver_status === undefined ? 0 : tempData.deliver_status}
                                                                    onChange={handleChange}
                                                                    id="deliver_status"
                                                                    name="deliver_status"
                                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                >
                                                                    <option value={0}>未確認</option>
                                                                    <option value={1}>已確認</option>
                                                                    <option value={2}>外送中</option>
                                                                    <option value={3}>已送達</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-span-full">
                                                            <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
                                                                訂單備註
                                                            </label>
                                                            <div className="mt-2">
                                                                <textarea
                                                                    onChange={handleChange} defaultValue={tempData.comment}
                                                                    id="comment" name="comment" rows={3}
                                                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coffee-600 sm:text-sm sm:leading-6" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            onClick={submit}
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-coffee-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-coffee-500 sm:ml-3 sm:w-auto"
                                        >
                                            儲存
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => {
                                                setModalMessage('')
                                                closeModal()
                                            }}
                                            ref={cancelButtonRef}
                                        >
                                            取消
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root >
    )
}
export default OrderModal