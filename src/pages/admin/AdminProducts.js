import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductMoadal from '../../components/ProductModal';
import DeleteModal from '../../components/DeleteModal';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';
import { MessageContext, handleErrorMessage } from '../../store/messageStore';
import { useContext } from 'react';

function AdminProducts() {
    const [products, setProducts] = useState([])
    const [pagination, setPagination] = useState({})
    const [isProductModalActive, setIsProductModalActive] = useState(false);
    const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
    const [type, setType] = useState('create') //create or edit
    const [tempProduct, setTempProduct] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const [, dispatch] = useContext(MessageContext)

    useEffect(() => {
        getProducts()
    }, [])

    const openProductModal = (type, product) => {
        setType(type)
        setTempProduct(product)
        setIsProductModalActive(true)
    }
    const closeProductModal = () => {
        setIsProductModalActive(false)
    }
    const openDeleteModal = (product) => {
        setTempProduct(product)
        setIsDeleteModalActive(true)
    }
    const closeDeleteModal = () => {
        setIsDeleteModalActive(false)
    }

    const getProducts = async (page = 1) => {
        setIsLoading(true)
        const productsRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`)
        setProducts(productsRes.data.products)
        setPagination(productsRes.data.pagination)
        setIsLoading(false)
    }

    const deleteProduct = async (id) => {
        try {
            setIsLoading(true)
            const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`)
            if (res.data.success) {
                getProducts()
                closeDeleteModal()
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            closeDeleteModal()
            handleErrorMessage(dispatch, error)
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-white rounded-lg p-[28px]">
            <Loading isLoading={isLoading} />
            <ProductMoadal
                isProductModalActive={isProductModalActive}
                closeProductModal={closeProductModal}
                getProducts={getProducts}
                type={type}
                tempProduct={tempProduct}
            />
            <DeleteModal
                isDeleteModalActive={isDeleteModalActive}
                closeDeleteModal={closeDeleteModal}
                text={tempProduct.title}
                handleDelete={deleteProduct}
                id={tempProduct.id}
            />
            <div className='lg:flex lg:justify-between lg:align-center mb-[20px]'>
                <h2 className="font-bold text-lg mb-2 lg:mb-0">產品列表</h2>
                <button onClick={() => openProductModal('create', {})} type="button"
                    className='border border-blue-400 bg-blue-400 rounded-lg px-2 py-1 text-white'>
                    + 新增商品
                </button>
            </div>
            <div className="table__wrapper min-w-[295px]">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="row">名稱</th>
                            <th scope="col">分類</th>
                            <th scope="col">售價</th>
                            <th scope="col">狀態</th>
                            <th scope="col">動作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 && <tr><th scope="row" colSpan={5} style={{ textAlign: 'center' }} className="font-normal">目前無商品</th></tr>}
                        {products.map((product) => {
                            return (
                                <tr key={product.id}>
                                    <th scope="row" className="font-normal">{product.title}</th>
                                    <td data-header="分類"><div>{product.category}</div></td>
                                    <td data-header="售價"><div>{product.price}</div></td>
                                    <td data-header="狀態"><div>{product.is_enabled ? '啟用' : '未啟用'}</div></td>
                                    <td data-header="動作">
                                        <div>
                                            <button type="button"
                                                onClick={() => openProductModal('edit', product)}
                                                className='mr-2 border border-blue-400 hover:bg-blue-100 rounded-lg px-2 py-1 text-blue-400'>
                                                編輯
                                            </button>
                                            <button type="button"
                                                onClick={() => openDeleteModal(product)}
                                                className='border border-red-400 hover:bg-red-100 rounded-lg px-2 py-1 text-red-400'>
                                                刪除
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <Pagination pagination={pagination} changePage={getProducts} />
        </div>
    )
}
export default AdminProducts;