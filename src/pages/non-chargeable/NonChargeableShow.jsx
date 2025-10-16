import React, { useEffect, useState } from 'react';
import IconRenderer from '../../components/icons';
import Button from '../../components/Button';
import Table from '../../components/Table';
import { getByFleetNumber, getById, getByRequestId } from '../../services/nonChargeableService'
import { updateDetails } from '../../services/nonChargeableService'
import ImageViewer from '../../components/ImageViewer'
import FleetHistory from '../../components/FleetHistory';
import LogViewer from '../../components/LogViewer';
import Confirmation from '../../components/Confirmation';
import UpdateParts from '../../components/UpdateParts';
import config from '../../config/config';
import { useNavigate } from 'react-router-dom';

const NonChargeableShow = ({id, closeButton, approveSuccess }) => {
    const navigate = useNavigate();
    const roles = JSON.parse(localStorage.getItem('roles'));
    const [item, setItem] = useState({});
    const [updatedDetails, setUpdatedDetails] = useState({
        customer_id: '',
        customer_name: '',
        customer_address: '',
        fleet_number: '',
        brand: '',
        model: '',
        serial_number: '',
    });
    const [updatedDetailsErrors, setUpdatedDetailsErrors] = useState([]);
    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFsrr, setShowFsrr] = useState(false);
    const [showPm, setShowPm] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [showLogs, setShowLogs] = useState(false);
    const [showUpdateParts, setShowUpdateParts] = useState(false);
    const [showUpdateDetails, setShowUpdateDetails] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationTitle, setConfirmationTitle] = useState('');
    const [confirmationBody, setConfirmationBody] = useState('');
    const [history, setHistory] = useState([]);
    const baseURL = config.defaults.baseURL;

    const parts_columns = [
        {'key': 'item_number', 'label': 'Item Number', 'className': 'py-1 px-2 text-center whitespace-nowrap'},
        {'key': 'number', 'label': 'Part Number', 'className': 'py-1 px-2 text-center whitespace-nowrap'},
        {'key': 'name', 'label': 'Description', 'className': 'py-1 px-2 text-center whitespace-nowrap'},
        {'key': 'brand', 'label': 'Brand', 'className': 'py-1 px-2 text-center whitespace-nowrap'},
        {'key': 'quantity', 'label': 'Quantity', 'className': 'py-1 px-2 text-center whitespace-nowrap'},
        {'key': 'price', 'label': 'Price (₱)', 'className': 'py-1 px-2 text-center whitespace-nowrap'},
        {'key': 'total_price', 'label': 'Total Price (₱)', 'className': 'py-1 px-2 text-center whitespace-nowrap'},
        {'key': 'doc_number', 'label': 'Document Number', 'className': 'py-1 px-2 text-center whitespace-nowrap'},
        {'key': 'dr_number', 'label': 'DR Number', 'className': 'py-1 px-2 text-center whitespace-nowrap'},
    ]

    const updateDateFormat = () => {
        setItem((prevItem) => ({
            ...prevItem,

            date_requested: new Date(prevItem.date_requested).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "2-digit",}),
            time_requested: new Date(prevItem.date_requested).toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit", hour12: true,}),

            date_validated: prevItem.validated_at && new Date(prevItem.validated_at).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "2-digit",}),
            time_validated: prevItem.validated_at && new Date(prevItem.validated_at).toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit", hour12: true,}),

            date_parts_approved: prevItem.parts_approved_at && new Date(prevItem.parts_approved_at).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "2-digit",}),
            time_parts_approved: prevItem.parts_approved_at && new Date(prevItem.parts_approved_at).toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit", hour12: true,}),

            date_service_head_approved: prevItem.service_head_approved_at && new Date(prevItem.service_head_approved_at).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "2-digit",}),
            time_service_head_approved: prevItem.service_head_approved_at && new Date(prevItem.service_head_approved_at).toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit", hour12: true,}),

            date_rental_approved: prevItem.rental_approved_at && new Date(prevItem.rental_approved_at).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "2-digit",}),
            time_rental_approved: prevItem.rental_approved_at && new Date(prevItem.rental_approved_at).toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit", hour12: true,}),

            date_mri_number_encoded: prevItem.mri_number_encoded_at && new Date(prevItem.mri_number_encoded_at).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "2-digit",}),
            time_mri_number_encoded: prevItem.mri_number_encoded_at && new Date(prevItem.mri_number_encoded_at).toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit", hour12: true,}),

            date_needed: new Date(prevItem.date_needed).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "2-digit",}),
        }));
    };
    
    const getItem = async() => {
        try {
            const response = await getById(id);
            setItem(response[0]);
            updateDateFormat();
        } catch (error) {
            console.log(error);
        }
    }

    const getParts = async() => {
        try {
            const response = await getByRequestId(id);
            setParts(response);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getItem();
        getParts();
    }, [])

    const handleCloseImageViewer = (e) => {
        if (e.target.closest('img')) return;
        setShowFsrr(false);
        setShowPm(false);
    }

    const handleShowHistory = async (fleet_number) => {
        setLoading(true);

        try {
            const response = await getByFleetNumber(fleet_number);
            setHistory(response);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }

        setShowHistory(true);
        setLoading(false);
    }

    const handleApproveSuccess = (message) => {
        approveSuccess(message);
        setShowConfirmation(false);
    }

    const handleShowUpdateDetails = () => {
        setUpdatedDetails({
            customer_id: item.customer_id,
            customer_name: item.customer_name,
            customer_address: item.customer_address,
            fleet_number: item.fleet_number,
            brand: item.brand,
            model: item.model,
            serial_number: item.serial_number,
        });
        setShowUpdateDetails(true);
        setUpdatedDetailsErrors([]);
    }

    const handleUpdateDetails = async () => {
        const id = item.id;
        const emptyFields = Object.keys(updatedDetails).filter(key => updatedDetails[key] === "");
        setUpdatedDetailsErrors(emptyFields);
        if(emptyFields.length === 0){
            try {
                const response = await updateDetails(id, updatedDetails);
                if(response.status === 201){
                    approveSuccess(response.data.message);
                }
            } catch (error) {
                console.log(error);
            }
            setShowUpdateDetails(false)
        }
    }

    return (
        <>
            {/* Modals */}
            <>
                {/* FSRR VIEWER */}
                {
                    showFsrr &&
                    <ImageViewer path={baseURL + '/MRF/'+item.fsrr_attachment}  closeButton={(e) => handleCloseImageViewer(e)} alt="fsrr" />
                }

                {/* PM VIEWER */}
                {
                    showPm &&
                    <ImageViewer path={baseURL + '/MRF/'+item.pm_attachment}  closeButton={(e) => handleCloseImageViewer(e)} alt="pm report" />
                }

                {/* HISTORY */}
                {
                    showHistory &&
                    <FleetHistory fleetNumber={item.fleet_number} history={history} closeButton={() => setShowHistory(false)} />
                }

                {/* CONFIRMATION */}
                {
                    showConfirmation &&
                    <Confirmation id={item.id} parts={parts} title={confirmationTitle} body={confirmationBody} approveSuccess={(message) => handleApproveSuccess(message)} closeButton={() => setShowConfirmation(false)} />
                }

                {/* LOGS */}
                {
                    <LogViewer logs={item.logs} closeButton={() => setShowLogs(false)} show={showLogs}/>
                }

                {
                    showUpdateDetails && 
                    <div className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900/30 z-100'>
                        <div className='bg-white dark:bg-neutral-600 w-[55vw] min-w-[500px] rounded text-neutral-600 dark:text-neutral-50'>
                            <div className='w-full p-6 border-b border-neutral-300 text-xl leading-5 font-bold flex justify-center items-center'>
                                <h1>Update Details</h1>
                            </div>
                            <div className='w-full h-[calc(100%-158px)] p-6 font-medium flex flex-col'>
                                <div className='flex flex-col w-full px-3'>
                                    <h1 className='text-xs 2xl:text-sm'>Customer Name</h1>
                                    <input onChange={(e) => setUpdatedDetails({...updatedDetails, customer_name: e.target.value})} value={updatedDetails.customer_name} className={`w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900 ${updatedDetailsErrors.includes('customer_name') && 'bg-red-200'}`} />
                                </div>
                                <div className='flex flex-col w-full px-3 mt-3'>
                                    <h1 className='text-xs 2xl:text-sm'>Customer Address</h1>
                                    <input onChange={(e) => setUpdatedDetails({...updatedDetails, customer_address: e.target.value})} value={updatedDetails.customer_address} className={`w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900 ${updatedDetailsErrors.includes('customer_address') && 'bg-red-200'}`} />
                                </div>
                                <div className='flex gap-x-6 mt-3'>
                                    <div className='flex flex-col w-1/2 pl-3'>
                                        <h1 className='text-xs 2xl:text-sm'>Brand</h1>
                                        <select onChange={(e) => setUpdatedDetails({...updatedDetails, brand: e.target.value})} value={updatedDetails.brand} className='w-full text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>
                                            <option value="TOYOTA">TOYOTA</option>
                                            <option value="BT">BT</option>
                                            <option value="RAYMOND">RAYMOND</option>
                                        </select>
                                    </div>
                                    <div className='flex flex-col w-1/2 pr-3'>
                                        <h1 className='text-xs 2xl:text-sm'>Model</h1>
                                        <input onChange={(e) => setUpdatedDetails({...updatedDetails, model: e.target.value})} value={updatedDetails.model} className={`w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900 ${updatedDetailsErrors.includes('model') && 'bg-red-200'}`} />
                                    </div>
                                </div>

                                <div className='flex gap-x-6 mt-3'>
                                    <div className='flex flex-col w-1/2 pl-3'>
                                        <h1 className='text-xs 2xl:text-sm'>Fleet Number</h1>
                                        <input onChange={(e) => setUpdatedDetails({...updatedDetails, fleet_number: e.target.value})} value={updatedDetails.fleet_number} className={`w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900 ${updatedDetailsErrors.includes('fleet_number') && 'bg-red-200'}`} />
                                    </div>
                                    <div className='flex flex-col w-1/2 pr-3'>
                                        <h1 className='text-xs 2xl:text-sm'>Serial Number</h1>
                                        <input onChange={(e) => setUpdatedDetails({...updatedDetails, serial_number: e.target.value})} value={updatedDetails.serial_number} className={`w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900 ${updatedDetailsErrors.includes('serial_number') && 'bg-red-200'}`} />
                                    </div>
                                </div>
                            </div>
                            <div className='w-full p-6 border-t border-neutral-300 flex gap-x-3'>
                                <Button color='blue' onClick={handleUpdateDetails} className="w-32">Update</Button>
                                <Button color='gray' onClick={() => setShowUpdateDetails(false)} className="w-32">Close</Button>
                            </div>
                        </div>
                    </div>
                }

                {
                    showUpdateParts &&
                    <UpdateParts parts={parts} id={item.id} msg={(msg) => approveSuccess(msg)} closeButton={() => setShowUpdateParts(false)} ></UpdateParts>
                }
            </>

            <div onClick={(e) => setShowLogs(false)} className='fixed left-0 top-0 w-screen h-screen bg-neutral-900/50 flex items-center justify-center z-99'>
                <div className='w-10/12 h-11/12 bg-neutral-50 dark:bg-neutral-700 rounded flex flex-col relative'>
                    { loading && 
                        <div className='w-full h-full absolute bg-neutral-700/60 dark:bg-neutral-700/90 z-99 flex items-center justify-center text-white dark:text-neutral-100'>
                            <div className='animate-spin border-[3px] border-t-transparent w-6 h-6 rounded-full'></div>
                            <span className='ms-2 font-semibold'>Loading...</span>
                        </div>
                    }
                    
                    {/* Header */}
                    <div className='w-full bg-neutral-50 dark:bg-neutral-700 rounded-t border-b-2 border-neutral-200 text-neutral-600 dark:text-neutral-200 shadow flex items-center justify-between p-6'>
                        <h1 className='text-xl font-semibold leading-5'>{item.mrf_number}</h1>
                        <div className='flex gap-x-2'>
                            {
                                item.is_validated == 0 &&
                                <>
                                    <button onClick={() => navigate(`/non-chargeable/edit/${item.id}`)} type='button' className="cursor-pointer hover:text-neutral-600">
                                        <IconRenderer name="edit" className="w-5 h-5"/>
                                    </button>
                                    <button onClick={() => navigate(`/non-chargeable/edit/${item.id}`)} type='button' className="cursor-pointer text-red-500 hover:text-red-600">
                                        <IconRenderer name="cancel" className="w-5 h-5"/>
                                    </button>
                                </>
                            }
                            <button type='button' onClick={(e) => {e.stopPropagation(); setShowLogs(true);}} className="cursor-pointer hover:text-neutral-600">
                                <IconRenderer name="logs" className="w-5 h-5"/>
                            </button>
                            <button type='button' onClick={closeButton} className="cursor-pointer hover:text-neutral-600">
                                <IconRenderer name="close" className="w-5 h-5"/>
                            </button>
                        </div>
                    </div>


                    {/* Body */}
                    <div className='w-full h-full bg-neutral-50 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-200 shadow p-6 overflow-auto'>
                        {/* Stepper */}
                        <div className="w-full mb-6">
                            <ol className="flex items-center w-full">
                                {/* Requested */}
                                <li className="relative flex flex-col items-center text-green-600 w-full h-20">
                                    <span className='h-6 w-3'></span>
                                    <div className="absolute top-6 w-7 h-7 border-2 border-green-600 rounded-[6px] bg-green-600 text-white z-10 cursor-default transition-all duration-500 ease-in-out hover:w-44 hover:h-20 hover:-top-0.5 group">
                                        <span className='absolute left-1/2 top-1/2 -translate-1/2 transition-all duration-500 ease-in-out group-hover:top-4 font-bold'>✓</span>
                                        <span className='absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap opacity-0 transition-all duration-500 ease-in-out group-hover:top-8 group-hover:opacity-100 text-sm font-bold'>{item.requested_by}</span>
                                        <span className='absolute left-1/2 top-[calc(100%+16px)] -translate-x-1/2 whitespace-nowrap opacity-0 transition-all duration-500 ease-in-out group-hover:top-12 group-hover:opacity-100 text-sm font-bold'>{item.date_requested+' '+item.time_requested}</span>
                                    </div>
                                    <span className="mt-9 text-sm font-medium text-gray-500">Requested</span>
                                    {/*  Line  */}
                                    <div className="absolute top-[36px] left-[calc(50%+14px)] w-[calc(100%-28px)] h-1 bg-green-600"></div>
                                </li>

                                {/* Validated */}
                                <li className="relative flex flex-col items-center text-green-600 w-full h-20">
                                    {/* Arrow Down */}
                                    <span className='h-6 w-3 text-gray-500 animate-bounce'>{ item.is_validated == 0 ? '⋎' : '' }</span>
                                    {/* Box */}
                                    <div className={`absolute top-6 w-7 h-7 border-2 rounded-[6px] z-10 cursor-default transition-[width,height,top,border-radius] duration-500 ease-in-out group ${item.is_validated == 1 ? 'hover:w-44 hover:h-20 hover:-top-0.5 border-green-600 bg-green-600 text-white' : 'border-gray-400 bg-white text-gray-400'}`}>
                                        {/* Check or Number */}
                                        <span className={`absolute left-1/2 top-1/2 -translate-1/2 transition-[top] duration-500 ease-in-out font-bold ${item.is_validated == 1 ? 'group-hover:top-4' : ''}`}>{item.is_validated == 1 ? '✓' : '2' }</span>
                                        {/* Name and Date */}
                                        {item.is_validated == 1 && 
                                            <>
                                                <span className='absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap opacity-0 transition-all duration-500 ease-in-out group-hover:top-8 group-hover:opacity-100 text-sm font-bold'>{item.validated_by}</span>
                                                <span className='absolute left-1/2 top-[calc(100%+16px)] -translate-x-1/2 whitespace-nowrap opacity-0 transition-all duration-500 ease-in-out group-hover:top-12 group-hover:opacity-100 text-sm font-bold'>{item.date_validated+' '+item.time_validated}</span>
                                            </> 
                                        }
                                    </div>
                                    <span className="mt-9 text-sm font-medium text-gray-500">Validated</span>
                                    {/* Line */}
                                    <div className={`absolute top-[36px] left-[calc(50%+14px)] w-[calc(100%-28px)] h-1 ${item.is_validated == 1 ? 'bg-green-600' : 'bg-gray-400'}`}></div>
                                </li>

                                {/* Parts Verified */}
                                <li className="relative flex flex-col items-center text-green-600 w-full h-20">
                                    {/* Arrow Down */}
                                    <span className='h-6 w-3 text-gray-500 animate-bounce'>{ item.is_validated == 1 && item.is_parts_approved == 0 ? '⋎' : '' }</span>
                                    {/* Box */}
                                    <div className={`absolute top-6 w-7 h-7 border-2 rounded-[6px] z-10 cursor-default transition-[width,height,top,border-radius] duration-500 ease-in-out group ${item.is_parts_approved == 1 ? 'hover:w-44 hover:h-20 hover:-top-0.5 border-green-600 bg-green-600 text-white' : 'border-gray-400 bg-white text-gray-400'}`}>
                                        {/* Check or Number */}
                                        <span className={`absolute left-1/2 top-1/2 -translate-1/2 transition-[top] duration-500 ease-in-out font-bold ${item.is_parts_approved == 1 ? 'group-hover:top-4' : ''}`}>{item.is_parts_approved == 1 ? '✓' : '3' }</span>
                                        {/* Name and Date */}
                                        {item.is_parts_approved == 1 && 
                                            <>
                                                <span className='absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap opacity-0 transition-all duration-500 ease-in-out group-hover:top-8 group-hover:opacity-100 text-sm font-bold'>{item.parts_approved_by}</span>
                                                <span className='absolute left-1/2 top-[calc(100%+16px)] -translate-x-1/2 whitespace-nowrap opacity-0 transition-all duration-500 ease-in-out group-hover:top-12 group-hover:opacity-100 text-sm font-bold'>{item.date_parts_approved+' '+item.time_parts_approved}</span>
                                            </> 
                                        }
                                    </div>
                                    <span className="mt-9 text-sm font-medium text-gray-500">Parts Verified</span>
                                    {/* Line */}
                                    <div className={`absolute top-[36px] left-[calc(50%+14px)] w-[calc(100%-28px)] h-1 ${item.is_parts_approved == 1 ? 'bg-green-600' : 'bg-gray-400'}`}></div>
                                </li>

                                {/* Service */}
                                <li className="relative flex flex-col items-center text-green-600 w-full h-20">
                                    {/* Arrow Down */}
                                    <span className='h-6 w-3 text-gray-500 animate-bounce'>{ item.is_parts_approved == 1 && item.is_service_head_approved == 0 ? '⋎' : '' }</span>
                                    {/* Box */}
                                    <div className={`absolute top-6 w-7 h-7 border-2 rounded-[6px] z-10 cursor-default transition-[width,height,top,border-radius] duration-500 ease-in-out group ${item.is_service_head_approved == 1 ? 'hover:w-44 hover:h-20 hover:-top-0.5 border-green-600 bg-green-600 text-white' : 'border-gray-400 bg-white text-gray-400'}`}>
                                        {/* Check or Number */}
                                        <span className={`absolute left-1/2 top-1/2 -translate-1/2 transition-[top] duration-500 ease-in-out font-bold ${item.is_service_head_approved == 1 ? 'group-hover:top-4' : ''}`}>{item.is_service_head_approved == 1 ? '✓' : '4' }</span>
                                        {/* Name and Date */}
                                        {item.is_service_head_approved == 1 && 
                                            <>
                                                <span className='absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap opacity-0 transition-all duration-500 ease-in-out group-hover:top-8 group-hover:opacity-100 text-sm font-bold'>{item.service_head_approved_by}</span>
                                                <span className='absolute left-1/2 top-[calc(100%+16px)] -translate-x-1/2 whitespace-nowrap opacity-0 transition-all duration-500 ease-in-out group-hover:top-12 group-hover:opacity-100 text-sm font-bold'>{item.date_service_head_approved+' '+item.time_service_head_approved}</span>
                                            </> 
                                        }
                                    </div>
                                    <span className="mt-9 text-sm font-medium text-gray-500">Service</span>
                                    {/* Line */}
                                    <div className={`absolute top-[36px] left-[calc(50%+14px)] w-[calc(100%-28px)] h-1 ${item.is_service_head_approved == 1 ? 'bg-green-600' : 'bg-gray-400'}`}></div>
                                </li>

                                {/* Rental */}
                                <li className="relative flex flex-col items-center text-green-600 w-full h-20">
                                    {/* Arrow Down */}
                                    <span className='h-6 w-3 text-gray-500 animate-bounce'>{ item.is_service_head_approved == 1 && item.is_rental_approved == 0 ? '⋎' : '' }</span>
                                    {/* Box */}
                                    <div className={`absolute top-6 w-7 h-7 border-2 rounded-[6px] z-10 cursor-default transition-[width,height,top,border-radius] duration-500 ease-in-out group ${item.is_rental_approved == 1 ? 'hover:w-44 hover:h-20 hover:-top-0.5 border-green-600 bg-green-600 text-white' : 'border-gray-400 bg-white text-gray-400'}`}>
                                        {/* Check or Number */}
                                        <span className={`absolute left-1/2 top-1/2 -translate-1/2 transition-[top] duration-500 ease-in-out font-bold ${item.is_rental_approved == 1 ? 'group-hover:top-4' : ''}`}>{item.is_rental_approved == 1 ? '✓' : '5' }</span>
                                        {/* Name and Date */}
                                        {item.is_rental_approved == 1 && 
                                            <>
                                                <span className='absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap opacity-0 transition-all duration-500 ease-in-out group-hover:top-8 group-hover:opacity-100 text-sm font-bold'>{item.rental_approved_by}</span>
                                                <span className='absolute left-1/2 top-[calc(100%+16px)] -translate-x-1/2 whitespace-nowrap opacity-0 transition-all duration-500 ease-in-out group-hover:top-12 group-hover:opacity-100 text-sm font-bold'>{item.date_rental_approved+' '+item.time_rental_approved}</span>
                                            </> 
                                        }
                                    </div>
                                    <span className="mt-9 text-sm font-medium text-gray-500">Rental</span>
                                    {/* Line */}
                                    <div className={`absolute top-[36px] left-[calc(50%+14px)] w-[calc(100%-28px)] h-1 ${item.is_rental_approved == 1 ? 'bg-green-600' : 'bg-gray-400'}`}></div>
                                </li>
                                
                                {/* MRI Number */}
                                <li className="relative flex flex-col items-center text-green-600 w-full h-20">
                                    {/* Arrow Down */}
                                    <span className='h-6 w-3 text-gray-500 animate-bounce'>{ item.is_rental_approved == 1 && item.is_mri_number_encoded == 0 ? '⋎' : '' }</span>
                                    {/* Box */}
                                    <div className={`absolute top-6 w-7 h-7 border-2 rounded-[6px] z-10 cursor-default transition-[width,height,top,border-radius] duration-500 ease-in-out group ${item.is_mri_number_encoded == 1 ? 'hover:w-44 hover:h-20 hover:-top-0.5 border-green-600 bg-green-600 text-white' : 'border-gray-400 bg-white text-gray-400'}`}>
                                        {/* Check or Number */}
                                        <span className={`absolute left-1/2 top-1/2 -translate-1/2 transition-[top] duration-500 ease-in-out font-bold ${item.is_mri_number_encoded == 1 ? 'group-hover:top-4' : ''}`}>{item.is_mri_number_encoded == 1 ? '✓' : '6' }</span>
                                        {/* Name and Date */}
                                        {item.is_mri_number_encoded == 1 && 
                                            <>
                                                <span className='absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap opacity-0 transition-all duration-500 ease-in-out group-hover:top-8 group-hover:opacity-100 text-sm font-bold'>{item.mri_number_encoder}</span>
                                                <span className='absolute left-1/2 top-[calc(100%+16px)] -translate-x-1/2 whitespace-nowrap opacity-0 transition-all duration-500 ease-in-out group-hover:top-12 group-hover:opacity-100 text-sm font-bold'>{item.date_mri_number_encoded+' '+item.time_mri_number_encoded}</span>
                                            </> 
                                        }
                                    </div>
                                    <span className="mt-9 text-sm font-medium text-gray-500">MRI Number</span>
                                    {/* Line */}
                                    <div className={`absolute top-[36px] left-[calc(50%+14px)] w-[calc(100%-28px)] h-1 ${item.is_mri_number_encoded == 1 ? 'bg-green-600' : 'bg-gray-400'}`}></div>
                                </li>

                                {/* Doc Number */}
                                <li className="relative flex flex-col items-center text-green-600 w-full">
                                    <span className='h-6 w-3 text-gray-500 animate-bounce'>{ item.is_mri_number_encoded == 1 && item.is_doc_number_encoded != 1 ? '⋎' : '' }</span>
                                    <div className={`flex items-center justify-center w-7 h-7 border-2 rounded font-bold ${item.is_doc_number_encoded == 1 ? 'border-green-600 bg-green-600 text-white' : 'border-gray-400 bg-white text-gray-400' }`}>
                                        {item.is_doc_number_encoded == 1 ? '✓' : '7' }
                                    </div>
                                    <span className="mt-2 text-sm font-medium text-gray-500">Doc Number</span>
                                    {/*  Line  */}
                                    <div className={`absolute top-[36px] left-[calc(50%+14px)] w-[calc(100%-28px)] h-1 ${item.is_doc_number_encoded == 1 ? 'bg-green-600' : 'bg-gray-400' }`}></div>
                                </li>

                                {/* DR Number */}
                                <li className="relative flex flex-col items-center text-green-600 w-full">
                                    <span className='h-6 w-3 text-gray-500 animate-bounce'>{ item.is_doc_number_encoded == 1 && item.is_dr_number_encoded != 1 ? '⋎' : '' }</span>
                                    <div className={`flex items-center justify-center w-7 h-7 border-2 rounded font-bold ${item.is_dr_number_encoded == 1 ? 'border-green-600 bg-green-600 text-white' : 'border-gray-400 bg-white text-gray-400' }`}>
                                        {item.is_dr_number_encoded == 1 ? '✓' : '8' }
                                    </div>
                                    <span className="mt-2 text-sm font-medium text-gray-500">DR Number</span>
                                </li>
                            </ol>
                        </div>

                        {/* Details */}
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
                                        <div className='relative flex'>
                                            <div className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900  relative'>{item.for}</div>
                                            <button onClick={() => setShowPm(true)} className={`h-[calc(100%-8px)] aspect-square bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded shadow shadow-neutral-500 dark:shadow-neutral-900 absolute right-1 top-1 cursor-pointer p-0.5 2xl:p-1 ${item.for !== 'PM' ? 'hidden' : ''}`}>
                                                <IconRenderer name="visibility" className="w-5 h-5"/>
                                            </button>
                                        </div>
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
                                        <h1 className='text-xs 2xl:text-sm'>FSRR Number</h1>
                                        <div className='flex relative'>
                                            <div className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>{item.fsrr_number}</div>
                                            <button onClick={() => setShowFsrr(true)} className='h-[calc(100%-8px)] aspect-square bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded shadow shadow-neutral-500 dark:shadow-neutral-900 absolute right-1 top-1 cursor-pointer p-0.5 2xl:p-1'>
                                                <IconRenderer name="visibility" className="w-5 h-5"/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='flex flex-col w-1/5 pr-3'>
                                        <h1 className='text-xs 2xl:text-sm'>Fleet Number</h1>
                                        <div className='flex relative'>
                                            <div className='w-full flex items-center text-sm h-8 leading-3.5 2xl:text-base 2xl:leading-4 2xl:h-9 font-semibold rounded px-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900'>{item.fleet_number}</div>
                                            <button onClick={() => handleShowHistory(item.fleet_number)} className='h-[calc(100%-8px)] aspect-square bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded shadow shadow-neutral-500 dark:shadow-neutral-900 absolute right-1 top-1 cursor-pointer p-0.5 2xl:p-1'>
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
                                        <div className='w-full flex items-start text-sm h-18 leading-4.5 2xl:text-base 2xl:leading-5 2xl:h-20 font-semibold rounded px-2 py-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900 overflow-auto whitespace-pre-wrap'>{item.request_remarks}</div>
                                    </div>
                                </div>
                                {
                                    item.is_parts_approved === 1 &&
                                    <div className='flex w-full'>
                                        <div className='flex flex-col w-full'>
                                            <h1 className='text-xs 2xl:text-sm'>Parts Remarks</h1>
                                            <div className='w-full flex items-start text-sm h-18 leading-4.5 2xl:text-base 2xl:leading-5 2xl:h-20 font-semibold rounded px-2 py-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900 overflow-auto whitespace-pre-wrap'>{item.parts_approved_remarks}</div>
                                        </div>
                                    </div>
                                }
                                {
                                    item.is_service_head_approved === 1 &&
                                    <div className='flex w-full'>
                                        <div className='flex flex-col w-full'>
                                            <h1 className='text-xs 2xl:text-sm'>Service Remarks</h1>
                                            <div className='w-full flex items-start text-sm h-18 leading-4.5 2xl:text-base 2xl:leading-5 2xl:h-20 font-semibold rounded px-2 py-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900 overflow-auto whitespace-pre-wrap'>{item.service_head_approved_remarks}</div>
                                        </div>
                                    </div>
                                }
                                {
                                    item.is_rental_approved === 1 &&
                                    <div className='flex w-full'>
                                        <div className='flex flex-col w-full'>
                                            <h1 className='text-xs 2xl:text-sm'>Rental Remarks</h1>
                                            <div className='w-full flex items-start text-sm h-18 leading-4.5 2xl:text-base 2xl:leading-5 2xl:h-20 font-semibold rounded px-2 py-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900 overflow-auto whitespace-pre-wrap'>{item.rental_approved_remarks}</div>
                                        </div>
                                    </div>
                                }
                                {
                                    item.is_mri_number_encoded === 1 &&
                                    <div className='flex w-full'>
                                        <div className='flex flex-col w-full'>
                                            <h1 className='text-xs 2xl:text-sm'>MRI Number</h1>
                                            <div className='w-80 flex items-start text-sm leading-4.5 2xl:text-base 2xl:leading-5 2xl:h-20 font-semibold rounded px-2 py-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 shadow-inner shadow-neutral-400 dark:shadow-neutral-900 overflow-auto whitespace-pre-wrap'>{item.mri_number}</div>
                                        </div>
                                    </div>
                                }

                            </div>

                            <h1 className='text-xl font-bold tracking-wide mt-6 leading-5 mb-3'>Part/s Requested</h1>
                            <div className='w-full'>
                                <Table columns={parts_columns} collection={parts} loading={loading}></Table>
                            </div>
                        </div>
                    </div>


                    {/* Footer */}
                    <div className='w-full bg-neutral-50 dark:bg-neutral-700 border-t border-neutral-200 rounded-b p-6 flex items-center gap-x-3'>
                        {   (
                                (item.is_validated == 0 && (roles.find(role => role.area_id === item.area_id)?.role == 'site_tl' || roles.find(role => role.area_id === item.area_id)?.role == 'site_supv'))
                            ) &&
                            <Button color="blue" onClick={() => {setShowConfirmation(true); setConfirmationTitle('Validate'); setConfirmationBody('Are you sure you want to validate this request?') }}>VALIDATE</Button>
                        }
                        
                        {  (
                                (item.is_validated == 1 && item.is_parts_approved == 0 && roles.find(role => role.area_id === item.area_id)?.role == 'svc_tech')
                            ) &&
                            <>
                                <Button color='orange' onClick={() => setShowUpdateParts(true)} >Update Parts</Button>
                                <Button color='red' onClick={() => {setShowConfirmation(true); setConfirmationTitle('Return to Requestor'); setConfirmationBody('Are you sure you want to return the request to requestor?') }} >Return</Button>
                                <Button color="blue" onClick={() => {setShowConfirmation(true); setConfirmationTitle('Verify Parts'); setConfirmationBody('Are you sure you want to mark the parts as verified?') }}>Verify Parts</Button>
                            </>
                        }
                        
                        {  (
                                (item.is_parts_approved == 1 && item.is_service_head_approved == 0 && roles.find(role => role.area_id === item.area_id)?.role == 'svc_head')
                            ) &&
                                <>
                                    <Button color='red' >Return to Requestor</Button>
                                    <Button color="blue" onClick={() => {setShowConfirmation(true); setConfirmationTitle('Approve'); setConfirmationBody('Are you sure you want to approve this request?') }}>Approve</Button>
                                </>
                            }

                        
                        {  (
                                (item.is_service_head_approved == 1 && item.is_rental_approved == 0 && roles[0].role == 'rental')
                            ) && 
                            <>
                                <Button color='orange' onClick={handleShowUpdateDetails}>Update Details</Button>
                                <Button color="blue" onClick={() => {setShowConfirmation(true); setConfirmationTitle('Verify Details'); setConfirmationBody('Are you sure you want to verify the details of this request?') }}>Verify Details</Button>
                            </>
                        }
                        
                        {  (
                                (item.is_service_head_approved == 1 && (item.mri_number == '' || item.mri_number == null) && roles[0].role == 'mri')
                            ) && 
                            <Button color="blue" onClick={() => {setShowConfirmation(true); setConfirmationTitle('MRI'); setConfirmationBody('') }}>Encode MRI Number</Button>
                        }

                        
                        {  (
                                ((item.mri_number != '' || item.mri_number != null) && item.is_doc_number_encoded !== 1 && roles[0].role == 'doc_enc')
                            ) && 
                            <Button color="blue" onClick={() => {setShowConfirmation(true); setConfirmationTitle('DOCUMENT NUMBER'); setConfirmationBody('') }}>Encode Document Number</Button>
                        }

                        
                        {  (
                                ((parts.filter((pid) => pid.doc_number !== null).length) > parts.filter(part => part.dr_number !== null).length && item.is_dr_number_encoded == 0 && roles[0].role == 'dr_enc')
                            ) && 
                            <Button color="blue" onClick={() => {setShowConfirmation(true); setConfirmationTitle('DR NUMBER'); setConfirmationBody('') }}>Encode DR Number</Button>
                        }

                        <Button color="white" onClick={closeButton}>CLOSE</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NonChargeableShow