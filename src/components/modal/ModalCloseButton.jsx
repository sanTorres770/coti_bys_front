export default function ModalCloseButton({closeFunction}) {
    return (

        <button type='button' onClick={() => closeFunction()}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-square-x rounded-xl hover:bg-gray-500" width="40"
                 height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none"
                 strokeLinecap="round"  strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"/>
                <path d="M10 10l4 4m0 -4l-4 4"/>
            </svg>
        </button>
    )
}