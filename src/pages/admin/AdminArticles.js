import { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleMoadal from '../../components/ArticleModal';
import DeleteModal from '../../components/DeleteModal';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';
import { MessageContext, handleErrorMessage } from '../../store/messageStore';
import { useContext } from 'react';

function AdminArticles() {
    const [articles, setArticles] = useState([])
    const [pagination, setPagination] = useState({})
    const [isModalActive, setIsModalActive] = useState(false);
    const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
    const [type, setType] = useState('create') //create or edit
    const [tempArticle, setTempArticle] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const [, dispatch] = useContext(MessageContext)

    useEffect(() => {
        getArticles()
    }, [])

    const openModal = (type, article) => {
        setType(type)
        setTempArticle(article)
        setIsModalActive(true)
    }
    const closeModal = () => {
        setIsModalActive(false)
    }
    const openDeleteModal = (product) => {
        setTempArticle(product)
        setIsDeleteModalActive(true)
    }
    const closeDeleteModal = () => {
        setIsDeleteModalActive(false)
    }

    const getArticles = async (page = 1) => {
        setIsLoading(true)
        const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/articles?page=${page}`)
        setArticles(res.data.articles)
        setPagination(res.data.pagination)
        setIsLoading(false)
    }

    const deleteArticle = async (id) => {
        try {
            setIsLoading(true)
            const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/article/${id}`)
            if (res.data.success) {
                getArticles(pagination.current_page)
                closeDeleteModal()
            }
        } catch (error) {
            console.log(error);
            closeDeleteModal()
            handleErrorMessage(dispatch, error)
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-white rounded-lg p-[14px] sm:p-[28px] min-w-[325px]">
            <Loading isLoading={isLoading} />
            <ArticleMoadal
                isModalActive={isModalActive}
                closeModal={closeModal}
                getArticles={getArticles}
                type={type}
                tempArticle={tempArticle}
                setIsLoading={setIsLoading}
                currentPage={pagination.current_page}
            />
            <DeleteModal
                isDeleteModalActive={isDeleteModalActive}
                closeDeleteModal={closeDeleteModal}
                text={tempArticle.title}
                handleDelete={deleteArticle}
                id={tempArticle.id}
            />
            <div className='lg:flex lg:justify-between lg:align-center mb-[20px]'>
                <h2 className="font-bold text-lg mb-2 lg:mb-0">文章列表</h2>
                <button onClick={() => openModal('create', {})} type="button"
                    className='border border-blue-400 bg-blue-400 rounded-lg px-2 py-1 text-white'>
                    + 新增文章
                </button>
            </div>
            <div className="table__wrapper min-w-[295px]">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="row">標題</th>
                            <th scope="col">描述</th>
                            <th scope="col">標籤</th>
                            <th scope="col">狀態</th>
                            <th scope="col">更新時間</th>
                            <th scope="col">動作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.length === 0 && <tr><th scope="row" colSpan={6} style={{ textAlign: 'center' }} className="font-normal">目前無文章</th></tr>}
                        {articles.map((article) => {
                            return (
                                <tr key={article.id}>
                                    <th scope="row" className="font-normal">{article.title}</th>
                                    <td data-header="描述"><div>{article.description}</div></td>
                                    <td data-header="標籤"><div>{article.tag?.length > 0 && `#${article.tag.join(' #')}`}</div></td>
                                    <td data-header="狀態"><div>{article.isPublic ? '發佈' : '草稿'}</div></td>
                                    <td data-header="上次更新時間"><div>{new Date(article.create_at).toLocaleDateString('zh-tw', { year: 'numeric', month: '2-digit', day: '2-digit' })} {new Date(article.create_at).toLocaleTimeString('it-IT')}</div></td>
                                    <td data-header="動作">
                                        <div>
                                            <button type="button"
                                                onClick={() => openModal('edit', article)}
                                                className='mr-2 border border-blue-400 hover:bg-blue-100 rounded-lg px-2 py-1 text-blue-400'>
                                                編輯
                                            </button>
                                            <button type="button"
                                                onClick={() => openDeleteModal(article)}
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
            <Pagination pagination={pagination} changePage={getArticles} />
        </div>
    )
}
export default AdminArticles;