import DashboardTableHead from "./DashboardTableHead.jsx";
import DashboardTableRow from "./DashboardTableRow.jsx";
import DashboardTableFooter from "./DashboardTableFooter.jsx";

export default function DashboardTable({tableTitle,columnNames,data,priceResult,dollarEnabled,dollarCurrency}) {
    return (
        <div className="p-6 relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded mt-6">
            <div className="rounded-t mb-0 px-0 border-0">
                <div className="flex flex-wrap items-center py-2">
                    <div className="flex justify-start items-center gap-2 w-full h-10 rounded-full bg-primary-100 bg-primary-900">
                        <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-primary-300"
                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                  clipRule="evenodd"></path>
                        </svg>
                        <h3 className="text-xl font-bold text-gray-400">{tableTitle}</h3>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto py-6">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <DashboardTableHead columnNames={columnNames}></DashboardTableHead>
                        <tbody>
                        {data.map(item => (

                            <DashboardTableRow key={item.id} data={item} dollarEnabled={dollarEnabled} dollarCurrency={dollarCurrency}></DashboardTableRow>

                        ))}
                        </tbody>
                        <DashboardTableFooter priceResult={priceResult} dollarEnabled={dollarEnabled} dollarCurrency={dollarCurrency}></DashboardTableFooter>
                    </table>
                </div>
            </div>
        </div>
    );
}