import { useEffect, useState } from 'react';
import IconRenderer from '../../components/icons';
import config from '../../config/config';
import { getById, getByRequestId } from '../../services/nonChargeableService'
import { useParams } from 'react-router-dom';

function NonChargableReport() {
    const baseURL = config.defaults.baseURL;
    const { id } = useParams();
    const [item, setItem] = useState({});
    const [parts, setParts] = useState([]);
    
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

            date_returned: prevItem.returned_at && new Date(prevItem.returned_at).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "2-digit",}),
            time_returned: prevItem.returned_at && new Date(prevItem.returned_at).toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit", hour12: true,}),

            date_cancelled: prevItem.cancelled_at && new Date(prevItem.cancelled_at).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "2-digit",}),
            time_cancelled: prevItem.cancelled_at && new Date(prevItem.cancelled_at).toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit", hour12: true,}),

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
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getItem();
        getParts();
        // window.print();
    }, [])

    return (
        <>
            <div className='w-screen min-h-screen fixed top-0 left-0 bg-white px-10 text-neutral-800 pt-0'>
                <div className='h-24 flex flex-col justify-center items-center'>
                    <h1 className='text-xl font-black'>HANDLING INNOVATION INC.</h1>
                    <p className='text-sm'>Dow Jones Bldg., Whse5A, KM 19, WSR, SSH, Parañaque City</p>
                </div>
                {/* <div className='h-full flex flex-col justify-between'> */}
                    <div className='w-full'>
                        <h1 className='text-base font-bold py-1 text-center border-y-2 border-neutral-500'>Material Requisition Form</h1>

                        {/* Request Details */}
                        <>
                            <div className='w-full grid grid-cols-3 justify-between mt-3 gap-x-6'>
                                <div className='text-xs col-span-1 flex'>
                                    <span className='pr-1'>MRF No:</span> 
                                    <span className='inline-block border-b border-neutral-500 text-center font-medium flex-1'>{item.mrf_number}</span>
                                </div>
                                <div className='text-xs col-span-1 flex'>
                                    <span className='pr-1'>FSRR No:</span> 
                                    <span className='inline-block border-b border-neutral-500 text-center font-medium flex-1'>{item.fsrr_number}</span>
                                </div>
                                <div className='text-xs col-span-1 flex'>
                                    <span className='pr-1'>MRI No:</span> 
                                    <span className='inline-block border-b border-neutral-500 text-center font-medium flex-1'>{item.mri_number}</span>
                                </div>
                            </div>
                            <div className='w-full grid grid-cols-3 justify-between mt-3 gap-x-6'>
                                <div className='text-xs col-span-1 flex'>
                                    <span className='pr-1'>Order Type:</span> 
                                    <span className='inline-block border-b border-neutral-500 text-center font-medium flex-1'>{item.order_type}</span>
                                </div>
                                <div className='text-xs col-span-1 flex'>
                                    <span className='pr-1'>Delivery Type:</span> 
                                    <span className='inline-block border-b border-neutral-500 text-center font-medium flex-1'>{item.delivery_type}</span>
                                </div>
                                <div className='text-xs col-span-1 flex'>
                                    <span className='pr-1'>Date Needed:</span> 
                                    <span className='inline-block border-b border-neutral-500 text-center font-medium flex-1'>{item.date_needed}</span>
                                </div>
                            </div>
                            <div className='w-full grid grid-cols-3 mt-3 gap-x-6'>
                                <div className='text-xs col-span-2 flex'>
                                    <span className='pr-1'>Customer Name:</span> 
                                    <span className='inline-block border-b border-neutral-500 pl-3 flex-1 text-left font-medium'>{item.customer_name}</span>
                                </div>
                                <div className='text-xs col-span-1 flex'>
                                    <span className='pr-1'>Area:</span> 
                                    <span className='inline-block border-b border-neutral-500 flex-1 text-center font-medium'>{item.area}</span>
                                </div>
                            </div>
                            <div className='w-full mt-3 gap-x-6'>
                                <div className='text-xs w-full flex'>
                                    <span className='pr-1'>Customer Address:</span> 
                                    <span className='inline-block border-b border-neutral-500 pl-3 flex-1 text-left font-medium'>{item.customer_address}</span>
                                </div>
                            </div>
                            <div className='w-full grid grid-cols-4 justify-between mt-3 gap-x-6'>
                                <div className='text-xs col-span-1 flex'>
                                    <span className='pr-1'>Fleet No:</span> 
                                    <span className='inline-block border-b border-neutral-500 text-center font-medium flex-1'>{item.fleet_number}</span>
                                </div>
                                <div className='text-xs col-span-1 flex'>
                                    <span className='pr-1'>Brand:</span> 
                                    <span className='inline-block border-b border-neutral-500 text-center font-medium flex-1'>{item.brand}</span>
                                </div>
                                <div className='text-xs col-span-1 flex'>
                                    <span className='pr-1'>Model:</span> 
                                    <span className='inline-block border-b border-neutral-500 text-center font-medium flex-1'>{item.model}</span>
                                </div>
                                <div className='text-xs col-span-1 flex'>
                                    <span className='pr-1'>Serial No:</span> 
                                    <span className='inline-block border-b border-neutral-500 text-center font-medium flex-1'>{item.serial_number}</span>
                                </div>
                            </div>
                            <div className='w-full mt-3 gap-x-6'>
                                <div className='text-xs w-full flex flex-col'>
                                    <span className='pr-1'>Request Remarks:</span> 
                                    <div className='border-b border-neutral-500 pl-3 flex-1 text-left font-medium'>{item.request_remarks}</div>
                                </div>
                            </div>
                        </>
                        
                        {/* Requested Parts */}
                        <>
                            <div className='w-full mt-8 text-sm'>
                                <table className='w-full border-b border-neutral-500'>
                                    <thead>
                                        <tr className='border-y border-neutral-500'>
                                            <th>Part No</th>
                                            <th>Item No</th>
                                            <th>Description</th>
                                            <th>Quantity</th>
                                            <th>Doc No</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-xs'>
                                        {parts.map((part) => (
                                            <tr key={part.id}>
                                                <td className='text-center'>{part.number}</td>
                                                <td className='text-center'>{part.item_number}</td>
                                                <td className='text-center'>{part.name}</td>
                                                <td className='text-center'>{part.quantity}</td>
                                                <td className='text-center'>{part.doc_number}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    </div>

                    {/* Footer */}
                    <div className='w-full absolute right-14 bottom-0 flex pl-20 pb-10 gap-x-5'>
                        {/* Requested By */}
                        <div className='text-xs w-1/5 aspect-square flex flex-col justify-between items-center'>
                            <div>Requested By:</div>
                            <img src={baseURL + '/users/signatures/sign1.png'}></img>
                            <div className='flex flex-col items-center'>
                                <span>{item.requested_by}</span>
                                <span>{item.date_requested} {item.time_requested}</span>
                            </div>
                        </div>
                        {/* Requested By */}
                        <div className='text-xs w-1/5 aspect-square flex flex-col justify-between items-center'>
                            <div>Validated By:</div>
                            <img src={baseURL + '/users/signatures/sign2.png'}></img>
                            <div className='flex flex-col items-center'>
                                <span>{item.validated_by}</span>
                                <span>{item.date_validated} {item.time_validated}</span>
                            </div>
                        </div>
                        {/* Requested By */}
                        <div className='text-xs w-1/5 aspect-square flex flex-col justify-between items-center'>
                            <div>Approved By:</div>
                            <img src={baseURL + '/users/signatures/sign3.png'}></img>
                            <div className='flex flex-col items-center'>
                                <span>{item.service_head_approved_by}</span>
                                <span>{item.date_service_head_approved} {item.time_service_head_approved}</span>
                            </div>
                        </div>
                        {/* Requested By */}
                        <div className='text-xs w-1/5 aspect-square flex flex-col justify-between items-center'>
                            <div>Checked By:</div>
                            <img src={baseURL + '/users/signatures/sign4.png'}></img>
                            <div className='flex flex-col items-center'>
                                <span>{item.rental_approved_by}</span>
                                <span>{item.date_rental_approved} {item.time_rental_approved}</span>
                            </div>
                        </div>
                        {/* Requested By */}
                        <div className='text-xs w-1/5 aspect-square flex flex-col justify-between items-center'>
                            <div>MRI Encoded By:</div>
                            <img src={baseURL + '/users/signatures/sign5.png'}></img>
                            <div className='flex flex-col items-center'>
                                <span>{item.mri_number_encoder}</span>
                                <span>{item.date_mri_number_encoded} {item.time_mri_number_encoded}</span>
                            </div>
                        </div>
                    </div>
                {/* </div> */}
            </div>
        </>
    )
}

export default NonChargableReport