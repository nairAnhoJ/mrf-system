interface Columns {
    key: keyof Collection;
    label: string;
    className: string;
}

interface Collection<T = any> {
    [key: string]: T;
}

const Table = <T extends Record<string, any>>(
    { 
        columns, 
        collection, 
        withRowClick = false,
        onRowClick,
        withEdit = false,
        editClick,
        withDelete = false,
        deleteClick,
    }:{ 
        columns: Columns[], 
        collection: T[], 
        withRowClick?: boolean,
        onRowClick?: (id: number) => void, 
        withEdit?: boolean, 
        editClick?: (id: number) => void,
        withDelete?: boolean, 
        deleteClick?: (id: number) => void
    }
) => {
    return (
        <div className="w-full">
            <table className='w-full'>
                <thead className='border-b rounded-t-lg bg-gray-300 dark:bg-gray-700 border-gray-500 text-sm'>
                    <tr className="">
                        {
                            columns.map((row) => (
                                <th key={row.key} className={row.className}>{row.label}</th>
                            ))
                        }
                        {
                            withEdit || withDelete ?
                            <>
                                <th className={'text-center'}>Action</th>
                            </> 
                            : 
                            ''
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        collection.length > 0 ?
                            collection.map((item, index) => (
                                <tr key={index} onClick={withRowClick ? () => onRowClick?.(item.id) : undefined}  className={`font-normal cursor-pointer border-b border-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 dark:border-gray-700 ${index%2 === 1 ? 'bg-gray-200 dark:bg-gray-800' : ''}`}>
                                    {
                                        columns.map((row, index) => (
                                            <td key={index} className={row.className}>{item[row.key]}</td>
                                        ))
                                    }
                                    {
                                        withEdit || withDelete ?
                                        <>
                                            <td className={'text-center font-bold'}>
                                                {
                                                    withEdit ? 
                                                        <button onClick={(e) => {e.stopPropagation(); editClick?.(item.id); }} className="text-blue-500">
                                                            EDIT
                                                        </button>
                                                    :
                                                    ''
                                                }
                                                {
                                                    withEdit && withDelete ? 
                                                        <span className="mx-2">|</span>
                                                    :
                                                    ''
                                                }
                                                {
                                                    withDelete ? 
                                                        <button onClick={(e) => {e.stopPropagation(); deleteClick?.(item.id); }} className="text-red-500">
                                                            DELETE
                                                        </button>
                                                    :
                                                    ''
                                                }
                                            </td>
                                        </> 
                                        : 
                                        ''
                                    }
                                </tr>
                            ))
                        : 
                            <tr>
                                <th colSpan={7} className='py-2 px-4'>No data.</th>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table