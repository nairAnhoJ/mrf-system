import React, { useRef } from 'react'
import Button from './Button'
import IconRenderer from './icons'

const SelectParts = ({closeButton, collection}) => {

    return (
        <>
            <div onClick={(e) => closeButton(e)} className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900/60 z-100">
                <aside className='bg-white dark:bg-neutral-600 w-3/4 h-3/4 rounded text-neutral-600 dark:text-neutral-100'>
                    <div className='w-full p-6 border-b border-neutral-300 text-xl leading-5 font-bold flex justify-between'>
                        <h1>Parts List</h1>
                        {/* <button onClick={() => closeButton()} className='hover:text-neutral-500 cursor-pointer bg-neutral-100 rounded'>
                            <IconRenderer name={'close'} className={"w-5 h-5"} />
                            +
                        </button> */}
                    </div>
                    <div className='w-full h-[calc(100%-158px)] p-6'>
                        <div className='w-full'>
                            <table className='w-full'>
                                <thead className=''>
                                    <tr>
                                        <th className='px-2'></th>
                                        <th className='py-1'>Item Number</th>
                                        <th>Part Number</th>
                                        <th>Description</th>
                                        <th>Brand</th>
                                        <th>Unit Price (₱)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        collection.map((item) => (
                                            <tr key={item.id} className='cursor-pointer'>
                                                <th className='text-center'>
                                                    <input type="checkbox" name="" id="" />
                                                </th>
                                                <td className='text-center'>{item.item_number}</td>
                                                <td className='text-center'>{item.number}</td>
                                                <td className='text-center'>{item.name}</td>
                                                <td className='text-center'>{item.brand}</td>
                                                <td className='text-center'>{Number(item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='w-full p-6 border-t border-neutral-300 flex gap-x-6'>
                        <Button className={"w-20"}>Add</Button>
                        <Button color='gray' onClick={() => closeButton()} className={"w-20"}>Close</Button>
                    </div>
                </aside>
            </div>
        </>
    )
}

export default SelectParts