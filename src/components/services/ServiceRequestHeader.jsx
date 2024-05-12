import FilterFieldsHeader from "./FilterFieldsHeader.jsx";

export default function ServiceRequestHeader({isAdmin}) {


    const customerField = () => {
        return <div className='md:px-5 sm:p-6 py-3 px-2 border-r-2 border-gray-600 md:w-1/5 md:block sm:block hidden'>
            <p className="flex flex-wrap justify-center w-full h-full content-center">
                Cliente
            </p>
        </div>
    }

    return (

        <>

            <FilterFieldsHeader></FilterFieldsHeader>


            <div className='flex w-full rounded-md mt-5 text-xs text-center font-bold text-gray-500 border-b-4 border-gray-500 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <div className='md:px-5 sm:p-6 py-3 px-2 border-r-2 border-gray-600 md:w-1/5'>
                    <p className="flex flex-wrap justify-center w-full h-full content-center">
                        Id Servicio
                    </p>
                </div>
                <div className='md:px-5 sm:p-6 py-3 px-1 border-r-2 border-gray-600 md:w-1/5'>
                    <p className="flex flex-wrap justify-center w-full h-full content-center">
                        Fecha y hora de solicitud
                    </p>
                </div>

                {isAdmin && (customerField())}

                <div className='md:px-5 sm:p-6 py-3 px-2 border-r-2 border-gray-600 md:w-1/5 md:block sm:block hidden'>
                    <p className="flex flex-wrap justify-center w-full h-full content-center">
                        Estado
                    </p>
                </div>
                <div className='md:px-5 sm:p-6 py-3 px-2 border-r-2 border-gray-600 md:w-1/5 md:block sm:block hidden'>
                    <p className="flex flex-wrap justify-center w-full h-full content-center">
                        Progreso
                    </p>
                </div>
                <div className='md:px-5 sm:p-6 py-3 px-2 border-r-2 border-gray-600 md:w-1/5'>
                    <p className="flex flex-wrap justify-center w-full h-full content-center ">
                        Revisar
                    </p>
                </div>
            </div>

        </>

    )
}