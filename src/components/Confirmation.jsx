import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'

const Confirmation = ({closeButton, id, title, body}) => {



    const handleYes = () => {
        console.log(id, 'yes');
        closeButton();
    }

    return (
        <>
            <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900/30 z-100">
                <aside className='bg-white dark:bg-neutral-600 max-w-[400px] rounded text-neutral-600 dark:text-neutral-50'>
                    <div className='w-full p-6 border-b border-neutral-300 text-xl leading-5 font-bold flex justify-center items-center'>
                        <h1>{title}</h1>
                    </div>
                    <div className='w-full h-[calc(100%-158px)] p-6 font-medium'>
                        {body}
                    </div>
                    <div className='w-full p-6 border-t border-neutral-300 flex gap-x-3'>
                        <Button color='blue' onClick={handleYes} className={"w-1/2"}>Yes</Button>
                        <Button color='gray' onClick={() => closeButton()} className={"w-1/2"}>Close</Button>
                    </div>
                </aside>
            </div>
        </>
    )
}

export default Confirmation