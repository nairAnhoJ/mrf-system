import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import IconRenderer from '../../components/icons'
import Table from '../../components/Table'
import { Link } from 'react-router-dom'
import { getAll as areaGetAll } from '../../services/areaService'

const NonChargeableAdd = () => {
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [collection, setCollection] = useState([]);
    const [addCustomerModal, setAddCustomerModal] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        address: '',
        area: ''
    });
    const today = new Date().toISOString().split('T')[0];
    const [item, setItem] = useState({
        'date_needed' : today,
        'for' : '',
        'order_type' : '',
        'delivery_type' : '',
        'customer_name' : '',
        'customer_address' : '',
        'area' : '',
    });

    const [areas, setAreas] = useState([]);

    const getAreas = async() => {
        try {
            const response = await areaGetAll();
            console.log(response);
            setAreas(response);
            // updateDateFormat();
            // setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddCustomerModal = () => {
        getAreas();
        setAddCustomerModal(true)
    }

    const handleAddCustomer = () => {
        getAreas();
        setAddCustomerModal(true)
    }

    return (
        <>
            <div className={`w-screen h-screen fixed top-0 left-0 bg-neutral-900/50 z-100 flex items-center justify-center text-neutral-600 ${!addCustomerModal ? 'hidden' : ''}`}>
                <form onSubmit={handleAddCustomer} className='bg-white w-[800px] p-6 rounded'>
                    <h1 className='font-bold text-lg'>Add New Customer</h1>
                    <div className='mt-3'>
                        <label className='text-sm'>Name</label>
                        <input type="text" onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})} className='w-full h-10 border border-neutral-400 px-2 rounded text-sm leading-4'/>
                    </div>
                    <div className='mt-2'>
                        <label className='text-sm'>Address</label>
                        <input type="text" onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})} className='w-full h-10 border border-neutral-400 px-2 rounded text-sm leading-4'/>
                    </div>
                    <div className='mt-2'>
                        <label className='text-sm block'>Area</label>
                        <select onChange={(e) => setNewCustomer({...newCustomer, area: e.target.value})} className='w-64 h-10 px-2 border rounded border-neutral-400 text-sm leading-4'>
                            <option hidden value="">Please select an area.</option>
                            {
                                areas.map((area, index) => (
                                    <option key={index} value={area.id} className='text-sm leading-4'>{area.name}</option>
                                ))
                            }
                        </select>
                        {/* <input type="text" className='w-full border border-neutral-400 px-2 py-1 rounded font-semibold'/> */}
                    </div>
                    <div className='mt-6 flex gap-x-3'>
                        <Button color='blue'>Save</Button>
                        <Button type="button" onClick={() => setAddCustomerModal(false)} color='gray'>Close</Button>
                    </div>
                </form>
            </div>

            <div className='bg-white dark:bg-neutral-700 h-full w-[calc(100%-96px)] rounded-r-2xl ml-24 pt-2 pr-4 text-neutral-700 dark:text-neutral-100'>

                <form className='w-full h-full'>
                    <h1 className='text-2xl font-bold text-neutral-600 dark:text-white'>Non Chargeable Requests</h1>
                    
                    <div className='flex justify-between mt-2'>
                        <div className='flex items-center gap-x-2'>
                            <Link to="/non-chargeable" className='rounded-full hover:bg-neutral-500 hover:text-white p-2'>
                                <IconRenderer name={'back'} className={'w-6 h-6'}/>
                            </Link>
                            <div className='text-xl font-semibold'>Add a New Request</div>
                        </div>
                        <Button color='blue'>
                            Save
                        </Button>
                    </div>

                    <div className='w-full'>
                        <div className='w-full flex flex-col gap-y-2 mt-2'>
                            <div className='flex w-full'>
                                <div className='flex flex-col w-1/5 pr-3'>
                                    <h1 className='text-xs 2xl:text-sm'>Date Needed</h1>
                                    <input type='date' onChange={(e) => setItem({...item, date_needed: e.target.value})} value={item.date_needed} className='w-full text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'/>
                                </div>
                            </div>
                            <div className='flex w-full'>
                                <div className='flex flex-col w-1/3 pr-3'>
                                    <h1 className='text-xs 2xl:text-sm'>For</h1>
                                    <select onChange={(e) => setItem({...item, for: e.target.value})} value={item.for} className='w-full text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>
                                        <option hidden value="">-</option>
                                        <option value="PM">PM</option>
                                        <option value="REPAIR">REPAIR</option>
                                    </select>
                                </div>
                                <div className='flex flex-col w-1/3 px-3'>
                                    <h1 className='text-xs 2xl:text-sm'>Order Type</h1>
                                    <select onChange={(e) => setItem({...item, order_type: e.target.value})} value={item.order_type} className='w-full text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>
                                        <option hidden value="">-</option>
                                        <option value="RENTAL">RENTAL</option>
                                        <option value="AFTERSALES">AFTERSALES</option>
                                        <option value="STOCK">STOCK</option>
                                        <option value="PDI">PDI</option>
                                        <option value="WARRANTY">WARRANTY</option>
                                        <option value="OTHERS">OTHERS</option>
                                    </select>
                                </div>
                                <div className='flex flex-col w-1/3 pl-3'>
                                    <h1 className='text-xs 2xl:text-sm'>Delivery Type</h1>
                                    <select onChange={(e) => setItem({...item, delivery_type: e.target.value})} value={item.delivery_type} className='w-full text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>
                                        <option hidden value="">-</option>
                                        <option value="RENTAL">REGULAR</option>
                                        <option value="AFTERSALES">SAME DAY</option>
                                        <option value="STOCK">PICK UP</option>
                                        <option value="PDI">AIR</option>
                                        <option value="WARRANTY">SEA</option>
                                        <option value="OTHERS">OTHERS</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex w-full'>
                                <div className='flex flex-col w-2/3 pr-3 relative'>
                                    <h1 className='text-xs 2xl:text-sm'>Customer Name</h1>
                                    <input type="text" className='w-full text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900' readOnly/>
                                    <div className='w-[calc(100%-12px)] absolute left-0 bottom-0 translate-y-full h-[300px] bg-neutral-100 z-49 border border-neutral-400 dark:bg-neutral-500'>
                                        <div className='w-full h-full overflow-auto pt-[88px]'>
                                            <button type='button' onClick={handleAddCustomerModal} className='w-[calc(100%-15px)] p-2 border-b flex items-center fixed top-0 bg-neutral-100 border-neutral-400 hover:bg-gray-200 dark:bg-neutral-500 dark:hover:bg-neutral-600 cursor-pointer'>
                                                <IconRenderer name='add' className='w-5 h-5' />
                                                <span className='pl-1'>Add new customer</span>
                                            </button>
                                            <div className='w-[calc(100%-15px)] p-2 border-b fixed top-[41px] bg-neutral-100 border-neutral-400 dark:bg-neutral-500 dark:hover:bg-neutral-600'>
                                                <input type="text" className='w-full border rounded pl-6 p-1 text-sm' />
                                                <IconRenderer name='search' className='w-5 h-5 absolute top-1/2 -translate-y-1/2 left-3' />
                                            </div>
                                            <div className='w-full border-b border-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600 p-2 leading-4 cursor-pointer'>asdfasd</div>
                                            <div className='w-full border-b border-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600 p-2 leading-4 cursor-pointer'>asdfasd</div>
                                            <div className='w-full border-b border-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600 p-2 leading-4 cursor-pointer'>asdfasd</div>
                                            <div className='w-full border-b border-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600 p-2 leading-4 cursor-pointer'>asdfasd</div>
                                            <div className='w-full border-b border-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600 p-2 leading-4 cursor-pointer'>asdfasd</div>
                                            <div className='w-full border-b border-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600 p-2 leading-4 cursor-pointer'>asdfasd</div>
                                            <div className='w-full border-b border-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600 p-2 leading-4 cursor-pointer'>asdfasd</div>
                                            <div className='w-full border-b border-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600 p-2 leading-4 cursor-pointer'>asdfasd</div>
                                        </div>
                                    </div>
                                    {/* <div className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>{item.customer_name}</div> */}
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
                                    <div className='w-full flex items-start text-sm h-18 leading-4.5 2xl:text-base 2xl:leading-5 2xl:h-20 font-semibold rounded px-2 py-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900 overflow-auto'>{item.request_remarks}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NonChargeableAdd