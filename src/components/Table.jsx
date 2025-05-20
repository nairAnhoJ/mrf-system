const Table = ({ columns, collection, onRowClick, actionRender } ) => {
    return (
        <div className="w-full">
            <table className='w-full'>
                <thead className='border-b rounded-t-lg bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-100 text-neutral-700 border-neutral-500 text-sm'>
                    <tr className="">
                        {   columns.map((row) => (
                                <th key={row.key} className={row.className}>{row.label}</th>
                            ))
                        }
                        {
                            actionRender && <th className={'text-center'}>Action</th>
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        collection.length > 0 ?
                            collection.map((item, index) => (
                                <tr key={index} onClick={() => onRowClick(item)}  className={`font-normal cursor-pointer border-b border-neutral-300  hover:bg-neutral-300 dark:hover:bg-neutral-400 dark:border-neutral-500 ${index%2 === 1 ? 'bg-neutral-200 dark:bg-neutral-500' : 'dark:bg-neutral-600'}`}>
                                    {   columns.map((row, index) => (
                                            <td key={index} className={row.className}>{item[row.key]}</td>
                                        ))
                                    }
                                    {   actionRender && (
                                            <td className="px-4 py-2" onClick={(e) => e.stopPropagation()}>
                                                { actionRender(item) }
                                            </td>
                                        )
                                    }
                                </tr>
                            ))
                        : 
                            <tr>
                                <th colSpan={columns.length + (actionRender ? 1 : 0)} className='py-2 px-4'>No data.</th>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table


// Sample Column

// const columns = [
//     {'key': 'name', 'label': 'Name', 'className': 'py-1 px-2'},
//     {'key': 'department', 'label': 'Department', 'className': 'text-center'},
//   ]




// Sample ActionRender


// actionRender={(item) => (
//     <div className='flex items-center justify-center'>
//         <button onClick={() => handleEdit(item)} className='pr-1 hover:underline cursor-pointer'>EDIT</button> | <button onClick={() => handleDelete(item)} className='pl-1 hover:underline cursor-pointer'>DELETE</button>
//     </div>
// )}