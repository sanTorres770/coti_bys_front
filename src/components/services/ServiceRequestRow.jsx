import {Link} from "react-router-dom";
import {useServiceRequests} from "../../hooks/useServiceRequests.js";
import {serviceRequestRowConfig} from "../../hooks/serviceRequestRowConfig.js";

export default function ServiceRequestRow({service, isAdmin}) {


    const {service_request_id, request_date, business_name, finished, progress, state} = service
    const {handleServiceSelected} = useServiceRequests();
    const {serviceState, progressColor} = serviceRequestRowConfig()

    const customerField = () => {
        return <div className='md:p-6 sm:p-5 p-1 border-r-2 border-gray-600 md:w-1/5 text-center md:block sm:block hidden'>
            <p className="flex flex-wrap font-medium dark:text-white hover:text-white content-center w-full h-full justify-center">
                {business_name}
            </p>
        </div>
    }

    return (
        <div className='flex justify-between w-full mt-1 rounded-md bg-gray-800 border-b border-gray-700 hover:bg-gray-900'>
            <div className='md:p-6 sm:p-5 p-1 border-r-2 border-gray-600 md:w-1/5 text-center'>
                <p className="flex flex-wrap font-medium dark:text-white hover:text-white content-center w-full h-full justify-center">
                    {service_request_id}
                </p>
            </div>
            <div className='md:p-6 sm:p-5 p-1 border-r-2 border-gray-600 md:w-1/5 text-center'>
                <p className="flex flex-wrap font-medium dark:text-white hover:text-white content-center w-full h-full justify-center">
                    {request_date}
                </p>
            </div>

            {isAdmin && (customerField())}

            <div className='md:p-6 sm:p-5 p-1 border-r-2 border-gray-600 md:w-1/5 text-center md:block sm:block hidden'>
                <p className="flex flex-wrap font-medium dark:text-white hover:text-white content-center w-full h-full justify-center">
                    {serviceState(state)}
                </p>
            </div>
            <div className='md:flex flex-col justify-center md:p-6 sm:p-5 p-1 border-r-2 border-gray-600 md:w-1/5 text-center sm:flex hidden'>
                    <div className='flex flex-col items-center justify-center bg-gray-300 rounded-full'>
                        <div className='absolute text-sm font-bold'>{progress + '%'}</div>
                        <div className='flex flex-col justify-center content-center rounded-full bg-blue-900 h-4 leading-none text-center text-white'
                             style={{width: progress + '%', backgroundColor: progressColor(progress)}}></div>
                    </div>
            </div>
            <div className='px-5 py-5 border-r-2 border-gray-600 md:w-1/5 text-center'>
                <div className="flex flex-wrap hover:motion-safe:animate-bounce content-center w-full h-full justify-center">
                    <Link to={'/service/data'} key={service_request_id} onClick={()=> handleServiceSelected(service_request_id)}>
                        <img src="../../img/lupa.png" alt="lupa" className='w-full h-full'/>
                    </Link>
                </div>
            </div>
        </div>
    )
}