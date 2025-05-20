import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import IconRenderer from '../../components/icons'
import Table from '../../components/Table'

const NonChargeableHome = () => {
  const [search, setSearch] = useState('');
  const [collection, setCollection] = useState([]);

  const handleSearch = () => {
      let url = `?sort=${sort}&search=${search}`;
      if(perPage != 25){
          url += `&perPage=${perPage}`;
      }
      navigate(url, { replace: true });
      getCollection();
  };

  const handleClearSearch = () => {
      setSearch('');

      let url = `?sort=${sort}`;
      if(perPage != 25){
          url += `&perPage=${perPage}`;
      }
      navigate(url, { replace: true });
      getCollection();
  };

  const columns = [
    {'key': 'name', 'label': 'Name', 'className': 'py-1 px-2'},
    {'key': 'department', 'label': 'Department', 'className': 'text-center'},
  ]

  useEffect(()=>{
    setCollection([
      {'id': '1', 'name': 'Name', 'department': 'D1'},
      {'id': '2', 'name': 'Name 1', 'department': 'D1'},
      {'id': '3', 'name': 'Name 2', 'department': 'D2'},
    ])
  }, [])

  const handleRowClick = (item) => {
    console.log(item);
  }

  const handleEdit = (item) => {
    console.log(item);
  }

  const handleDelete = (item) => {
    console.log(item);
  }


    return (
        <div className='bg-white dark:bg-neutral-700 h-full w-[calc(100%-96px)] rounded-r-2xl ml-24 pt-2 pr-4'>
            <h1 className='text-2xl font-bold text-neutral-600 dark:text-white'>Non Chargeable Requests</h1>

            <div className='mt-3 flex justify-between items-center h-10'>
                <Button className='w-40 h-full'>ADD</Button>
                <div className='flex h-full'>
                    <div className='h-full flex items-center gap-x-1 relative text-neutral-700'>
                        <IconRenderer name={'search'} className='h-5 w-5 ml-2 absolute'></IconRenderer>
                        <input onChange={(e) => {setSearch(e.target.value)}} value={search} type="text" className='h-full rounded w-80 border border-gray-300 pl-8 dark:bg-neutral-400 dark:border-neutral-400 shadow-inner' />
                        <div className='absolute right-2 flex items-center gap-x-1'>
                            <button onClick={handleClearSearch} className='font-bold text-red-500'><IconRenderer name={'close'} className='h-5 w-5'></IconRenderer></button>
                            <button onClick={handleSearch} className='font-medium border border-gray-300 dark:border-gray-500 dark:bg-neutral-500 dark:text-neutral-100 rounded px-1 tracking-tight shadow-lg'>Search</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-3'>
                <Table
                    columns={columns} 
                    collection={collection}
                    onRowClick={(item) => handleRowClick(item)}
                    actionRender={(item) => (
                        <div className='flex items-center justify-center'>
                            <button onClick={() => handleEdit(item)} className='pr-1 hover:underline cursor-pointer'>EDIT</button> | <button onClick={() => handleDelete(item)} className='pl-1 hover:underline cursor-pointer'>DELETE</button>
                        </div>
                    )}
                />
            </div>


        </div>
    )
}

export default NonChargeableHome