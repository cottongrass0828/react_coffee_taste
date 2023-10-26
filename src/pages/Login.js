import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

function Login() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        username: '',
        password: ''
    })
    const [loginState, setLoginState] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const submit = async () => {
        try {
            setIsLoading(true)
            const res = await axios.post(`/v2/admin/signin`, data)
            const { token, expired } = res.data
            if (res.data.success) {
                navigate('/admin/products')
            }
            document.cookie = `hexToken = ${token}; expires = ${new Date(expired)}`;
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setLoginState(error.response.data)
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <Loading isLoading={isLoading} />
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-28 w-auto rounded-lg" src="/logo200.png" alt="Coffee Taste" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">管理員登入</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className={`rounded-lg overflow-hidden max-w-sm bg-red-100 mb-2 ${loginState.message ? 'block' : 'hidden'}`}>
                    <div className="p-4">
                        <p className="text-red-400">{loginState.message}</p>
                    </div>
                </div>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email
                        </label>
                        <div className="mt-2">
                            <input onChange={handleChange} id="email" name="username" type="email" autoComplete="email" required
                                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coffee-400 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            密碼
                        </label>
                        <div className="mt-2">
                            <input onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required
                                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coffee-400 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button onClick={submit} type="button"
                            className="flex w-full justify-center rounded-md bg-coffee-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-coffee-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coffee-400">
                            登入
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login;