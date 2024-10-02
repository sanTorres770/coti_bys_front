import {commonConfig} from "../../hooks/commonConfig.js";

export default function DashboardTableRow({data,dollarEnabled,dollarCurrency}) {

    const {formatPriceToCurrency} = commonConfig()

    return (
        <>

            <tr className="text-gray-700 dark:text-gray-100">
                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{data.description}</th>
                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{data.maker.name}</td>
                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{data.supplyAmount}</td>
                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{formatPriceToCurrency(dollarEnabled ? data.totalPrice : (data.totalPrice / dollarCurrency), dollarEnabled)}</td>
            </tr>


        </>
    );
}