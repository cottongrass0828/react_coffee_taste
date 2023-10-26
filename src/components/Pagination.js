import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
function Pagination({ pagination, changePage }) {
    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white py-3">
            <div className="flex flex-1 justify-between sm:hidden">
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault()
                        changePage(pagination.current_page - 1)
                    }}
                    className={`${pagination.has_pre ? 'hover:bg-gray-50' : 'pointer-events-none bg-gray-100'} relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 `}
                >
                    Previous
                </a>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault()
                        changePage(pagination.current_page + 1)
                    }}
                    className={`${pagination.has_next ? 'hover:bg-gray-50' : 'pointer-events-none bg-gray-100'} relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end">
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                changePage(pagination.current_page - 1)
                            }}
                            className={`${pagination.has_pre ? 'hover:bg-gray-50' : 'pointer-events-none bg-gray-100'} relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 `}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </a>
                        {[...new Array(pagination.total_pages)].map((_, i) => (
                            <a
                                key={`${i}_page`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    changePage(i + 1)
                                }}
                                href="#"
                                className={`${i + 1 === pagination.current_page ? 'z-10 bg-coffee-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coffee-600' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'} relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20`}
                            >
                                {i + 1}
                            </a>
                        ))}
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                changePage(pagination.current_page + 1)
                            }}
                            className={`${pagination.has_next ? 'hover:bg-gray-50' : 'pointer-events-none bg-gray-100'} relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    )
}
export default Pagination