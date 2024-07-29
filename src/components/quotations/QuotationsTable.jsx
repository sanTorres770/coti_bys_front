import QuotationsTableHead from "./QuotationsTableHead.jsx";
import QuotationsTableRow from "./QuotationsTableRow.jsx";

export default function QuotationsTable({columnNames,data,viewDataPath}) {
    return (
        <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <QuotationsTableHead columnNames={columnNames}></QuotationsTableHead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {data.map(item => (

                    <QuotationsTableRow key={item.id} data={item} viewDataPath={viewDataPath}></QuotationsTableRow>

                ))}
                </tbody>
            </table>
        </div>
    );
}