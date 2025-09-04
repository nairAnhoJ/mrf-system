import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import IconRenderer from './icons'

const SelectParts = ({closeButton, addSelectedParts, collection, sParts}) => {
    const [partSearch, setPartSearch] = useState('');
    const [selectedParts, setSelectedParts] = useState([]);
    const [filteredCollection, setFilteredCollection] = useState([]);

    useEffect(() => {
        setSelectedParts(sParts);
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (partSearch.length >= 3) {
            setFilteredCollection(
                collection.filter(item => 
                    item.item_number.toLowerCase().includes(partSearch.toLowerCase()) || 
                    item.number.toLowerCase().includes(partSearch.toLowerCase()) || 
                    item.name.toLowerCase().includes(partSearch.toLowerCase()) || 
                    item.brand.toLowerCase().includes(partSearch.toLowerCase())
                ) 
            );
            } else {
                setFilteredCollection([]);
            }
        }, 300);
        return () => clearTimeout(handler);
    }, [partSearch, collection]);

    const handlePartSearchInput = (e) => {
        setPartSearch(e.target.value);
    }

    const toggleRow = (item) => {
        setSelectedParts((prev) =>
          prev.some((i) => i.id === item.id) ? prev.filter((i) => i.id !== item.id) : [...prev, {...item, quantity: 1}]
        );
    }

    const isChecked = (item) => selectedParts.some((i) => i.id === item.id);

    const handleAdd = () => {
        addSelectedParts(selectedParts);
    }

    return (
        <>
            <div onClick={(e) => closeButton(e)} className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900/60 z-100">
                <aside className='bg-white dark:bg-neutral-600 w-3/4 h-3/4 rounded text-neutral-600 dark:text-neutral-50'>
                    <div className='w-full p-6 border-b border-neutral-300 text-xl leading-5 font-bold flex justify-between'>
                        <h1>Parts List</h1>
                    </div>
                    <div className='w-full h-[calc(100%-158px)] p-6'>
                        <div className='flex items-center gap-x-1 relative text-neutral-700 mb-1'>
                            <IconRenderer name={'search'} className='h-5 w-5 ml-2 absolute'></IconRenderer>
                            <input onChange={(e) => setPartSearch(e.target.value)} value={partSearch} type="text" className='px-2 py-1 rounded w-80 border border-gray-300 pl-8 dark:bg-neutral-400 dark:border-neutral-400 shadow-inner' />
                        </div>
                        <div className='w-full h-[calc(100%-34px)] border-b border-neutral-300'>
                            <table className='w-full h-full'>
                                <thead className='w-full block pr-[15px]'>
                                    <tr className='border-b border-neutral-500 w-full table table-fixed'>
                                        <th className='px-4 w-[3.47%]'></th>
                                        <th className='py-1 w-[11.94%] whitespace-nowrap'>Item Number</th>
                                        <th className='w-[17.26%] whitespace-nowrap'>Part Number</th>
                                        <th className='pl-1 text-left w-[43.84%]'>Description</th>
                                        <th className='w-[12.62%]'>Brand</th>
                                        <th className='w-[10.86%] whitespace-nowrap'>Unit Price (₱)</th>
                                    </tr>
                                </thead>
                                <tbody className='block w-full h-[calc(100%-34px)] overflow-auto'>
                                    {
                                        filteredCollection.map((item) => (
                                            <tr key={item.id} onClick={() => toggleRow(item)} className='w-full cursor-pointer not-last:border-b border-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-500 table table-fixed'>
                                                <th className='text-center py-1 w-[3.47%]'>
                                                    <input checked={isChecked(item)} onChange={() => toggleRow(item)} onClick={(e) => e.stopPropagation()} type="checkbox" />
                                                </th>
                                                <td className='text-center w-[11.94%]'>{item.item_number}</td>
                                                <td className='text-center w-[17.26%]'>{item.number}</td>
                                                <td className='text-left pl-1 w-[43.84%]'>{item.name}</td>
                                                <td className='text-center w-[12.62%]'>{item.brand}</td>
                                                <td className='text-center w-[10.86%]'>{Number(item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='w-full p-6 border-t border-neutral-300 flex gap-x-6'>
                        <Button onClick={handleAdd} className={"w-20"}>Add</Button>
                        <Button color='gray' onClick={() => closeButton()} className={"w-20"}>Close</Button>
                    </div>
                </aside>
            </div>
        </>
    )
}

export default SelectParts