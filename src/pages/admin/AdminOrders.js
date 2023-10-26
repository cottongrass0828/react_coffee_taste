import { useEffect, useState } from 'react';
import axios from 'axios';
import OrderModal from '../../components/OrderModal';
import DeleteModal from '../../components/DeleteModal';
import Pagination from '../../components/Pagination';

function AdminOrders() {
    const [orders, setOrders] = useState([])
    const [pagination, setPagination] = useState({})
    const [isModalActive, setIsModalActive] = useState(false);
    const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
    const [type, setType] = useState('create') //create or edit
    const [tempOrder, setTempOrder] = useState({})

    useEffect(() => {
        getOrders()
    }, [])

    const openOrderModal = (type, item) => {
        setType(type)
        setTempOrder(item)
        setIsModalActive(true)
    }
    const closeModal = () => {
        setIsModalActive(false)
    }
    const openDeleteModal = (item) => {
        setTempOrder(item)
        setIsDeleteModalActive(true)
    }
    const closeDeleteModal = () => {
        setIsDeleteModalActive(false)
    }
    const getOrders = async (page = 1) => {
        const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`)
        setOrders(res.data.orders)
        setPagination(res.data.pagination)
    }
    const deleteOrder = async (id) => {
        try {
            const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${id}`)
            if (res.data.success) {
                getOrders()
                closeDeleteModal()
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-white rounded-lg p-[28px]">
            <OrderModal
                isModalActive={isModalActive}
                closeModal={closeModal}
                getOrders={getOrders}
                type={type}
                tempOrder={tempOrder}
            />
            <DeleteModal
                isDeleteModalActive={isDeleteModalActive}
                closeDeleteModal={closeDeleteModal}
                text={tempOrder.title}
                handleDelete={deleteOrder}
                id={tempOrder.id}
            />
            <div className='lg:flex lg:justify-between lg:align-center mb-[20px]'>
                <h2 className="font-bold text-lg mb-2 lg:mb-0">訂單列表</h2>
            </div>
            <div className="table__wrapper min-w-[295px]">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="row">訂單編號</th>
                            <th scope="col">消費者</th>
                            <th scope="col">訂單金額</th>
                            <th scope="col">付款狀態</th>
                            <th scope="col">付款日期</th>
                            <th scope="col">留言備註</th>
                            <th scope="col">動作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            return (
                                <tr key={order.id}>
                                    <th scope="row" className="font-normal">{order.id}</th>
                                    <td data-header="消費者"><div>{order.user.email}</div></td>
                                    <td data-header="訂單金額"><div>{order.code}</div></td>
                                    <td data-header="付款狀態"><div>{order.is_paid ? '啟用' : '未啟用'}</div></td>
                                    <td data-header="付款日期"><div>{new Date(order.create_at).toDateString()}</div></td>
                                    <td data-header="留言備註"><div>{order.message}</div></td>
                                    <td data-header="動作">
                                        <div>
                                            <button type="button"
                                                onClick={() => openOrderModal('edit', order)}
                                                className='mr-2 border border-blue-400 hover:bg-blue-100 rounded-lg px-2 py-1 text-blue-400'>
                                                編輯
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <Pagination pagination={pagination} changePage={getOrders} />
        </div>
    )
}
export default AdminOrders;