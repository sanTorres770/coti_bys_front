export default function AssignSupplyTableHead({columnNames}) {
    return (
        <thead className="bg-gray-500/10">
        <tr>
            {columnNames.map(columnName => (
                <th key={columnName.id} scope="col" className="p-4 font-medium text-gray-900">
                    {columnName.name}
                </th>
            ))}
        </tr>
        </thead>
    );
}