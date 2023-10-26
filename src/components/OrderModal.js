import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { MessageContext, handleSuccessMessage, handleErrorMessage } from '../store/messageStore'

function OrderModal({ isModalActive, closeModal, getOrders, type, tempOrder }) {
    const [tempData, setTempData] = useState({
        title: '',
        is_enabled: 1,
        percent: 80,
        due_date: 1555459200,
        code: '80off'
    })

    const [, dispatch] = useContext(MessageContext)

    const [date, setDate] = useState(new Date())
    useEffect(() => {
        if (type === 'create') {
            setTempData({
                title: '',
                is_enabled: 1,
                percent: 80,
                due_date: 1555459200,
                code: '80off'
            })
            setDate(new Date())
        } else if (type === 'edit') {
            setTempData(tempOrder)
            setDate(new Date(tempOrder.due_date))
        }
    }, [type, tempOrder])

    const handleChange = (e) => {
        const { value, name } = e.target;
        let data;
        if (name === 'is_enabled') {
            data = +e.target.checked
        } else {
            data = value
        }
        setTempData({ ...tempData, [name]: data })
    }

    const submit = async () => {
        try {
            let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/order`
            let method = 'post'
            if (type === 'edit') {
                api += `/${tempOrder.id}`
                method = 'put'
            }
            const res = await axios[method](api, {
                data: {
                    ...tempData, due_date: date.getTime()
                }
            })
            handleSuccessMessage(dispatch, res)
            getOrders()
            closeModal()
        } catch (error) {
            console.log(error);
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
                                <form>
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                                            {type === 'create' ? '建立新優惠券' : `編輯 ${tempData.title}`}
                                        </Dialog.Title>
                                        <div className="sm:flex sm:items-start">
                                            <div className="grow mt-5 sm:mt-4 sm:ml-2">
                                                <div className="border rounded-lg border-gray-900/10 p-2 pb-5">
                                                    <p className="text-base font-semibold leading-7 text-gray-900">優惠券內容</p>
                                                    <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                                                        <div className="sm:col-span-3">
                                                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                                                標題
                                                            </label>
                                                            <div className="mt-2">
                                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                                                    <input onChange={handleChange} value={tempData.title} type="text" name="title" id="title" className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="請輸入優惠券標題" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-3">
                                                            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">
                                                                優惠碼
                                                            </label>
                                                            <div className="mt-2">
                                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                                                    <input onChange={handleChange} value={tempData.code} type="text" name="code" id="code" className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="請輸入優惠碼" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-3">
                                                            <label htmlFor="percent" className="block text-sm font-medium leading-6 text-gray-900">
                                                                折扣 (%)
                                                            </label>
                                                            <div className="mt-2">
                                                                <input
                                                                    onChange={handleChange} value={tempData.percent}
                                                                    type="number"
                                                                    name="percent"
                                                                    id="percent"
                                                                    placeholder='請輸入扣 (%)'
                                                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coffee-600 sm:text-sm sm:leading-6"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-3">
                                                            <label htmlFor="due_date" className="block text-sm font-medium leading-6 text-gray-900">
                                                                到期日
                                                            </label>
                                                            <div className="mt-2">
                                                                <input
                                                                    onChange={(e) => {
                                                                        setDate(new Date(e.target.value))
                                                                    }}
                                                                    value={`${date.getFullYear().toString()}-${(date.getMonth() + 1).toString().padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`}
                                                                    type="date"
                                                                    name="due_date"
                                                                    id="due_date"
                                                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coffee-600 sm:text-sm sm:leading-6"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-full">
                                                            <div className="relative flex gap-x-3">
                                                                <div className="flex h-6 items-center">
                                                                    <input
                                                                        onChange={handleChange} checked={!!tempData.is_enabled}
                                                                        id="is_enabled"
                                                                        name="is_enabled"
                                                                        type="checkbox"
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-coffee-600 accent-coffee-600"
                                                                    />
                                                                </div>
                                                                <div className="text-sm leading-6">
                                                                    <label htmlFor="is_enabled" className="font-medium text-gray-900">
                                                                        是否啟用
                                                                    </label>
                                                                    <p className="text-gray-500">打勾即為啟用。</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-coffee-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-coffee-500 sm:ml-3 sm:w-auto"
                                            onClick={submit}
                                        >
                                            儲存
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={closeModal}
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
        </Transition.Root>
    )
}
export default OrderModal