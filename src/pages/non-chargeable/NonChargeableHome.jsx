import React, { useState } from 'react'
import Button from '../../components/Button'
import IconRenderer from '../../components/icons'

const NonChargeableHome = () => {
  const [search, setSearch] = useState('');

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

  const handleTest = () => {
    console.log('test');
  }

  return (
    <div className='bg-white h-full w-[calc(100%-96px)] rounded-r-2xl ml-24 pt-2 pr-2'>
      <h1 className='text-2xl font-bold dark:text-white'>Non Chargeable Requests</h1>
      <div className='mt-3 flex justify-between items-center h-10'>
        <Button onClick={handleTest} className='w-40 h-full'>ADD</Button>
        <div className='flex h-full'>
          <div className='h-full flex items-center gap-x-1 relative'>
              <IconRenderer name={'search'} className='h-5 w-5 ml-2 absolute'></IconRenderer>
              <input onChange={(e) => {setSearch(e.target.value)}} value={search} type="text" className='h-full rounded w-80 border border-gray-300 pl-8 dark:bg-gray-800 dark:border-gray-500' />
              <div className='absolute right-2 flex items-center gap-x-1'>
                  <button onClick={handleClearSearch} className='font-bold text-red-500'><IconRenderer name={'close'} className='h-5 w-5'></IconRenderer></button>
                  <button onClick={handleSearch} className='font-medium border border-gray-300 dark:border-gray-500 rounded px-1 tracking-tight'>Search</button>
              </div>
          </div>
          {/* <input type="text" className='border border-neutral-500 rounded h-full'/> */}
        </div>
      </div>
    </div>
  )
}

export default NonChargeableHome