import React, { useEffect, useState } from 'react';
import IconRenderer from '../../components/icons';
import Button from '../../components/Button';
import Table from '../../components/Table';
import { getById } from '../../services/nonChargeableService'

const NonChargeableShow = ({id, closeButton}) => {
    const [item, setItem] = useState({});
    const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {dateStyle: 'medium'});

    const parts_columns = [
        {'key': 'item_number', 'label': 'Item Number', 'className': 'py-1 px-2 text-center'},
        {'key': 'number', 'label': 'Part Number', 'className': 'py-1 px-2 text-center'},
        {'key': 'name', 'label': 'Description', 'className': 'py-1 px-2 text-center'},
        {'key': 'brand', 'label': 'Brand', 'className': 'py-1 px-2 text-center'},
        {'key': 'quantity', 'label': 'Quantity', 'className': 'py-1 px-2 text-center'},
        {'key': 'price', 'label': 'Price', 'className': 'py-1 px-2 text-center'},
        {'key': 'total_price', 'label': 'Total Price', 'className': 'py-1 px-2 text-center'},
    ]

    const updateDateFormat = () => {
        setItem((prevItem) => ({
            ...prevItem,
            date_requested: dateTimeFormatter.format(new Date(item.date_requested)),
            date_needed: dateTimeFormatter.format(new Date(item.date_needed)),
        }));
    };
    
    const getItem = async() => {
        try {
            const response = await getById(id);
            console.log(response[0]);
            setItem(response[0]);
            // updateDateFormat();
        } catch (error) {
            console.log(error);
        }
    }

    const getParts = async() => {
        try {
            // const response = await getById(id);
            // console.log(response[0]);
            
            // setItem(response[0]);
            // updateDateFormat();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getItem();
        console.log(item);
        
    }, [])

    return (
        <div className='fixed left-0 top-0 w-screen h-screen bg-neutral-900/50 flex items-center justify-center z-99'>
            <div className='w-8/12 h-11/12 bg-neutral-50 dark:bg-neutral-700 rounded flex flex-col'>

                <div className='w-full bg-neutral-50 dark:bg-neutral-700 rounded-t border-b border-neutral-200 text-neutral-600 dark:text-neutral-200 shadow flex items-center justify-between p-6'>
                    <h1 className='text-xl font-semibold leading-5'>{item.mrf_number}</h1>
                    <button type='button' onClick={closeButton} className="cursor-pointer">
                        <IconRenderer name="close" className="w-5 h-5"/>
                    </button>
                </div>

                <div className='w-full h-full bg-neutral-50 dark:bg-neutral-700  border-b border-neutral-200 text-neutral-600 dark:text-neutral-200 shadow p-6 overflow-auto'>
                    <div className='w-full'>
                        <h1 className='text-xl font-bold tracking-wide leading-5'>Request Details</h1>
                        <div className='w-full flex flex-col gap-y-2 mt-2'>
                            <div className='flex w-full'>
                                <div className='flex flex-col w-1/2 pr-3'>
                                    <h1 className='text-xs 2xl:text-sm'>Date Requested</h1>
                                    <div className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>{item.date_requested}</div>
                                </div>
                                <div className='flex flex-col w-1/2 pl-3'>
                                    <h1 className='text-xs 2xl:text-sm'>Date Needed</h1>
                                    <div className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>{item.date_needed}</div>
                                </div>
                            </div>
                            <div className='flex w-full'>
                                <div className='flex flex-col w-1/3 pr-3'>
                                    <h1 className='text-xs 2xl:text-sm'>For</h1>
                                    <div className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>{item.for}</div>
                                </div>
                                <div className='flex flex-col w-1/3 px-3'>
                                    <h1 className='text-xs 2xl:text-sm'>Order Type</h1>
                                    <div className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>{item.order_type}</div>
                                </div>
                                <div className='flex flex-col w-1/3 pl-3'>
                                    <h1 className='text-xs 2xl:text-sm'>Delivery Type</h1>
                                    <div className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>{item.delivery_type}</div>
                                </div>
                            </div>
                            <div className='flex w-full'>
                                <div className='flex flex-col w-2/3 pr-3'>
                                    <h1 className='text-xs 2xl:text-sm'>Customer Name</h1>
                                    <div className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>{item.customer_name}</div>
                                </div>
                                <div className='flex flex-col w-1/3 pl-3'>
                                    <h1 className='text-xs 2xl:text-sm'>Area</h1>
                                    <div className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>{item.area}</div>
                                </div>
                            </div>
                            <div className='flex w-full'>
                                <div className='flex flex-col w-full'>
                                    <h1 className='text-xs 2xl:text-sm'>Customer Address</h1>
                                    <div className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>{item.customer_address}</div>
                                </div>
                            </div>
                            <div className='flex w-full'>
                                <div className='flex flex-col w-1/5 pr-3'>
                                    <h1 className='text-xs 2xl:text-sm'>FSSR Number</h1>
                                    <div className='flex relative'>
                                        <div className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>{item.fsrr_number}</div>
                                        <button className='h-[calc(100%-8px)] aspect-square bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded shadow shadow-neutral-500 dark:shadow-neutral-900 absolute right-1 top-1 cursor-pointer p-0.5 2xl:p-1'>
                                            <IconRenderer name="visibility" className="w-5 h-5"/>
                                        </button>
                                    </div>
                                </div>
                                <div className='flex flex-col w-1/5 pr-3'>
                                    <h1 className='text-xs 2xl:text-sm'>Fleet Number</h1>
                                    <div className='flex relative'>
                                        <div className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>{item.fleet_number}</div>
                                        <button className='h-[calc(100%-8px)] aspect-square bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded shadow shadow-neutral-500 dark:shadow-neutral-900 absolute right-1 top-1 cursor-pointer p-0.5 2xl:p-1'>
                                            <IconRenderer name="history" className="w-5 h-5"/>
                                        </button>
                                    </div>
                                </div>
                                <div className='flex flex-col w-1/5 px-3'>
                                    <h1 className='text-xs 2xl:text-sm'>Brand</h1>
                                    <div className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>{item.brand}</div>
                                </div>
                                <div className='flex flex-col w-1/5 pl-3'>
                                    <h1 className='text-xs 2xl:text-sm'>Model</h1>
                                    <div className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>{item.model}</div>
                                </div>
                                <div className='flex flex-col w-1/5 pl-3'>
                                    <h1 className='text-xs 2xl:text-sm'>Serial Number</h1>
                                    <div className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>{item.serial_number}</div>
                                </div>
                            </div>
                            <div className='flex w-full'>
                                <div className='flex flex-col w-full'>
                                    <h1 className='text-xs 2xl:text-sm'>Request Remarks</h1>
                                    <div className='w-full flex items-start text-sm h-18 leading-4.5 2xl:text-base 2xl:leading-5 2xl:h-20 font-semibold rounded px-2 py-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900 overflow-auto'>{item.request_remarks}ujdhfs guiodsaghjk sdgfjohu dfuig dsfgsd jfg sdfh fsdhsdf hsdfh sdfhsdf hsdfth drfthdft hbkdfthm ofdth nkjdfg nhkljfdg nhjklfdgn hjkldf ngjkhfd gjkh ndfikoghnjdfkgnh sdkjfgbn kjldfbgjklsdfbgjklsdfjklgdsfjkgsdfg hsdfkg hkdsjf hgjklsdf gklsdfghdsfklgj hsdklfg hkjlsdfhgkjlsdfhgkjsd fgusdhh gkjsdb guysdb gds bfgyukbds fjkgb dfyugb yudfb gsd fgusdhh gkjsdb guysdb gds bfgyug</div>
                                </div>
                            </div>
                        </div>

                        <h1 className='text-xl font-bold tracking-wide mt-6 leading-5'>Part/s Requested</h1>
                        <div className='w-full'>
                            <Table columns={parts_columns}></Table>
                        </div>
                    </div>

                </div>

                <div className='w-full bg-neutral-50 dark:bg-neutral-700 rounded-b p-6 flex items-center'>
                    <Button color="white" onClick={closeButton}>CLOSE</Button>
                </div>

            </div>
        </div>
    )
}

export default NonChargeableShow