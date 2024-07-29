import BaggerProductsTableHead from "./BaggerProductsTableHead.jsx";
import BaggerProductsTableRow from "./BaggerProductsTableRow.jsx";

export default function BaggerProductsTable({columnNames,data,viewDataPath}) {
    return (
        <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <BaggerProductsTableHead columnNames={columnNames}></BaggerProductsTableHead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {data.map(item => (

                    <BaggerProductsTableRow key={item.id} data={item} viewDataPath={viewDataPath}></BaggerProductsTableRow>

                ))}
                </tbody>
            </table>
        </div>
    );
}