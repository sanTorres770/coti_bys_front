export default function QuotationsTableHead({columnNames,isAdmin}) {
    return (
        <thead className="bg-gray-50">
        <tr>
            {columnNames.map(columnName => (

                (!isAdmin && columnName.name !== 'Estado') && (
                    <th key={columnName.id} scope="col" className="px-6 py-4 font-medium text-gray-900">
                        {columnName.name}
                    </th>
                )

            ))}
        </tr>
        </thead>
    );
}