import React, { useEffect, useRef, useState } from 'react'
// import Table from '../../components/Table'
import Button from '../../components/Button'
import IconRenderer from '../../components/icons'
import ImageViewer from '../../components/ImageViewer'

import { Link } from 'react-router-dom'
import { getAll as areaGetAll } from '../../services/areaService'
import { getAll as customerGetAll, create as customerCreate } from '../../services/customerService'
import { Notification } from '../../components/Notification'

const NonChargeableAdd = () => {
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const today = new Date().toISOString().split('T')[0];
    const [addCustomerModal, setAddCustomerModal] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        address: '',
        area_id: ''
    });
    const [item, setItem] = useState({
        'date_needed' : today,
        'for' : '',
        'order_type' : '',
        'delivery_type' : '',
        'customer_name' : '',
        'customer_address' : '',
        'area' : '',
        'fsrr_number' : '',
        'fsrr_attachment' : null,
        'fleet_number' : '',
        'brand' : '',
        'model' : '',
        'serial_number' : '',
        'request_remarks' : '',
    });
    const [areas, setAreas] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [viewCustomers, setViewCustomers] = useState(false);
    const [showFsrr, setShowFsrr] = useState(false);
    const [fsrrPreview, setFsrrPreview] = useState('');
    const [errors, setErrors] = useState([]);
    const [notif, setNotif] = useState([]);
    const customerDiv = useRef();
    const fsrrRef = useRef();

    const getAreas = async() => {
        try {
            const response = await areaGetAll();
            setAreas(response);
        } catch (error) {
            console.log(error);
        }
    }

    const getCustomers = async() => {
        try {
            const response = await customerGetAll();
            setCustomers(response);
        } catch (error) {
            console.log(error);
        }
    }

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        getCustomers();
        const handleClick = (e) => {
            if (customerDiv.current && !customerDiv.current.contains(e.target)) {
                setViewCustomers(false);
            }
        };
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        }
    }, [])

    const handleAddCustomerModal = () => {
        setNewCustomer({
          name: '',
          address: '',
          area_id: ''
        });
        setErrors([]);
        getAreas();
        setViewCustomers(false);
        setAddCustomerModal(true);
    }

    const handleAddCustomer = async (e) => {
        e.preventDefault();
        try {
            const response = await customerCreate(newCustomer);
            if(response.status === 400){
                console.log(response.data.errors);
                setErrors(response.data.errors);
            }else if(response.status === 201){
                setNotif('New Customer has been Added');
                getCustomers();
                setAddCustomerModal(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCustomerSelect = (customer) => {
        console.log(customer);
        setItem({...item, customer_name: customer.name, customer_address: customer.address, area: customer.area})
        setViewCustomers(false)
    }

    const handleFsrrUpload = (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const previewUrl = URL.createObjectURL(file);
        setFsrrPreview(previewUrl);
      }
      setItem((prev) => ({
        ...prev,
        fsrr_attachment: file,
      }));
    };

    const handleCloseImageViewer = (e) => {
        if (e.target.closest('img')) return;
        setShowFsrr(false);
    }

    return (
        <>
            {/* NOTIFICATION */}
            {
                notif != '' &&
                <Notification message={notif} closeButton={() => setNotif('')}/>
            }


            {/* ADD CUSTOMER */}
            <div className={`w-screen h-screen fixed top-0 left-0 bg-neutral-900/50 z-100 flex items-center justify-center text-neutral-600 ${!addCustomerModal ? 'hidden' : ''}`}>
                <form onSubmit={handleAddCustomer} className='bg-white w-[800px] p-6 rounded'>
                    <h1 className='font-bold text-lg'>Add New Customer</h1>
                    <div className='mt-3'>
                        <label className='text-sm'>Name</label>
                        <input type="text" onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})} value={newCustomer.name} className='w-full h-10 border border-neutral-400 px-2 rounded text-sm leading-4'/>
                        {
                            errors.find((err) => err.path == "name") ? (
                                <p className='text-red-500 text-xs italic'>{ errors.find((err) => err.path == "name")?.msg }</p>
                            ) : null
                        }
                    </div>
                    <div className='mt-2'>
                        <label className='text-sm'>Address</label>
                        <input type="text" onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})} value={newCustomer.address} className='w-full h-10 border border-neutral-400 px-2 rounded text-sm leading-4'/>
                        {
                            errors.find((err) => err.path == "address") ? (
                                <p className='text-red-500 text-xs italic'>{ errors.find((err) => err.path == "address")?.msg }</p>
                            ) : null
                        }
                    </div>
                    <div className='mt-2'>
                        <label className='text-sm block'>
                            Area 
                            <span className='ms-1 text-xs text-orange-500 italic font-medium'>
                                *New area not listed? Please contact IT.
                            </span>
                        </label>
                        <select onChange={(e) => setNewCustomer({...newCustomer, area_id: e.target.value})} value={newCustomer.area_id} className='w-64 h-10 px-2 border rounded border-neutral-400 text-sm leading-4'>
                            <option hidden value="">Please select an area.</option>
                            {
                                areas.map((area, index) => (
                                    <option key={index} value={area.id} className='text-sm leading-4'>{area.name}</option>
                                ))
                            }
                        </select>
                        {
                            errors.find((err) => err.path == "area_id") ? (
                                <p className='text-red-500 text-xs italic'>{ errors.find((err) => err.path == "area_id")?.msg }</p>
                            ) : null
                        }
                        {/* <input type="text" className='w-full border border-neutral-400 px-2 py-1 rounded font-semibold'/> */}
                    </div>
                    <div className='mt-6 flex gap-x-3'>
                        <Button type="submit" color='blue'>Save</Button>
                        <Button onClick={() => setAddCustomerModal(false)} color='gray'>Close</Button>
                    </div>
                </form>
            </div>

            
            {/* IMAGE VIEWER */}
            {
                showFsrr &&
                <ImageViewer path={fsrrPreview}  closeButton={(e) => handleCloseImageViewer(e)} />
            }


            <div className='bg-white dark:bg-neutral-700 h-full w-[calc(100%-96px)] rounded-r-2xl ml-24 pt-2 pr-4 text-neutral-700 dark:text-neutral-100'>

                <form className='w-full h-full overflow-y-auto overflow-x-hidden'>
                    <h1 className='text-2xl font-bold text-neutral-600 dark:text-white'>Non Chargeable Requests</h1>
                    
                    {/* CONTROLS */}
                    <div className='flex justify-between mt-2'>
                        <div className='flex items-center gap-x-2'>
                            <Link to="/non-chargeable" className='rounded-full hover:bg-neutral-500 hover:text-white p-2'>
                                <IconRenderer name={'back'} className={'w-6 h-6'}/>
                            </Link>
                            <div className='text-xl font-semibold'>Add a New Request</div>
                        </div>
                        <Button type='submit' color='blue'>
                            Save
                        </Button>
                    </div>

                    <div className='w-full'>
                        <div className='w-full flex flex-col gap-y-4 mt-2'>

                            <h1 className='font-bold text-2xl text-neutral-600'>Request Details</h1>

                            {/* Date Needed */}
                            <div className='flex w-full'>
                                <div className='flex flex-col w-1/5 pr-3'>
                                    <h1 className='text-xs 2xl:text-sm'>Date Needed</h1>
                                    <input type='date' onChange={(e) => setItem({...item, date_needed: e.target.value})} value={item.date_needed} className='w-full text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'/>
                                </div>
                            </div>

                            <div className='flex w-full'>
                                {/* For */}
                                <div className='flex flex-col w-1/3 pr-3'>
                                    <h1 className='text-xs 2xl:text-sm'>For</h1>
                                    <select onChange={(e) => setItem({...item, for: e.target.value})} value={item.for} className='w-full text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>
                                        <option hidden value="">-</option>
                                        <option value="PM">PM</option>
                                        <option value="REPAIR">REPAIR</option>
                                    </select>
                                </div>
                                {/* Order Type */}
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
                                {/* Delivery Type */}
                                <div className='flex flex-col w-1/3 pl-3'>
                                    <h1 className='text-xs 2xl:text-sm'>Delivery Type</h1>
                                    <select onChange={(e) => setItem({...item, delivery_type: e.target.value})} value={item.delivery_type} className='w-full text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>
                                        <option hidden value="">-</option>
                                        <option value="REGULAR">REGULAR</option>
                                        <option value="SAME DAY">SAME DAY</option>
                                        <option value="PICK UP">PICK UP</option>
                                        <option value="AIR">AIR</option>
                                        <option value="SEA">SEA</option>
                                        <option value="OTHERS">OTHERS</option>
                                    </select>
                                </div>
                            </div>

                            {/* Customer Name */}
                            <div className='flex w-full'>
                                <div ref={customerDiv} className='flex flex-col w-2/3 pr-3 relative'>
                                    <h1 className='text-xs 2xl:text-sm'>Customer Name</h1>
                                    <input type="text" onFocus={() => setViewCustomers(true)} value={item.customer_name} className='w-full text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900' readOnly />
                                    <div className={`w-[calc(100%-12px)] absolute left-0 -bottom-[2px] translate-y-full bg-neutral-100 z-49 border border-neutral-400 dark:bg-neutral-600 ${!viewCustomers && 'hidden'}`}>
                                        <div className='w-full overflow-hidden'>
                                            <button type='button' onClick={handleAddCustomerModal} className='w-full p-2 border-b flex items-center bg-neutral-100 border-neutral-400 hover:bg-gray-200 dark:bg-neutral-600 dark:hover:bg-neutral-700 cursor-pointer'>
                                                <IconRenderer name='add' className='w-5 h-5' />
                                                <span className='pl-1'>Add new customer</span>
                                            </button>
                                            <div className='relative w-full p-2 border-b bg-neutral-100 border-neutral-400 dark:bg-neutral-600 dark:hover:bg-neutral-600'>
                                                <input type="text" onChange={(e) => setSearch(e.target.value)} className='w-full border rounded pl-6 p-1 text-sm' />
                                                <IconRenderer name='search' className='w-5 h-5 absolute top-1/2 -translate-y-1/2 left-3' />
                                            </div>
                                            <div className='max-h-[231px] overflow-y-auto overflow-x-hidden'>
                                                {
                                                    filteredCustomers.map((customer) => (
                                                        <div key={customer.id} onClick={() => handleCustomerSelect(customer)} className='w-full flex items-center justify-between border-b border-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 p-2 leading-4 cursor-pointer last:border-b-0'>
                                                            <div>{customer.name}</div>
                                                            <div>{customer.area}</div>
                                                        </div>
                                                    ))
                                                }
                                                {
                                                    filteredCustomers.length === 0 && (
                                                        <div className='w-full border-b border-neutral-400 p-2 leading-4'>No customers found.</div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col w-1/3 pl-3'>
                                    <h1 className='text-xs 2xl:text-sm'>Area</h1>
                                    <div className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>{item.area}</div>
                                </div>
                            </div>

                            {/* Customer Address */}
                            <div className='flex w-full'>
                                <div className='flex flex-col w-full'>
                                    <h1 className='text-xs 2xl:text-sm'>Customer Address</h1>
                                    <div className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>{item.customer_address}</div>
                                </div>
                            </div>

                            <div className='flex w-full'>
                                {/* FSRR */}
                                <div className='flex flex-col w-1/5 pr-3'>
                                    <h1 className='text-xs 2xl:text-sm'>FSSR Number</h1>
                                    <div className='flex relative'>
                                        <input onChange={(e) => setItem({...item, fsrr_number: e.target.value})} value={item.fsrr_number} maxLength="20" className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'></input>
                                        <div className='flex absolute right-1 top-1 gap-x-1'>
                                            <input ref={fsrrRef} onChange={handleFsrrUpload} type="file" style={{ display: 'none' }} accept="image/*"/>
                                            <button onClick={() => fsrrRef.current.click()} type='button' className='h-[calc(100%-8px)] aspect-square bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded shadow shadow-neutral-500 dark:shadow-neutral-900 cursor-pointer p-0.5 2xl:p-1'>
                                                <IconRenderer name="upload" className="w-5 h-5"/>
                                            </button>
                                            <button disabled={(fsrrPreview == '')} type='button' onClick={() => setShowFsrr(true)} className='h-[calc(100%-8px)] aspect-square bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded shadow shadow-neutral-500 dark:shadow-neutral-900 cursor-pointer p-0.5 2xl:p-1 disabled:pointer-events-none disabled:opacity-50'>
                                                <IconRenderer name="visibility" className="w-5 h-5"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Fleet Number */}
                                <div className='flex flex-col w-1/5 px-3'>
                                    <h1 className='text-xs 2xl:text-sm'>Fleet Number</h1>
                                    <div className='flex relative'>
                                        <input onChange={(e) => setItem({...item, fleet_number: e.target.value})} value={item.fleet_number} maxLength="20" className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900' />
                                        <button disabled={item.fleet_number == ''} type='button' className='h-[calc(100%-8px)] aspect-square bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded shadow shadow-neutral-500 dark:shadow-neutral-900 absolute right-1 top-1 cursor-pointer p-0.5 2xl:p-1 disabled:pointer-events-none disabled:opacity-50'>
                                            <IconRenderer name="history" className="w-5 h-5"/>
                                        </button>
                                    </div>
                                </div>
                                {/* Brand */}
                                <div className='flex flex-col w-1/5 px-3'>
                                    <h1 className='text-xs 2xl:text-sm'>Brand</h1>
                                    <select onChange={(e) => setItem({...item, brand: e.target.value})} value={item.brand} className='w-full text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>
                                        <option hidden value="">-</option>
                                        <option value="TOYOTA">TOYOTA</option>
                                        <option value="BT">BT</option>
                                        <option value="RAYMOND">RAYMOND</option>
                                    </select>
                                </div>
                                {/* Model */}
                                <div className='flex flex-col w-1/5 px-3'>
                                    <h1 className='text-xs 2xl:text-sm'>Model</h1>
                                    <input onChange={(e) => setItem({...item, model: e.target.value})} value={item.model} maxLength="20" className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900' />
                                </div>
                                {/* Serial Number */}
                                <div className='flex flex-col w-1/5 pl-3'>
                                    <h1 className='text-xs 2xl:text-sm'>Serial Number</h1>
                                    <input onChange={(e) => setItem({...item, serial_number: e.target.value})} value={item.serial_number} maxLength="20" className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900' />
                                </div>
                            </div>
 
                            {/* Remarks */}
                            <div className='flex w-full'>
                                <div className='flex flex-col w-full'>
                                    <h1 className='text-xs 2xl:text-sm'>Request Remarks</h1>
                                    <textarea onChange={(e) => setItem({...item, request_remarks: e.target.value})} value={item.request_remarks} className='w-full flex items-start text-sm h-18 leading-4.5 2xl:text-base 2xl:leading-5 2xl:h-20 font-semibold rounded px-2 py-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900 overflow-auto' />
                                </div>
                            </div>

                        </div>

                        <div className='w-full'>
                            <h1 className='font-bold text-2xl text-neutral-600 mt-6'>Parts Request</h1>
                            <div className='w-full'>
                                <table className='w-full border-separate border-spacing-y-2'>
                                    <thead>
                                        <tr>
                                            <th className='py-2 border-b-1 border-neutral-300'>Part Number</th>
                                            <th className='py-2 border-b-1 border-neutral-300'>Description</th>
                                            <th className='py-2 border-b-1 border-neutral-300'>Brand</th>
                                            <th className='py-2 border-b-1 border-neutral-300'>Quantity</th>
                                            <th className='py-2 border-b-1 border-neutral-300'>Unit Price</th>
                                            <th className='py-2 border-b-1 border-neutral-300'>Total Amount</th>
                                            <th className='py-2 border-b-1 border-neutral-300'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='hover:border-4 border-blue-500 cursor-pointer'>
                                            <th className='py-3 bg-neutral-200 rounded-s-md'>56sd748hr</th>
                                            <td className='bg-neutral-200'>s56d74fgsdf sdf456h</td>
                                            <td className='text-center bg-neutral-200'>ATOYOT</td>
                                            <td className='text-center bg-neutral-200'>2</td>
                                            <td className='text-center bg-neutral-200'>999</td>
                                            <td className='text-center bg-neutral-200'>1,998</td>
                                            <td className='text-center bg-neutral-200 rounded-e-md'>X</td>
                                        </tr>
                                        <tr>
                                            <th className='py-3 bg-neutral-200 rounded-s-md'>56sd748hr</th>
                                            <td className='bg-neutral-200'>s56d74fgsdf sdf456h</td>
                                            <td className='text-center bg-neutral-200'>ATOYOT</td>
                                            <td className='text-center bg-neutral-200'>2</td>
                                            <td className='text-center bg-neutral-200'>999</td>
                                            <td className='text-center bg-neutral-200'>1,998</td>
                                            <td className='text-center bg-neutral-200 rounded-e-md'>X</td>
                                        </tr>
                                        <tr>
                                            <th className='py-3 bg-neutral-200 rounded-s-md'>56sd748hr</th>
                                            <td className='bg-neutral-200'>s56d74fgsdf sdf456h</td>
                                            <td className='text-center bg-neutral-200'>ATOYOT</td>
                                            <td className='text-center bg-neutral-200'>2</td>
                                            <td className='text-center bg-neutral-200'>999</td>
                                            <td className='text-center bg-neutral-200'>1,998</td>
                                            <td className='text-center bg-neutral-200 rounded-e-md'>X</td>
                                        </tr>
                                        <tr>
                                            <th className='py-3 bg-neutral-200 rounded-s-md'>56sd748hr</th>
                                            <td className='bg-neutral-200'>s56d74fgsdf sdf456h</td>
                                            <td className='text-center bg-neutral-200'>ATOYOT</td>
                                            <td className='text-center bg-neutral-200'>2</td>
                                            <td className='text-center bg-neutral-200'>999</td>
                                            <td className='text-center bg-neutral-200'>1,998</td>
                                            <td className='text-center bg-neutral-200 rounded-e-md'>X</td>
                                        </tr>
                                        <tr>
                                            <th className='py-3 bg-neutral-200 rounded-s-md'>56sd748hr</th>
                                            <td className='bg-neutral-200'>s56d74fgsdf sdf456h</td>
                                            <td className='text-center bg-neutral-200'>ATOYOT</td>
                                            <td className='text-center bg-neutral-200'>2</td>
                                            <td className='text-center bg-neutral-200'>999</td>
                                            <td className='text-center bg-neutral-200'>1,998</td>
                                            <td className='text-center bg-neutral-200 rounded-e-md'>X</td>
                                        </tr>
                                        <tr>
                                            <th className='py-3 bg-neutral-200 rounded-s-md'>56sd748hr</th>
                                            <td className='bg-neutral-200'>s56d74fgsdf sdf456h</td>
                                            <td className='text-center bg-neutral-200'>ATOYOT</td>
                                            <td className='text-center bg-neutral-200'>2</td>
                                            <td className='text-center bg-neutral-200'>999</td>
                                            <td className='text-center bg-neutral-200'>1,998</td>
                                            <td className='text-center bg-neutral-200 rounded-e-md'>X</td>
                                        </tr>
                                        <tr>
                                            <th className='py-3 bg-neutral-200 rounded-s-md'>56sd748hr</th>
                                            <td className='bg-neutral-200'>s56d74fgsdf sdf456h</td>
                                            <td className='text-center bg-neutral-200'>ATOYOT</td>
                                            <td className='text-center bg-neutral-200'>2</td>
                                            <td className='text-center bg-neutral-200'>999</td>
                                            <td className='text-center bg-neutral-200'>1,998</td>
                                            <td className='text-center bg-neutral-200 rounded-e-md'>X</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NonChargeableAdd