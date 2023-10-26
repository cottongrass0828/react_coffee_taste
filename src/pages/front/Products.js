import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../../components/Pagination';
import { Link } from 'react-router-dom';

function Products() {
    const [products, setProducts] = useState([])
    const [pagination, setPagination] = useState({})

    const getProducts = async (page = 1) => {
        const productsRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`)
        console.log(productsRes);
        setProducts(productsRes.data.products)
        setPagination(productsRes.data.pagination)
    }
    useEffect(() => {
        getProducts()
    }, [])
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">所有商品</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
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
            <Pagination pagination={pagination} changePage={getProducts} />
        </div>
    )
}

export default Products