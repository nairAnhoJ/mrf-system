import { useEffect, useState } from 'react';
import IconRenderer from '../../components/icons';

function NonChargableReport() {
    useEffect(() => {
        // window.print();
    }, []);

    return (
        <>
            <div className='w-screen fixed top-0 left-0 bg-gray-200'>
                <div className='from-red-500 to-red-500/85 bg-linear-to-r h-40 flex items-center px-20 text-white text-4xl font-bold'>
                    Toyota Material Handling
                </div>
                <div className='p-6 w-full'>
                    <h1 className='text-2xl text-neutral-800 font-bold'>Material Requisition Form</h1>
                    <div className='w-full flex justify-between mt-6'>
                        <div className='text-base'><span className='font-semibold'>MRF No:</span> <span>345680dfbhjiko</span></div>
                        <div className='text-base'><span className='font-semibold'>FSRR No:</span> <span>345680dfbhjiko</span></div>
                        <div className='text-base'><span className='font-semibold'>MRI No:</span> <span>345680dfbhjiko</span></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NonChargableReport