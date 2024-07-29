import {Link} from "react-router-dom";
import useApp from "../../hooks/useApp.js";
import {commonConfig} from "../../hooks/commonConfig.js";

export default function QuotationsTableRow({data,viewDataPath}) {

    const {getBaggerQuotationById} = useApp();

    const {formatTimeStamp,statusConfig} = commonConfig()

    const {consecutive,
        timestamps,
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
                <span className={`inline-flex items-center gap-1 rounded-full ${status === 'NE' ? 'bg-yellow-100' : status === 'EN' ? 'bg-blue-100' : ''} px-2 py-1 text-xs font-semibold ${status === 'NE' ? 'text-yellow-600' : status === 'EN' ? 'text-blue-600' : ''}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${status === 'NE' ? 'bg-yellow-500' : status === 'EN' ? 'bg-blue-500' : ''}`}></span>
                    {statusConfig(status)}
              </span>
            </td>
            <td className="px-4 py-4">
                <Link to={viewDataPath} onClick={() => handleSelectBaggerQuotationData(id,consecutive)} className='flex py-1 justify-center rounded-full bg-gray-500/10 hover:text-indigo-600'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6" x-tooltip="tooltip">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
                    </svg>
                </Link>
            </td>
        </tr>
    );

}