import { CheckCircleIcon, XMarkIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { useContext } from 'react'
import { MessageContext, handleClearMessage } from '../store/messageStore'

function Message() {
    const [message, dispatch] = useContext(MessageContext)
    return (
        <div className="w-full px-6 py-5 z-20 fixed flex items-end sm:flex-col pointer-events-none">
            {message.title && (
                <div className="w-full flex justify-center sm:justify-end">
                    <div className="w-full max-w-sm p-4 bg-white shadow-lg rounded-lg">
                        <div className="flex">
                            <div className="shrink-0">
                                {message.type === 'success' ? <CheckCircleIcon className="h-6 w-6 text-green-400 inline-block" /> : <XCircleIcon className="h-6 w-6 text-red-400 inline-block" />}
                            </div>
                            <div className="pt-0.5 flex-1 ml-3">
                                <p className="font-medium text-sm text-gray-900">{message.title}</p>
                                <p className="mt-1 text-sm text-gray-500">{message.text}</p>
                            </div>
                            <div className='shrink-0 flex ml-4'>
                                <button type="button" onClick={() => { handleClearMessage(dispatch) }} className='bg-white rounded-md inline-flex'>
                                    <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-500 inline-block" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

}
export default Message