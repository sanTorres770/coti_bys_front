import TableHead from "./TableHead.jsx";
import TableRow from "./TableRow.jsx";

export default function Table({columnNames,data}) {
    return (
        <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <TableHead columnNames={columnNames}></TableHead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {data.map(item => (

                    <TableRow key={item.id} data={item}></TableRow>

                ))}
                </tbody>
            </table>
        </div>
    );
}