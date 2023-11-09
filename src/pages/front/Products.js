import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import Loading from '../../components/Loading';

function Products() {
    const [products, setProducts] = useState([])
    const pageData = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    // 於外部事件監聽無法獲得最即時的 isLoading 資料，並沒有刷新狀態，所以要改用傳參考
    const isLoadingRef = useRef(false)

    const getProducts = async (page, isNew) => {
        isLoadingRef.current = true
        setIsLoading(true)
        const productsRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`)
        console.log(productsRes);
        // setProducts([...products, ...productsRes.data.products])
        //由於外部事件無法非常即時的取得當前數值，所以要改用
        setProducts((preData) => {
            if (isNew) {
                return [...productsRes.data.products]
            } else {
                return [...preData, ...productsRes.data.products]
            }
        })
        pageData.current = productsRes.data.pagination
        setTimeout(() => {
            isLoadingRef.current = false
            setIsLoading(false)
        }, 1000)
    }

    const productsRef = useRef(null)
    useEffect(() => {
        getProducts(1, true)

        const scrollEvent = () => {
            const height = (productsRef.current?.offsetHeight + productsRef.current?.offsetTop) - window.innerHeight;
            if (!isLoadingRef.current && window.scrollY > height) {
                if (pageData.current.has_next) {
                    getProducts(pageData.current.current_page + 1, false)
                }
            }
        }

        //滾動監聽
        window.addEventListener('scroll', scrollEvent)
        return () => window.removeEventListener('scroll', scrollEvent)
    }, [])

    useEffect(() => {
        const body = document.querySelector('body')
        if (isLoading) {
            body.style.overflow = 'hidden'
        } else {
            body.style.overflow = 'auto'
        }
    }, [isLoading])

    return (
        <div className="bg-white" ref={productsRef}>
            <Loading isLoading={isLoading} />
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">所有商品</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 h-80">
                                <img
                                    src={product.imageUrl}
                                    alt={product.id}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <Link to={`/product/${product.id}`}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.title}</Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">NT$ {product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Products