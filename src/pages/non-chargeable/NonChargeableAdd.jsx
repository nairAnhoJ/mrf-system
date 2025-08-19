import React, { useEffect, useRef, useState } from 'react'
// import Table from '../../components/Table'
import Button from '../../components/Button'
import IconRenderer from '../../components/icons'
import ImageViewer from '../../components/ImageViewer'

import { Link, useNavigate } from 'react-router-dom'
import { getAll as areaGetAll } from '../../services/areaService'
import { getAll as partsGetAll } from '../../services/partsService'
import { getByArea as customerGetByArea, create as customerCreate } from '../../services/customerService'
import { create as requestCreate } from '../../services/nonChargeableService'
import { Notification } from '../../components/Notification'
import SelectParts from '../../components/SelectParts'

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
        'pm_attachment' : null,
        'order_type' : '',
        'delivery_type' : '',
        'customer_id' : '',
        'customer_name' : '',
        'customer_address' : '',
        'area' : '',
        'area_id' : 0,
        'fsrr_number' : '',
        'fsrr_attachment' : null,
        'fleet_number' : '',
        'brand' : '',
        'model' : '',
        'serial_number' : '',
        'request_remarks' : '',
        'parts' : [],
    });
    const [areas, setAreas] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [viewCustomers, setViewCustomers] = useState(false);
    const [showFsrr, setShowFsrr] = useState(false);
    const [showPm, setShowPm] = useState(false);
    const [parts, setParts] = useState([]);
    // const [selectedParts, setSelectedParts] = useState([]);
    const [showPartsList, setShowPartsList] = useState(false);
    const [fsrrPreview, setFsrrPreview] = useState('');
    const [pmPreview, setPmPreview] = useState('');
    const [errors, setErrors] = useState([]);
    const [notif, setNotif] = useState([]);
    const customerDiv = useRef();
    const fsrrRef = useRef();
    const pmRef = useRef();
    const navigate = useNavigate();

    const getAreas = async() => {
        try {
            const response = await areaGetAll();
            setAreas(response);
        } catch (error) {
            console.log(error);
        }
    }

    const getParts = async() => {
        try {
            const response = await partsGetAll();
            setParts(response);
        } catch (error) {
            console.log(error);
        }
    }

    const getCustomers = async() => {
        try {
            const response = await customerGetByArea();
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
        setItem({...item, customer_id: customer.id, customer_name: customer.name, customer_address: customer.address, area: customer.area, area_id: customer.area_id})
        setViewCustomers(false)
    }

    const handlePMUpload = (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const previewUrl = URL.createObjectURL(file);
        setPmPreview(previewUrl);
      }
      setItem((prev) => ({
        ...prev,
        pm_attachment: file,
      }));
    };

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
        setShowPm(false);
    }

    const handleOpenPartsList = async () => {
        await getParts();
        setShowPartsList(true);
    }

    const handleSelectedParts = (selected) => {
        setItem((prev) => ({...prev, parts: selected}));
        setShowPartsList(false);
    }

    const handleClosePartsList = (e) => {
        if (e && e.target.closest('aside')) return;
        setShowPartsList(false);
    }

    const handleDeleteSelectedPart = (id) => {
        setItem((prev) => ({
            ...prev, 
            parts: prev.parts.filter((i) => (i.id !== id))
        }));
    }

    const handleQuantityChange = (e, id) => {
        setItem((prev) => ({
            ...prev,
            parts: prev.parts.map((part) => (
                part.id === id ?
                { ...part, quantity: e.target.value < 1 ? 1 : e.target.value }
                : part
            ))
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const data = new FormData();
        data.append('date_needed', item.date_needed);
        data.append('for', item.for);
        data.append('pm_attachment', item.pm_attachment);
        data.append('order_type', item.order_type);
        data.append('delivery_type', item.delivery_type);
        data.append('customer_id', item.customer_id);
        data.append('customer_name', item.customer_name);
        data.append('customer_address', item.customer_address);
        data.append('area', item.area);
        data.append('area_id', item.area_id);
        data.append('fsrr_number', item.fsrr_number);
        data.append('fsrr_attachment', item.fsrr_attachment);
        data.append('fleet_number', item.fleet_number);
        data.append('brand', item.brand);
        data.append('model', item.model);
        data.append('serial_number', item.serial_number);
        data.append('request_remarks', item.request_remarks);

        item.parts.forEach((part, index) => {
            data.append(`parts[${index}][id]`, part.id);
            data.append(`parts[${index}][item_number]`, part.item_number);
            data.append(`parts[${index}][number]`, part.number);
            data.append(`parts[${index}][name]`, part.name);
            data.append(`parts[${index}][brand]`, part.brand);
            data.append(`parts[${index}][price]`, part.price);
            data.append(`parts[${index}][quantity]`, part.quantity);
        });
        
        try {
            const response = await requestCreate(data);
            if(response.status === 400){
                setErrors(response.data.errors);
            }else if(response.status === 201){
                navigate('/non-chargeable', { state: {
                    type: 'success',
                    message: response.data.message
                } });
            }
        } catch (error) {
            console.log(error);
        }
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

            
            {/* Show FSRR */}
            {
                showFsrr &&
                <ImageViewer path={fsrrPreview}  closeButton={(e) => handleCloseImageViewer(e)} />
            }

            
            {/* Show PM */}
            {
                showPm &&
                <ImageViewer path={pmPreview}  closeButton={(e) => handleCloseImageViewer(e)} />
            }

            
            {/* Select Parts / Parts List */}
            {
                showPartsList &&
                <SelectParts closeButton={(e) => handleClosePartsList(e)} addSelectedParts={handleSelectedParts} collection={parts} sParts={item.parts} />
            }


            <div className='bg-white dark:bg-neutral-700 h-full w-[calc(100%-96px)] rounded-r-2xl ml-24 py-2 pr-4 text-neutral-700 dark:text-neutral-100'>

                <form onSubmit={handleSubmit} encType="multipart/form-data" className='w-full h-full'>
                    <h1 className='text-2xl font-bold text-neutral-600 dark:text-white'>Non Chargeable Requests</h1>
                    
                    {/* CONTROLS */}
                    <div className='flex justify-between mt-2 pb-2'>
                        <div className='flex items-center gap-x-2'>
                            <Link to="/non-chargeable" className='rounded-full hover:bg-neutral-500 hover:text-white p-2'>
                                <IconRenderer name={'back'} className={'w-6 h-6'}/>
                            </Link>
                            <div className='text-xl font-semibold'>Add a New Request</div>
                        </div>
                        <Button type='submit' onClick={(e) => e.stopPropagation()} color='blue'>
                            Submit
                        </Button>
                    </div>

                    <div className='h-[calc(100%-100px)] w-full overflow-y-auto overflow-x-hidden'>
                        <div className='w-full flex flex-col gap-y-4 mt-2'>

                            <h1 className='font-bold text-2xl text-neutral-600 dark:text-neutral-100'>Request Details</h1>

                            {/* Date Needed */}
                            <div className='flex w-full'>
                                <div className='flex flex-col w-1/5 pr-3'>
                                    <h1 className='text-xs 2xl:text-sm'>Date Needed</h1>
                                    <input type='date' onChange={(e) => setItem({...item, date_needed: e.target.value})} value={item.date_needed} className='w-full text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'/>
                                    {
                                        errors.find((err) => err.path == "date_needed") ? (
                                            <p className='text-red-500 text-xs italic'>{ errors.find((err) => err.path == "date_needed")?.msg }</p>
                                        ) : null
                                    }
                                </div>
                            </div>

                            <div className='flex w-full'>
                                {/* For */}
                                <div className='flex flex-col w-1/4 pr-3'>
                                    <h1 className='text-xs 2xl:text-sm'>For</h1>
                                    <select onChange={(e) => setItem({...item, for: e.target.value})} value={item.for} className='w-full text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>
                                        <option hidden value="">-</option>
                                        <option value="PM">PM</option>
                                        <option value="REPAIR">REPAIR</option>
                                    </select>
                                    {
                                        errors.find((err) => err.path == "for") ? (
                                            <p className='text-red-500 text-xs italic'>{ errors.find((err) => err.path == "for")?.msg }</p>
                                        ) : null
                                    }
                                </div>
                                {/* PM Sttachment */}
                                <div className={`flex flex-col w-1/4 px-3 relative ${item.for !== 'PM' ? 'opacity-50' : ''}`}>
                                    <h1 className='text-xs 2xl:text-sm'>PM Attachment</h1>
                                    <button disabled={item.for !== 'PM'} type='button' onClick={() => pmRef.current.click()} className='w-[79px] 2xl:w-[90px] h-6 2xl:h-[26px] border border-neutral-600 absolute top-5 2xl:top-[25px] left-[17px] rounded shadow cursor-pointer disabled:pointer-events-none'></button>
                                    <input disabled={item.for !== 'PM'} onChange={handlePMUpload} ref={pmRef} type="file" accept="image/*" className='w-full text-sm h-8 leading-3.5 py-[8px] 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900 cursor-pointer disabled:pointer-events-none'/>
                                    <button disabled={(pmPreview == '') || item.for !== 'PM'} type='button' onClick={() => setShowPm(true)} className='h-6 aspect-square absolute top-[21px] right-4 bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded shadow shadow-neutral-500 dark:shadow-neutral-900 cursor-pointer p-0.5 2xl:p-1 disabled:pointer-events-none disabled:opacity-50'>
                                        <IconRenderer name="visibility" className="w-5 h-5"/>
                                    </button>
                                    {
                                        errors.find((err) => err.path == "pm_attachment") ? (
                                            <p className='text-red-500 text-xs italic'>{ errors.find((err) => err.path == "pm_attachment")?.msg }</p>
                                        ) : null
                                    }
                                </div>
                                {/* Order Type */}
                                <div className='flex flex-col w-1/4 px-3'>
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
                                    {
                                        errors.find((err) => err.path == "order_type") ? (
                                            <p className='text-red-500 text-xs italic'>{ errors.find((err) => err.path == "order_type")?.msg }</p>
                                        ) : null
                                    }
                                </div>
                                {/* Delivery Type */}
                                <div className='flex flex-col w-1/4 pl-3'>
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
                                    {
                                        errors.find((err) => err.path == "delivery_type") ? (
                                            <p className='text-red-500 text-xs italic'>{ errors.find((err) => err.path == "delivery_type")?.msg }</p>
                                        ) : null
                                    }
                                </div>
                            </div>

                            {/* Customer Name */}
                            <div className='flex w-full'>
                                <div ref={customerDiv} className='flex flex-col w-2/3 pr-3 relative'>
                                    <h1 className='text-xs 2xl:text-sm'>Customer Name</h1>
                                    <input type="text" onFocus={() => setViewCustomers(true)} value={item.customer_name} className='w-full text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900' readOnly />
                                    {
                                        errors.find((err) => err.path == "customer_name") ? (
                                            <p className='text-red-500 text-xs italic'>{ errors.find((err) => err.path == "customer_name")?.msg }</p>
                                        ) : null
                                    }
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
                                    <h1 className='text-xs 2xl:text-sm'>FSRR Number</h1>
                                    <div className='flex relative'>
                                        <input onChange={(e) => setItem({...item, fsrr_number: e.target.value})} value={item.fsrr_number} maxLength="20" className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'></input>
                                        <div className='flex absolute right-1 top-1 gap-x-1'>
                                            <input ref={fsrrRef} onChange={handleFsrrUpload} type="file" style={{ display: 'none' }} accept="image/*"/>
                                            <button onClick={() => fsrrRef.current.click()} type='button' className={`h-[calc(100%-8px)] aspect-square bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded shadow shadow-neutral-500 dark:shadow-neutral-900 cursor-pointer p-0.5 2xl:p-1 border-red-500 ${errors.find((err) => err.path == "fsrr_attachment") ? 'border' : ''}`}>
                                                <IconRenderer name="upload" className="w-5 h-5"/>
                                            </button>
                                            <button disabled={(fsrrPreview == '')} type='button' onClick={() => setShowFsrr(true)} className='h-[calc(100%-8px)] aspect-square bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded shadow shadow-neutral-500 dark:shadow-neutral-900 cursor-pointer p-0.5 2xl:p-1 disabled:pointer-events-none disabled:opacity-50'>
                                                <IconRenderer name="visibility" className="w-5 h-5"/>
                                            </button>
                                        </div>
                                    </div>
                                    {
                                        errors.find((err) => err.path == "fsrr_number") ? (
                                            <p className='text-red-500 text-xs italic'>{ errors.find((err) => err.path == "fsrr_number")?.msg }</p>
                                        ) : null
                                    }
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
                                    {
                                        errors.find((err) => err.path == "fleet_number") ? (
                                            <p className='text-red-500 text-xs italic'>{ errors.find((err) => err.path == "fleet_number")?.msg }</p>
                                        ) : null
                                    }
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
                                    {
                                        errors.find((err) => err.path == "brand") ? (
                                            <p className='text-red-500 text-xs italic'>{ errors.find((err) => err.path == "brand")?.msg }</p>
                                        ) : null
                                    }
                                </div>
                                {/* Model */}
                                <div className='flex flex-col w-1/5 px-3'>
                                    <h1 className='text-xs 2xl:text-sm'>Model</h1>
                                    <input onChange={(e) => setItem({...item, model: e.target.value})} value={item.model} maxLength="20" className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900' />
                                    {
                                        errors.find((err) => err.path == "model") ? (
                                            <p className='text-red-500 text-xs italic'>{ errors.find((err) => err.path == "model")?.msg }</p>
                                        ) : null
                                    }
                                </div>
                                {/* Serial Number */}
                                <div className='flex flex-col w-1/5 pl-3'>
                                    <h1 className='text-xs 2xl:text-sm'>Serial Number</h1>
                                    <input onChange={(e) => setItem({...item, serial_number: e.target.value})} value={item.serial_number} maxLength="20" className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900' />
                                    {
                                        errors.find((err) => err.path == "serial_number") ? (
                                            <p className='text-red-500 text-xs italic'>{ errors.find((err) => err.path == "serial_number")?.msg }</p>
                                        ) : null
                                    }
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

                        <div className='w-full mt-7'>
                            <div className='flex items-end justify-between'>
                                <h1 className='font-bold text-2xl text-neutral-600 dark:text-neutral-100 h-9'>Parts Request</h1>
                                <div className='flex items-center'>
                                    <Button onClick={handleOpenPartsList} color='blue' className={`flex items-center gap-x-1 ${errors.find((err) => err.path == "parts") ? 'border-2' : ''} border-red-500`}>
                                        <IconRenderer name={'add'} className={'w-5 h-5'}/>
                                        Add
                                    </Button>
                                </div>
                            </div>
                            <div className='w-full'>
                                <table className='w-full border-separate border-spacing-y-2'>
                                    <thead> 
                                        <tr>
                                            <th className='py-2 border-b-1 border-neutral-300'>Item Number</th>
                                            <th className='py-2 border-b-1 border-neutral-300'>Part Number</th>
                                            <th className='text-left py-2 border-b-1 border-neutral-300'>Description</th>
                                            <th className='py-2 border-b-1 border-neutral-300'>Brand</th>
                                            <th className='py-2 border-b-1 border-neutral-300'>Quantity</th>
                                            <th className='py-2 border-b-1 border-neutral-300'>Unit Price (₱)</th>
                                            <th className='py-2 border-b-1 border-neutral-300'>Total Amount (₱)</th>
                                            <th className='py-2 border-b-1 border-neutral-300'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            item.parts.map((selectedPart) => (
                                                <tr key={selectedPart.id} className='hover:border-4 border-blue-500'>
                                                    <th className='py-3 text-center bg-neutral-200 dark:bg-neutral-600 rounded-s-md'>{selectedPart.item_number}</th>
                                                    <td className='text-center bg-neutral-200 dark:bg-neutral-600'>{selectedPart.number}</td>
                                                    <td className='bg-neutral-200 dark:bg-neutral-600'>{selectedPart.name}</td>
                                                    <td className='text-center bg-neutral-200 dark:bg-neutral-600'>{selectedPart.brand}</td>
                                                    <td className='text-center bg-neutral-200 dark:bg-neutral-600'>
                                                        <input type="text" 
                                                            inputMode="numeric" 
                                                            pattern="[0-9]*" 
                                                            className='border-b w-14 text-center' 
                                                            value={selectedPart.quantity} 
                                                            onChange={(e) => handleQuantityChange(e, selectedPart.id)}
                                                        />
                                                    </td>
                                                    <td className='text-center bg-neutral-200 dark:bg-neutral-600'>{Number(selectedPart.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                    <td className='text-center bg-neutral-200 dark:bg-neutral-600'>{Number(selectedPart.price * selectedPart.quantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                    <td className='text-center bg-neutral-200 dark:bg-neutral-600 rounded-e-md'>
                                                        <button onClick={() => handleDeleteSelectedPart(selectedPart.id)} type='button' className='rounded-full text-red-500 hover:bg-red-500 hover:text-white p-2 cursor-pointer'>
                                                            <IconRenderer name={'close'} className={'w-5 h-5'}/>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
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