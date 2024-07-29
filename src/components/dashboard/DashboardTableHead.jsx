export default function DashboardTableHead({columnNames}) {
    return (
        <thead>
        <tr>
            {columnNames.map(columnName => (
                <th key={columnName.id} className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    {columnName.name}
                </th>
            ))}
        </tr>
        </thead>
    );
}