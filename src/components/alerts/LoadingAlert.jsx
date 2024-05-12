export default function LoadingAlert() {

    const spinner = <div className="sk-cube-grid">
        <div className="sk-cube sk-cube1"></div>
        <div className="sk-cube sk-cube2"></div>
        <div className="sk-cube sk-cube3"></div>
        <div className="sk-cube sk-cube4"></div>
        <div className="sk-cube sk-cube5"></div>
        <div className="sk-cube sk-cube6"></div>
        <div className="sk-cube sk-cube7"></div>
        <div className="sk-cube sk-cube8"></div>
        <div className="sk-cube sk-cube9"></div>
    </div>

    return (
        <div>
            {spinner}

            <div className='flex justify-center message-div text-center'>
                <h2 className='message-field text-center'>La solicitud de servicio se está generando...</h2>
            </div>

        </div>
    )
}