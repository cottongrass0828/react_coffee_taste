import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { MessageContext, handleSuccessMessage } from '../store/messageStore'
import { PhotoIcon } from '@heroicons/react/24/outline'

function ArticleMoadal({
    isModalActive,
    closeModal,
    getArticles,
    currentPage,
    type,
    tempArticle,
    setIsLoading }) {

    const initData = {
        author: '',
        create_at: 123455,
        description: '',
        id: '',
        content: '',
        image: '',
        isPublic: false,
        tag: [],
        title: '',
        num: 0,
    }

    const [tempData, setTempData] = useState(initData)

    const [modalMessage, setModalMessage] = useState('')

    const [, dispatch] = useContext(MessageContext)


    const [createDate, setCreateDate] = useState(new Date())

    useEffect(() => {
        setTempData(initData)
        setModalMessage('')
        if (type === 'edit') {
            getArticle(tempArticle.id)
            setCreateDate(new Date(tempArticle.create_at))
        }
    }, [type, tempArticle])

    const getArticle = async (id) => {
        setIsLoading(true)
        const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/article/${id}`)
        setTempData((preData) => ({ ...preData, ...res.data.article }))
        setIsLoading(false)
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        let data;
        if (name === 'tag') {
            data = value.split(',')
        } else if (name === 'isPublic') {
            data = e.target.checked
        } else {
            data = value
        }
        setTempData({ ...tempData, [name]: data })
    }

    const submit = async () => {
        try {
            setIsLoading(true)
            let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/article`
            let method = 'post'
            if (type === 'edit') {
                api += `/${tempArticle.id}`
                method = 'put'
            }
            const t_tag = tempData.tag
            const res = await axios[method](api, {
                data: {
                    ...tempData, tag: t_tag.map(s => s.trim()), create_at: new Date().getTime()
                }
            })
            handleSuccessMessage(dispatch, res)
            getArticles(currentPage)
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
                                            {type === 'create' ? '建立新文章' : `編輯 ${tempData.title}`}
                                        </Dialog.Title>
                                        <div className={`mt-5 sm:mt-4 w-full rounded-lg overflow-hidden bg-red-100 mb-2 ${modalMessage ? 'block' : 'hidden'}`}>
                                            <div className="p-4">
                                                <p className="text-red-400">儲存失敗：{modalMessage}</p>
                                            </div>
                                        </div>
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-5 sm:mt-4 sm:mr-2">
                                                <div className="border rounded-lg border-gray-900/10 p-2 pb-5">
                                                    <p className="text-base font-semibold leading-7 text-gray-900">圖片</p>
                                                    {tempData.image === '' ? <PhotoIcon className="text-gray-400 w-1/2 mx-auto" /> : <img src={tempData.image} alt='圖片網址' className='block rounded-md mx-auto h-[200px]' />}
                                                    <label htmlFor="image" className="mt-6 block text-sm font-medium leading-6 text-gray-900">
                                                        文章圖片連結
                                                    </label>
                                                    <div className="mt-2">
                                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                            <input type="text" onChange={handleChange} value={tempData.image} name="image" id="image" placeholder="請輸入圖片連結" className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
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
                                                                        onChange={handleChange} checked={tempData.isPublic}
                                                                        id="isPublic"
                                                                        name="isPublic"
                                                                        type="checkbox"
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-coffee-600 accent-coffee-600"
                                                                    />
                                                                </div>
                                                                <div className="text-sm leading-6">
                                                                    <label htmlFor="isPublic" className="font-medium text-gray-900">
                                                                        是否發佈
                                                                    </label>
                                                                    <p className="text-gray-500">打勾即為發佈。</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                </div>
                                                <div className="mt-2 sm:mt-1 border rounded-lg border-gray-900/10 p-2 pb-5">
                                                    <p className="text-base font-semibold leading-7 text-gray-900">文章分類</p>
                                                    <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                                                        <div className="sm:col-span-6">
                                                            <label htmlFor="tag" className="block text-sm font-medium leading-6 text-gray-900">
                                                                標籤
                                                            </label>
                                                            <div className="mt-2">
                                                                <input
                                                                    onChange={handleChange} value={tempData?.tag.toString()}
                                                                    type="text"
                                                                    name="tag"
                                                                    id="tag"
                                                                    placeholder='請輸入標籤，多個標籤可用半形逗號(,)區隔'
                                                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coffee-600 sm:text-sm sm:leading-6"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grow mt-5 sm:mt-4 sm:ml-2">
                                                <div className="border rounded-lg border-gray-900/10 p-2 pb-5">
                                                    <p className="text-base font-semibold leading-7 text-gray-900">文章內容</p>
                                                    <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                                                        <div className="sm:col-span-6">
                                                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                                                標題
                                                            </label>
                                                            <div className="mt-2">
                                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                                                    <input onChange={handleChange} value={tempData.title} type="text" name="title" id="title" className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="請輸入文章標題" />                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-6">
                                                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                                                描述
                                                            </label>
                                                            <div className="mt-2">
                                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                                                    <input onChange={handleChange} value={tempData.description} type="text" name="description" id="description" className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="請輸入文章描述" />                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-span-full">
                                                            <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                                                                內文
                                                            </label>
                                                            <div className="mt-2">
                                                                <textarea
                                                                    onChange={handleChange} defaultValue={tempData.content}
                                                                    id="content" name="content" rows={3}
                                                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coffee-600 sm:text-sm sm:leading-6" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-2 sm:mt-1 border rounded-lg border-gray-900/10 p-2 pb-5">
                                                    <p className="text-base font-semibold leading-7 text-gray-900">建立資訊</p>
                                                    <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                                                        <div className="sm:col-span-3">
                                                            <label htmlFor="author" className="block text-sm font-medium leading-6 text-gray-900">
                                                                作者
                                                            </label>
                                                            <div className="mt-2">
                                                                <input
                                                                    onChange={handleChange} value={tempData.author}
                                                                    type="text"
                                                                    name="author"
                                                                    id="author"
                                                                    placeholder='請輸入作者'
                                                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coffee-600 sm:text-sm sm:leading-6"
                                                                />
                                                            </div>
                                                        </div>
                                                        {type === 'edit' &&
                                                            <div className="sm:col-span-3">
                                                                <label htmlFor="create_at"
                                                                    className="block text-sm font-medium leading-6 text-gray-900">
                                                                    上次更新時間
                                                                </label>
                                                                <div className="mt-2">
                                                                    <small>{`${createDate.getFullYear().toString()}-${(createDate.getMonth() + 1).toString().padStart(2, 0)}-${createDate.getDate().toString().padStart(2, 0)}`}  {createDate.toLocaleTimeString('it-IT')}</small>
                                                                </div>
                                                            </div>
                                                        }
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
        </Transition.Root>
    )
}
export default ArticleMoadal
