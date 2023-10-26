import ReactLoading from 'react-loading';
function Loading({ isLoading }) {
    return (
        <>
            {isLoading && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'rgba(255,255,255,0.5)',
                        zIndex: 10000,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backdropFilter: 'blur(5px)'
                    }}
                >
                    <ReactLoading type="bubbles" color='#f2984e' height={60} width={100} />
                </div>
            )}
        </>
    )
}

export default Loading