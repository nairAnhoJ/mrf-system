import { useEffect, useState } from 'react';
import IconRenderer from '../../components/icons';

function NonChargableReport() {
    useEffect(() => {
        // window.print();
    }, []);

    return (
        <>
            <div className='w-screen min-h-screen fixed top-0 left-0 bg-white px-10 text-neutral-800 pt-20'>
                <div className='h-24 flex flex-col justify-center items-center'>
                    <h1 className='text-xl font-black'>HANDLING INNOVATION INC.</h1>
                    <p className='text-sm'>Dow Jones Bldg., Whse5A, KM 19, WSR, SSH, Parañaque City</p>
                </div>
                <div className='w-full'>
                    <h1 className='text-base font-bold py-1 text-center border-y-2 border-neutral-500'>Material Requisition Form</h1>

                    {/* Request Details */}
                    <>
                        <div className='w-full grid grid-cols-3 justify-between mt-6 gap-x-6'>
                            <div className='text-xs col-span-1 flex'>
                                <span className='pr-1'>MRF No:</span> 
                                <span className='inline-block text-sm border-b border-neutral-500 pb-[1px] text-center font-medium flex-1'>NC0925-000001</span>
                            </div>
                            <div className='text-xs col-span-1 flex'>
                                <span className='pr-1'>FSRR No:</span> 
                                <span className='inline-block border-b border-neutral-500 pb-[1px] text-center font-medium flex-1'>345680dfbhjiko</span>
                            </div>
                            <div className='text-xs col-span-1 flex'>
                                <span className='pr-1'>MRI No:</span> 
                                <span className='inline-block border-b border-neutral-500 pb-[1px] text-center font-medium flex-1'>3129807</span>
                            </div>
                        </div>
                        <div className='w-full grid grid-cols-3 justify-between mt-6 gap-x-6'>
                            <div className='text-sm col-span-1 flex'>
                                <span className='pr-1'>Order Type:</span> 
                                <span className='inline-block border-b border-neutral-500 pb-[1px] text-center font-medium flex-1'>RENTAL</span>
                            </div>
                            <div className='text-sm col-span-1 flex'>
                                <span className='pr-1'>Delivery Type:</span> 
                                <span className='inline-block border-b border-neutral-500 pb-[1px] text-center font-medium flex-1'>REGULAR</span>
                            </div>
                            <div className='text-sm col-span-1 flex'>
                                <span className='pr-1'>Date Needed:</span> 
                                <span className='inline-block border-b border-neutral-500 pb-[1px] text-center font-medium flex-1'>Nov 18, 2025</span>
                            </div>
                        </div>
                        <div className='w-full grid grid-cols-3 mt-6 gap-x-6'>
                            <div className='text-sm col-span-2 flex'>
                                <span className='pr-1'>Customer Name:</span> 
                                <span className='inline-block border-b border-neutral-500 pb-[1px] flex-1 text-center font-medium'>NC0925-000001</span>
                            </div>
                            <div className='text-sm col-span-1 flex'>
                                <span className='pr-1'>Area:</span> 
                                <span className='inline-block border-b border-neutral-500 pb-[1px] flex-1 text-center font-medium'>UNILEVER GATEWAY</span>
                            </div>
                        </div>
                        <div className='w-full mt-6 gap-x-6'>
                            <div className='text-sm w-full flex'>
                                <span className='pr-1'>Customer Address:</span> 
                                <span className='inline-block border-b border-neutral-500 pb-[1px] flex-1 text-center font-medium'>NC0925-000001</span>
                            </div>
                        </div>
                        <div className='w-full grid grid-cols-4 justify-between mt-6 gap-x-6'>
                            <div className='text-sm col-span-1 flex'>
                                <span className='pr-1'>Fleet No:</span> 
                                <span className='inline-block border-b border-neutral-500 pb-[1px] text-center font-medium flex-1'>G892</span>
                            </div>
                            <div className='text-sm col-span-1 flex'>
                                <span className='pr-1'>Brand:</span> 
                                <span className='inline-block border-b border-neutral-500 pb-[1px] text-center font-medium flex-1'>TOYOTA</span>
                            </div>
                            <div className='text-sm col-span-1 flex'>
                                <span className='pr-1'>Model:</span> 
                                <span className='inline-block border-b border-neutral-500 pb-[1px] text-center font-medium flex-1'>FGZN25</span>
                            </div>
                            <div className='text-sm col-span-1 flex'>
                                <span className='pr-1'>Serial No:</span> 
                                <span className='inline-block border-b border-neutral-500 pb-[1px] text-center font-medium flex-1'>40499</span>
                            </div>
                        </div>
                        <div className='w-full mt-6 gap-x-6'>
                            <div className='text-sm w-full flex flex-col'>
                                <span className='pr-1'>Request Remarks:</span> 
                                <div className='border-b border-neutral-500 pb-[1px] flex-1 text-left font-medium'>PM1 for the month of august 2025</div>
                            </div>
                        </div>
                    </>
                    
                    {/* Requested Parts */}
                    <>
                        <div className='w-full mt-12 text-sm'>
                            <table className='w-full'>
                                <thead>
                                    <tr className='border-b border-neutral-500'>
                                        <th>Part No</th>
                                        <th>Item No</th>
                                        <th>Description</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='text-center'>Part No</td>
                                        <td className='text-center'>Item No</td>
                                        <td className='text-center'>Description</td>
                                        <td className='text-center'>Quantity</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>

                </div>
            </div>
        </>
    )
}

export default NonChargableReport