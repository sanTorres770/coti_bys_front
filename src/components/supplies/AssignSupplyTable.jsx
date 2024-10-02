import AssignSupplyTableRow from "./AssignSupplyTableRow.jsx";
import AssignSupplyTableHead from "./AssignSupplyTableHead.jsx";

export default function AssignSupplyTable({columnNames,data,viewDataPath}) {

    return (
        <div className="overflow-hidden overflow-x-auto overflow-y-auto max-h-[500px] rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <AssignSupplyTableHead columnNames={columnNames}></AssignSupplyTableHead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {data.length !== 0 ?

                    data.map((item,index) => (

                    <AssignSupplyTableRow key={item.id} data={item} index={index} viewDataPath={viewDataPath}></AssignSupplyTableRow>

                    ))
                :
                    <tr className='text-center'>
                        <td className='p-2' colSpan={4}>
                            Aquí aparecerán los insumos seleccionados!
                        </td>
                    </tr>
                }
                </tbody>
            </table>
        </div>
    );
}