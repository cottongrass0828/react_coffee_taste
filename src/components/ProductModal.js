import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { MessageContext, handleSuccessMessage } from '../store/messageStore'
import { useForm } from "react-hook-form"
import Input from './FormElement'

function ProductMoadal({ isProductModalActive, closeProductModal, getProducts, type, tempProduct }) {
    const [tempData, setTempData] = useState({
        title: '',
        category: '',
        origin_price: 0,
        price: 0,
        unit: '',
        description: '',
        content: '',
        is_enabled: 1,
        imageUrl: '',
        imagesUrl: []
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onTouched'
    })

    const [, dispatch] = useContext(MessageContext)

    useEffect(() => {
        if (type === 'create') {
            setTempData({
                title: '',
                category: '',
                origin_price: 0,
                price: 0,
                unit: '',
                description: '',
                content: '',
                is_enabled: 1,
                imageUrl: '',
                imagesUrl: []
            })
        } else if (type === 'edit') {
            setTempData(tempProduct)
        }
    }, [type, tempProduct])

    const handleChange = (e) => {
        // const { value, name } = e.target;
        // let data;
        // if (['price', 'origin_price'].includes(name)) {
        //     data = Number(value)
        // } else if (name === 'is_enabled') {
        //     data = +e.target.checked
        // } else {
        //     data = value
        // }
        // setTempData({ ...tempData, [name]: data })
    }

    // const submit = async () => {
    //     try {
    //         let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`
    //         let method = 'post'
    //         if (type === 'edit') {
    //             api += `/${tempProduct.id}`
    //             method = 'put'
    //         }
    //         const res = await axios[method](api, { data: tempData })
    //         handleSuccessMessage(dispatch, res)
    //         getProducts()
    //         closeProductModal()
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    const onSubmit = async (data) => {
        console.log({ data });
        try {
            let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`
            let method = 'post'
            if (type === 'edit') {
                api += `/${tempProduct.id}`
                method = 'put'
            }
            const res = await axios[method](api, { data })
            handleSuccessMessage(dispatch, res)
            getProducts()
            closeProductModal()
        } catch (error) {
            console.log(error);
        }
    }

    const cancelButtonRef = useRef(null)
    return (
        <Transition.Root show={isProductModalActive} as={Fragment}>
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
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                                            {type === 'create' ? '建立新商品' : `編輯 ${tempData.title}`}
                                        </Dialog.Title>
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-5 sm:mt-4 sm:mr-2">
                                                <div className="border rounded-lg border-gray-900/10 p-2 pb-5">
                                                    <p className="text-base font-semibold leading-7 text-gray-900">圖片</p>
                                                    <img src="" alt='' className='' />
                                                    <label htmlFor="image" className="mt-6 block text-sm font-medium leading-6 text-gray-900">
                                                        輸入圖片網址
                                                    </label>
                                                    <div className="mt-2">
                                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                            <input type="text" name="imageUrl" id="image" placeholder="請輸入圖片連結" className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-2 sm:mt-1 border rounded-lg border-gray-900/10 p-2 pb-5">
                                                    <fieldset>
                                                        <legend className="text-base font-semibold leading-7 text-gray-900">狀態</legend>
                                                        <div className="mt-6">
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
                                                    </fieldset>
                                                </div>
                                                <div className="mt-2 sm:mt-1 border rounded-lg border-gray-900/10 p-2 pb-5">
                                                    <p className="text-base font-semibold leading-7 text-gray-900">商品細節</p>
                                                    <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                                                        <div className="sm:col-span-3">
                                                            <Input
                                                                register={register}
                                                                errors={errors}
                                                                id={'category'}
                                                                rules={{
                                                                    required: { value: true, message: '分類 為必填' }
                                                                }}
                                                                labelText={'分類'}
                                                                placeholder={'請輸入分類'}
                                                                labelClass={'block text-sm font-medium leading-6 text-gray-900'}
                                                                inputClass={'mt-2 block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coffee-600 sm:text-sm sm:leading-6'}
                                                            ></Input>
                                                            {/* <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                                                分類
                                                            </label>
                                                            <div className="mt-2">
                                                                <input
                                                                    onChange={handleChange} value={tempData.category}
                                                                    type="text"
                                                                    name="category"
                                                                    id="category"
                                                                    placeholder='請輸入分類'
                                                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coffee-600 sm:text-sm sm:leading-6"
                                                                />
                                                            </div> */}
                                                        </div>
                                                        <div className="sm:col-span-3">
                                                            <Input
                                                                register={register}
                                                                errors={errors}
                                                                id={'category'}
                                                                rules={{
                                                                    required: { value: true, message: '分類 為必填' }
                                                                }}
                                                                labelText={'分類'}
                                                                placeholder={'請輸入分類'}
                                                                labelClass={'block text-sm font-medium leading-6 text-gray-900'}
                                                                inputClass={'mt-2 block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coffee-600 sm:text-sm sm:leading-6'}
                                                            ></Input>
                                                            {/* <label htmlFor="unit" className="block text-sm font-medium leading-6 text-gray-900">
                                                                單位
                                                            </label>
                                                            <div className="mt-2">
                                                                <input
                                                                    onChange={handleChange} value={tempData.unit}
                                                                    type="text"
                                                                    name="unit"
                                                                    id="unit"
                                                                    placeholder='請輸入單位'
                                                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coffee-600 sm:text-sm sm:leading-6"
                                                                />
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grow mt-5 sm:mt-4 sm:ml-2">
                                                <div className="border rounded-lg border-gray-900/10 p-2 pb-5">
                                                    <p className="text-base font-semibold leading-7 text-gray-900">商品內容</p>
                                                    <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                                                        <div className="sm:col-span-6">
                                                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                                                商品名稱
                                                            </label>
                                                            <div className="mt-2">
                                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                                    <input onChange={handleChange} value={tempData.title} type="text" name="title" id="title" className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="請輸入商品名稱" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-span-full">
                                                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                                                產品描述
                                                            </label>
                                                            <div className="mt-2">
                                                                <textarea
                                                                    onChange={handleChange} defaultValue={tempData.description}
                                                                    id="description" name="description" rows={3} className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coffee-600 sm:text-sm sm:leading-6" />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-full">
                                                            <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                                                                說明內容
                                                            </label>
                                                            <div className="mt-2">
                                                                <textarea
                                                                    onChange={handleChange} defaultValue={tempData.content}
                                                                    id="content" name="content" rows={3} className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coffee-600 sm:text-sm sm:leading-6" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-2 sm:mt-1 border rounded-lg border-gray-900/10 p-2 pb-5">
                                                    <p className="text-base font-semibold leading-7 text-gray-900">價格</p>
                                                    <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                                                        <div className="sm:col-span-3">
                                                            <label htmlFor="origin_price" className="block text-sm font-medium leading-6 text-gray-900">
                                                                原價
                                                            </label>
                                                            <div className="mt-2">
                                                                <input
                                                                    onChange={handleChange} value={tempData.origin_price}
                                                                    type="number"
                                                                    name="origin_price"
                                                                    id="origin_price"
                                                                    placeholder='請輸入原價'
                                                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coffee-600 sm:text-sm sm:leading-6"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-3">
                                                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                                                售價
                                                            </label>
                                                            <div className="mt-2">
                                                                <input
                                                                    onChange={handleChange} value={tempData.price}
                                                                    type="number"
                                                                    name="price"
                                                                    id="price"
                                                                    placeholder='請輸入售價'
                                                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coffee-600 sm:text-sm sm:leading-6"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="submit"
                                            className="inline-flex w-full justify-center rounded-md bg-coffee-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-coffee-500 sm:ml-3 sm:w-auto"
                                        >
                                            儲存
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={closeProductModal}
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
export default ProductMoadal
