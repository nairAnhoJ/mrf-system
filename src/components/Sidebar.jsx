import React, { useState } from 'react';
import IconRenderer from './icons';

const Sidebar = () => {
    const [isFocus, setIsFocus] = useState(false);

    return (
        <div className='h-[calc(100%-32px)] flex flex-col justify-between fixed w-24 hover:w-72 bg-neutral-800 text-neutral-300 overflow-hidden transition-all duration-300'>
            <div className='bg-white w-8 h-full absolute right-0 translate-x-1/2 rounded-l-2xl'></div>
            <div className='w-[calc(100%-16px)] h-10 flex justify-center'><img src="/public/logo.ico" alt="logo" className='w-10 h-10'/></div>

            <div className=''>
                <button className='w-72 h-12 pl-6 border-s-4 border-neutral-800 hover:border-white hover:text-white flex whitespace-nowrap items-center cursor-pointer'>
                    <IconRenderer name="settings" className='w-7 h-7' />
                    <span className='ms-7 font-semibold'>Non-Chargeable</span>
                </button>
                <button className='w-72 h-12 pl-6 border-s-4 border-neutral-800 hover:border-white hover:text-white flex whitespace-nowrap items-center cursor-pointer'>
                    <IconRenderer name="settings" className='w-7 h-7' />
                    <span className='ms-7 font-semibold'>Chargeable</span>
                </button>
                <button className='w-72 h-12 pl-6 border-s-4 border-neutral-800 hover:border-white hover:text-white flex whitespace-nowrap items-center cursor-pointer'>
                    <IconRenderer name="settings" className='w-7 h-7' />
                    <span className='ms-7 font-semibold'>Settings</span>
                </button>
                <button className='w-72 h-12 pl-6 border-s-4 border-neutral-800 hover:border-white hover:text-white flex whitespace-nowrap items-center cursor-pointer'>
                    <IconRenderer name="logout" className='w-7 h-7' />
                    <span className='ms-7 font-semibold'>Log out</span>
                </button>
            </div>

            <div className='mb-20'>
                <h1>John Arian Malondras</h1>
                {/* <button className='w-72 h-12 pl-6 border-s-4 border-neutral-800 hover:border-white hover:text-white flex whitespace-nowrap items-center cursor-pointer'>
                    <IconRenderer name="logout" className='w-7 h-7' />
                    <span className='ms-7 font-semibold'>Log out</span>
                </button> */}
            </div>
        </div>
    )
}

export default Sidebar