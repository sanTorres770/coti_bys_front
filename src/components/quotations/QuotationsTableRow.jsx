import {Link} from "react-router-dom";
import useApp from "../../hooks/useApp.js";
import {commonConfig} from "../../hooks/commonConfig.js";

export default function QuotationsTableRow({data,viewDataPath,isAdmin}) {

    const {getBaggerQuotationById} = useApp();

    const {formatTimeStamp,statusConfig} = commonConfig()

    const {consecutive,
        timestamps,
        velocity,
        packingMaterial,
        status,
        service,
        id} = data;

    const handleSelectBaggerQuotationData = (baggerQuotationId,consecutive) => {

        getBaggerQuotationById(baggerQuotationId,consecutive)

    }

    return (
        <tr className="hover:bg-gray-50">
            <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                <div className="text-sm">
                    <div className="font-medium text-gray-700">
                        {consecutive}
                    </div>
                </div>
            </th>
            <td className="px-6 py-4">{`${formatTimeStamp(timestamps)}`}</td>
            <td className="px-6 py-4">
                <div className="flex gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600">
                        {service.name}
                    </span>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex gap-2">
                    <span
                        className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-blue-500-600">
                        {`${velocity.type} - ${packingMaterial.type}`}
                    </span>
                </div>
            </td>

            {isAdmin && (

                <td className="px-6 py-4">
                <span
                    className={`inline-flex items-center gap-1 rounded-full ${status === 'NE' ? 'bg-blue-300' : status === 'EN' ? 'bg-green-100' : ''} px-2 py-1 text-xs font-semibold ${status === 'NE' ? 'text-blue-600' : status === 'EN' ? 'text-green-600' : ''}`}>
                <span
                    className={`h-1.5 w-1.5 rounded-full ${status === 'NE' ? 'bg-blue-600' : status === 'EN' ? 'bg-green-500' : ''}`}></span>
                    {statusConfig(status)}
              </span>
                </td>

            )}

            <td className="px-4 py-4">
                <Link to={viewDataPath} onClick={() => handleSelectBaggerQuotationData(id, consecutive)}
                      className='flex py-1 justify-center rounded-full bg-gray-500/10 hover:text-indigo-600'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width='24'
                         height='24' className="size-6">
                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                        <path fillRule="evenodd"
                              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                              clipRule="evenodd"/>
                    </svg>
                </Link>
            </td>
        </tr>
    );

}