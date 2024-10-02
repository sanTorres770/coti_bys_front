import {commonConfig} from "../../hooks/commonConfig.js";

export default function DashboardTableFooter({priceResult,dollarEnabled, dollarCurrency}) {

    const {formatPriceToCurrency} = commonConfig()


    return (
        <tfoot>
        <tr className="text-gray-700 dark:text-gray-100">
            <th colSpan={3} className="px-4 bg-gray-600 text-gray-100 align-middle border border-solid border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-right">
                Total
            </th>
            <th className="px-4 bg-gray-600 text-gray-100 align-middle border border-solid border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                {formatPriceToCurrency(dollarEnabled ? priceResult : (priceResult / dollarCurrency),dollarEnabled)}
            </th>
        </tr>
        </tfoot>
    );
}