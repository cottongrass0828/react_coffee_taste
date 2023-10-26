
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import Input from '../../components/FormElement'
import axios from 'axios'
function Checkout() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onTouched'
    })

    const onSubmit = async (data) => {
        const { name, email, tel, address } = data
        const formData = {
            data: {
                user: { name, email, tel, address },
            }
        }
        try {
            const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/order`, formData)
            navigate('/success');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="flex justify-center items-center h-16 bg-coffee-800">
                <img
                    className="h-8 w-auto rounded-lg"
                    src="/logo200.png"
                    alt="logo"
                />
            </div>
            <div className="">
                <div className="flex justify-center items-center 2xl:container 2xl:mx-auto lg:py-16 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44">
                    <div className="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-center items-center lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
                        <div className="flex w-full flex-col justify-start items-start">
                            <div className="">
                                <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">結帳資訊</p>
                            </div>
                            <div className="mt-3">
                                <Link to='/products' className="hover:text-gray-800 text-gray-600">
                                    <ChevronLeftIcon className="inline h-5 w-5 mr-1" /><span className="text-base leading-4 underline ">繼續選購</span>
                                </Link>
                            </div>
                            <div className="mt-12">
                                <p className="text-xl font-semibold leading-5 text-gray-800">外送資料</p>
                            </div>
                            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                                <div className='mt-8 flex flex-col justify-start items-start w-full space-y-8'>
                                    <Input
                                        register={register}
                                        errors={errors}
                                        id={'email'}
                                        rules={{
                                            required: { value: true, message: 'Email 為必填' },
                                            pattern: { value: /^\S+@\S+$/i, message: 'Email 格式有誤' }
                                        }}
                                        labelText={'Email'}
                                    ></Input>
                                    <Input
                                        register={register}
                                        errors={errors}
                                        id={'name'}
                                        rules={{ required: { value: true, message: '收件人姓名 為必填' } }}
                                        labelText={'收件人姓名'}
                                    ></Input>
                                    <Input
                                        register={register}
                                        errors={errors}
                                        id={'tel'}
                                        rules={{
                                            required: { value: true, message: '收件人聯絡電話 為必填' },
                                            minLength: { value: 10, message: '聯絡電話 最少為 10 碼' },
                                            maxLength: { value: 10, message: '聯絡電話 最多為 10 碼' }
                                        }}
                                        labelText={'收件人聯絡電話(僅台灣)'}
                                    ></Input>
                                    <Input
                                        register={register}
                                        errors={errors}
                                        id={'address'}
                                        rules={{ required: { value: true, message: '外送地址 為必填' } }}
                                        labelText={'外送地址'}
                                    ></Input>
                                </div>
                                <button type='submit' className="focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:ring-offset-2 mt-8 rounded-md border-transparent shadow-sm  text-base font-medium focus:ring-2 focus:ring-ocus:ring-coffee-800 leading-4 hover:bg-coffee-700 py-3 w-full md:w-4/12 lg:w-full text-white bg-coffee-600">送出訂單</button>
                            </form>
                        </div>

                        <div className="flex flex-col justify-start items-start bg-gray-50 w-full p-6 md:p-14">
                            <div>
                                <h1 className="text-2xl font-semibold leading-6 text-gray-800">選購商品</h1>
                            </div>
                            <div className="flex mt-7 flex-col items-end w-full space-y-6">
                                <div className="flex justify-between w-full items-center">
                                    <p className="text-lg leading-4 text-gray-600">Total items</p>
                                    <p className="text-lg font-semibold leading-4 text-gray-600">20</p>
                                </div>
                                <div className="flex justify-between w-full items-center">
                                    <p className="text-lg leading-4 text-gray-600">Total Charges</p>
                                    <p className="text-lg font-semibold leading-4 text-gray-600">$2790</p>
                                </div>
                                <div className="flex justify-between w-full items-center">
                                    <p className="text-lg leading-4 text-gray-600">Shipping charges</p>
                                    <p className="text-lg font-semibold leading-4 text-gray-600">$90</p>
                                </div>
                                <div className="flex justify-between w-full items-center">
                                    <p className="text-lg leading-4 text-gray-600">Sub total</p>
                                    <p className="text-lg font-semibold leading-4 text-gray-600">$3520</p>
                                </div>
                            </div>
                            <div className="flex justify-between w-full items-center mt-32">
                                <p className="text-xl font-semibold leading-4 text-gray-800">總金額</p>
                                <p className="text-lg font-semibold leading-4 text-gray-800">$2900</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Checkout