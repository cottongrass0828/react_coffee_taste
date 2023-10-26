import { useEffect, useState } from 'react';
import axios from 'axios';
import CouponModal from '../../components/CouponModal';
import DeleteModal from '../../components/DeleteModal';
import Pagination from '../../components/Pagination';

function AdminCoupons() {
    const [coupons, setCoupons] = useState([])
    const [pagination, setPagination] = useState({})
    const [isModalActive, setIsModalActive] = useState(false);
    const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
    const [type, setType] = useState('create') //create or edit
    const [tempCoupon, setTempCoupon] = useState({})

    useEffect(() => {
        getCoupons()
    }, [])

    const openCouponModal = (type, item) => {
        setType(type)
        setTempCoupon(item)
        setIsModalActive(true)
    }
    const closeModal = () => {
        setIsModalActive(false)
    }
    const openDeleteModal = (item) => {
        setTempCoupon(item)
        setIsDeleteModalActive(true)
    }
    const closeDeleteModal = () => {
        setIsDeleteModalActive(false)
    }

    const getCoupons = async (page = 1) => {
        const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons?page=${page}`)
        setCoupons(res.data.coupons)
        setPagination(res.data.pagination)
    }

    const deleteCoupon = async (id) => {
        try {
            const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${id}`)
            if (res.data.success) {
                getCoupons()
                closeDeleteModal()
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-white rounded-lg p-[28px]">
            <CouponModal
                isModalActive={isModalActive}
                closeModal={closeModal}
                getCoupons={getCoupons}
                type={type}
                tempCoupon={tempCoupon}
            />
            <DeleteModal
                isDeleteModalActive={isDeleteModalActive}
                closeDeleteModal={closeDeleteModal}
                text={tempCoupon.title}
                handleDelete={deleteCoupon}
                id={tempCoupon.id}
            />
            <div className='lg:flex lg:justify-between lg:align-center mb-[20px]'>
                <h2 className="font-bold text-lg mb-2 lg:mb-0">優惠券列表</h2>
                <button onClick={() => openCouponModal('create', {})} type="button"
                    className='border border-blue-400 bg-blue-400 rounded-lg px-2 py-1 text-white'>
                    + 新增優惠券
                </button>
            </div>
            <div className="table__wrapper min-w-[295px]">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="row">標題</th>
                            <th scope="col">折扣</th>
                            <th scope="col">到期日</th>
                            <th scope="col">優惠碼</th>
                            <th scope="col">狀態</th>
                            <th scope="col">動作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map((coupon) => {
                            return (
                                <tr key={coupon.id}>
                                    <th scope="row" className="font-normal">{coupon.title}</th>
                                    <td data-header="折扣"><div>{coupon.percent}</div></td>
                                    <td data-header="到期日"><div>{new Date(coupon.due_date).toDateString()}</div></td>
                                    <td data-header="優惠碼"><div>{coupon.code}</div></td>
                                    <td data-header="狀態"><div>{coupon.is_enabled ? '啟用' : '未啟用'}</div></td>
                                    <td data-header="動作">
                                        <div>
                                            <button type="button"
                                                onClick={() => openCouponModal('edit', coupon)}
                                                className='mr-2 border border-blue-400 hover:bg-blue-100 rounded-lg px-2 py-1 text-blue-400'>
                                                編輯
                                            </button>
                                            <button type="button"
                                                onClick={() => openDeleteModal(coupon)}
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
            <Pagination pagination={pagination} changePage={getCoupons}/>
        </div>
    )
}
export default AdminCoupons;