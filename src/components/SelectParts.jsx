import React from 'react'
import Button from './Button'
import IconRenderer from './icons'

const SelectParts = ({closeButton, path}) => {
  return (
    <>
        <div onClick={(e) => closeButton(e)} className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900/60 z-100">
            <aside className='bg-white w-3/4 h-3/4 rounded text-neutral-600'>
                <div className='w-full p-6 border-b border-neutral-300 text-xl leading-5 font-bold flex justify-between'>
                    <h1>Parts List</h1>
                    <button className='hover:text-neutral-700 cursor-pointer'>
                        <IconRenderer name={'close'} className={"w-5 h-5"} />
                    </button>
                </div>
                <div className='w-full h-[calc(100%-158px)]'>
                    
                </div>
                <div className='w-full p-6 border-t border-neutral-300 flex gap-x-6'>
                    <Button className={"w-20"}>Add</Button>
                    <Button color='gray' className={"w-20"}>Close</Button>
                </div>
            </aside>
        </div>
    </>
  )
}

export default SelectParts