import ModalCloseButton from "./ModalCloseButton.jsx";
import InputForm from "../layout/InputForm.jsx";

export default function ModalLayout({closeFunction, title, children, height, width}) {
    return (
        <>

            <div className='flex justify-between items-center mb-5'>
                <h2 className='text-lg font-bold w-2/3'>{title ? title : null}</h2>

                <ModalCloseButton closeFunction={closeFunction ? closeFunction : null}/>

            </div>

            <div className={`flex justify-center items-center ${height ? height : 'h-72'} w-auto rounded bg-gray-900 shadow-md shadow-gray-900 m-2`}>

                {children}

            </div>

        </>
    )
}