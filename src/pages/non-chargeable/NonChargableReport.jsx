import { useEffect, useState } from 'react';
import IconRenderer from '../../components/icons';
import config from '../../config/config';

function NonChargableReport() {
    const baseURL = config.defaults.baseURL;
    useEffect(() => {
        // window.print();
    }, []);

    return (
        <>
            <div className='w-screen min-h-screen fixed top-0 left-0 bg-white px-10 text-neutral-800 pt-6'>
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
                                    <span className='inline-block border-b border-neutral-500 text-center font-medium flex-1'>NC0925-000001</span>
                                </div>
                                <div className='text-xs col-span-1 flex'>
                                    <span className='pr-1'>FSRR No:</span> 
                                    <span className='inline-block border-b border-neutral-500 text-center font-medium flex-1'>345680dfbhjiko</span>
                                </div>
                                <div className='text-xs col-span-1 flex'>
                                    <span className='pr-1'>MRI No:</span> 
                                    <span className='inline-block border-b border-neutral-500 text-center font-medium flex-1'>3129807</span>
                                </div>
                            </div>
                            <div className='w-full grid grid-cols-3 justify-between mt-3 gap-x-6'>
                                <div className='text-xs col-span-1 flex'>
                                    <span className='pr-1'>Order Type:</span> 
                                    <span className='inline-block border-b border-neutral-500 text-center font-medium flex-1'>RENTAL</span>
                                </div>
                                <div className='text-xs col-span-1 flex'>
                                    <span className='pr-1'>Delivery Type:</span> 
                                    <span className='inline-block border-b border-neutral-500 text-center font-medium flex-1'>REGULAR</span>
                                </div>
                                <div className='text-xs col-span-1 flex'>
                                    <span className='pr-1'>Date Needed:</span> 
                                    <span className='inline-block border-b border-neutral-500 text-center font-medium flex-1'>Nov 18, 2025</span>
                                </div>
                            </div>
                            <div className='w-full grid grid-cols-3 mt-3 gap-x-6'>
                                <div className='text-xs col-span-2 flex'>
                                    <span className='pr-1'>Customer Name:</span> 
                                    <span className='inline-block border-b border-neutral-500 pl-3 flex-1 text-left font-medium'>Momentum Merchandising Manufacturing Corp.</span>
                                </div>
                                <div className='text-xs col-span-1 flex'>
                                    <span className='pr-1'>Area:</span> 
                                    <span className='inline-block border-b border-neutral-500 flex-1 text-center font-medium'>UNILEVER GATEWAY</span>
                                </div>
                            </div>
                            <div className='w-full mt-3 gap-x-6'>
                                <div className='text-xs w-full flex'>
                                    <span className='pr-1'>Customer Address:</span> 
                                    <span className='inline-block border-b border-neutral-500 pl-3 flex-1 text-left font-medium'>No. 724 McArthur Hwy, Brgy. Bagong Ilog, Pasig City, Metro Manila, Philippines</span>
                                </div>
                            </div>
                            <div className='w-full grid grid-cols-4 justify-between mt-3 gap-x-6'>
                                <div className='text-xs col-span-1 flex'>
                                    <span className='pr-1'>Fleet No:</span> 
                                    <span className='inline-block border-b border-neutral-500 text-center font-medium flex-1'>G892</span>
                                </div>
                                <div className='text-xs col-span-1 flex'>
                                    <span className='pr-1'>Brand:</span> 
                                    <span className='inline-block border-b border-neutral-500 text-center font-medium flex-1'>TOYOTA</span>
                                </div>
                                <div className='text-xs col-span-1 flex'>
                                    <span className='pr-1'>Model:</span> 
                                    <span className='inline-block border-b border-neutral-500 text-center font-medium flex-1'>FGZN25</span>
                                </div>
                                <div className='text-xs col-span-1 flex'>
                                    <span className='pr-1'>Serial No:</span> 
                                    <span className='inline-block border-b border-neutral-500 text-center font-medium flex-1'>40499</span>
                                </div>
                            </div>
                            <div className='w-full mt-3 gap-x-6'>
                                <div className='text-xs w-full flex flex-col'>
                                    <span className='pr-1'>Request Remarks:</span> 
                                    <div className='border-b border-neutral-500 flex-1 text-left font-medium'>PM1 for the month of august 2025</div>
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
                                        <tr>
                                            <td className='text-center'>T01387</td>
                                            <td className='text-center'>1078248</td>
                                            <td className='text-center'>~SWITCH EMERGENCY POWER OFF</td>
                                            <td className='text-center'>2</td>
                                            <td className='text-center'>866342334</td>
                                        </tr>
                                        <tr>
                                            <td className='text-center'>T02693</td>
                                            <td className='text-center'>313734-000</td>
                                            <td className='text-center'>~STUD(2022)	</td>
                                            <td className='text-center'>4</td>
                                            <td className='text-center'>866342334</td>
                                        </tr>
                                        <tr>
                                            <td className='text-center'>T1001734</td>
                                            <td className='text-center'>12-XRTB9</td>
                                            <td className='text-center'>*CEIL BATT 24V/220AH</td>
                                            <td className='text-center'>1</td>
                                            <td className='text-center'>8456234647</td>
                                        </tr>
                                        <tr>
                                            <td className='text-center'>T1006415</td>
                                            <td className='text-center'>307340-000R	</td>
                                            <td className='text-center'>*A2 SPEED CONTROLLER (REPAIR) SN:6447169-004</td>
                                            <td className='text-center'>5</td>
                                            <td className='text-center'>8456234647</td>
                                        </tr>
                                        <tr>
                                            <td className='text-center'>T01387</td>
                                            <td className='text-center'>1078248</td>
                                            <td className='text-center'>~SWITCH EMERGENCY POWER OFF</td>
                                            <td className='text-center'>2</td>
                                            <td className='text-center'>866342334</td>
                                        </tr>
                                        <tr>
                                            <td className='text-center'>T02693</td>
                                            <td className='text-center'>313734-000</td>
                                            <td className='text-center'>~STUD(2022)	</td>
                                            <td className='text-center'>4</td>
                                            <td className='text-center'>866342334</td>
                                        </tr>
                                        <tr>
                                            <td className='text-center'>T1001734</td>
                                            <td className='text-center'>12-XRTB9</td>
                                            <td className='text-center'>*CEIL BATT 24V/220AH</td>
                                            <td className='text-center'>1</td>
                                            <td className='text-center'>8456234647</td>
                                        </tr>
                                        <tr>
                                            <td className='text-center'>T1006415</td>
                                            <td className='text-center'>307340-000R	</td>
                                            <td className='text-center'>*A2 SPEED CONTROLLER (REPAIR) SN:6447169-004</td>
                                            <td className='text-center'>5</td>
                                            <td className='text-center'>8456234647</td>
                                        </tr>
                                        <tr>
                                            <td className='text-center'>T01387</td>
                                            <td className='text-center'>1078248</td>
                                            <td className='text-center'>~SWITCH EMERGENCY POWER OFF</td>
                                            <td className='text-center'>2</td>
                                            <td className='text-center'>866342334</td>
                                        </tr>
                                        <tr>
                                            <td className='text-center'>T02693</td>
                                            <td className='text-center'>313734-000</td>
                                            <td className='text-center'>~STUD(2022)	</td>
                                            <td className='text-center'>4</td>
                                            <td className='text-center'>866342334</td>
                                        </tr>
                                        <tr>
                                            <td className='text-center'>T1001734</td>
                                            <td className='text-center'>12-XRTB9</td>
                                            <td className='text-center'>*CEIL BATT 24V/220AH</td>
                                            <td className='text-center'>1</td>
                                            <td className='text-center'>8456234647</td>
                                        </tr>
                                        <tr>
                                            <td className='text-center'>T1006415</td>
                                            <td className='text-center'>307340-000R	</td>
                                            <td className='text-center'>*A2 SPEED CONTROLLER (REPAIR) SN:6447169-004</td>
                                            <td className='text-center'>5</td>
                                            <td className='text-center'>8456234647</td>
                                        </tr>
                                        <tr>
                                            <td className='text-center'>T01387</td>
                                            <td className='text-center'>1078248</td>
                                            <td className='text-center'>~SWITCH EMERGENCY POWER OFF</td>
                                            <td className='text-center'>2</td>
                                            <td className='text-center'>866342334</td>
                                        </tr>
                                        <tr>
                                            <td className='text-center'>T02693</td>
                                            <td className='text-center'>313734-000</td>
                                            <td className='text-center'>~STUD(2022)	</td>
                                            <td className='text-center'>4</td>
                                            <td className='text-center'>866342334</td>
                                        </tr>
                                        <tr>
                                            <td className='text-center'>T1001734</td>
                                            <td className='text-center'>12-XRTB9</td>
                                            <td className='text-center'>*CEIL BATT 24V/220AH</td>
                                            <td className='text-center'>1</td>
                                            <td className='text-center'>8456234647</td>
                                        </tr>
                                        <tr>
                                            <td className='text-center'>T1006415</td>
                                            <td className='text-center'>307340-000R	</td>
                                            <td className='text-center'>*A2 SPEED CONTROLLER (REPAIR) SN:6447169-004</td>
                                            <td className='text-center'>5</td>
                                            <td className='text-center'>8456234647</td>
                                        </tr>
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
                                <span>John Arian Malondras</span>
                                <span>Oct 29, 2025 11:13 AM</span>
                            </div>
                        </div>
                        {/* Requested By */}
                        <div className='text-xs w-1/5 aspect-square flex flex-col justify-between items-center'>
                            <div>Requested By:</div>
                            <img src={baseURL + '/users/signatures/sign2.png'}></img>
                            <div className='flex flex-col items-center'>
                                <span>John Arian Malondras</span>
                                <span>Oct 29, 2025 11:13 AM</span>
                            </div>
                        </div>
                        {/* Requested By */}
                        <div className='text-xs w-1/5 aspect-square flex flex-col justify-between items-center'>
                            <div>Requested By:</div>
                            <img src={baseURL + '/users/signatures/sign3.png'}></img>
                            <div className='flex flex-col items-center'>
                                <span>John Arian Malondras</span>
                                <span>Oct 29, 2025 11:13 AM</span>
                            </div>
                        </div>
                        {/* Requested By */}
                        <div className='text-xs w-1/5 aspect-square flex flex-col justify-between items-center'>
                            <div>Requested By:</div>
                            <img src={baseURL + '/users/signatures/sign4.png'}></img>
                            <div className='flex flex-col items-center'>
                                <span>John Arian Malondras</span>
                                <span>Oct 29, 2025 11:13 AM</span>
                            </div>
                        </div>
                        {/* Requested By */}
                        <div className='text-xs w-1/5 aspect-square flex flex-col justify-between items-center'>
                            <div>MRI Encoded By:</div>
                            <img src={baseURL + '/users/signatures/sign5.png'}></img>
                            <div className='flex flex-col items-center'>
                                <span>John Arian Malondras</span>
                                <span>Oct 29, 2025 11:13 AM</span>
                            </div>
                        </div>
                    </div>
                {/* </div> */}
            </div>
        </>
    )
}

export default NonChargableReport