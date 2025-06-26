import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import Table from './Table'
import IconRenderer from './icons'
import { getByRequestId } from '../services/nonChargeableService'

const FleetHistory = ({closeButton, fleetNumber, history}) => {
    // const [requestHistory, setRequestHistory] = useState(history);
    const [selectedId, setSelectedId] = useState(history[0].id);
    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const getParts = async(id) => {
        setLoading(true);
        try {
            const response = await getByRequestId(id);
            setParts(response);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getParts(history[0].id);
    }, []);

    const handleHistoryClick = async (id) => {
        setSelectedId(id);
        getParts(id);
    }

    const parts_columns = [
        {'key': 'item_number', 'label': 'Item Number', 'className': 'py-1 px-2 text-center whitespace-nowrap'},
        {'key': 'number', 'label': 'Part Number', 'className': 'py-1 px-2 text-center whitespace-nowrap'},
        {'key': 'name', 'label': 'Description', 'className': 'py-1 px-2 text-center whitespace-nowrap'},
        {'key': 'brand', 'label': 'Brand', 'className': 'py-1 px-2 text-center whitespace-nowrap'},
        {'key': 'quantity', 'label': 'Quantity', 'className': 'py-1 px-2 text-center whitespace-nowrap'},
        {'key': 'price', 'label': 'Price (₱)', 'className': 'py-1 px-2 text-center whitespace-nowrap'},
        {'key': 'total_price', 'label': 'Total Price (₱)', 'className': 'py-1 px-2 text-center whitespace-nowrap'},
    ]


    return (
        <>
            <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900/30 z-100">
                <aside className='bg-white dark:bg-neutral-600 w-11/12 h-5/6 rounded text-neutral-600 dark:text-neutral-50'>
                    <div className='w-full p-6 border-b border-neutral-300 text-xl leading-5 font-bold flex justify-between'>
                        <h1>Forklift Maintenance/Repair History</h1>
                    </div>
                    <div className='w-full h-[calc(100%-158px)] p-6'>
                        <div className='w-full h-full flex text-sm'>
                            <div className='w-[248px] flex flex-col border-r pr-6'>
                                <div className='grid grid-cols-[144px_80px] border-b border-neutral-400 bg-neutral-300 dark:bg-neutral-800'>
                                    <div className='text-center font-semibold py-1'>
                                        MRF Number
                                    </div>
                                    <div className='text-center font-semibold py-1'>
                                        For
                                    </div>
                                </div>
                                {   history.map((request) => (
                                        <div key={request.id} onClick={() => handleHistoryClick(request.id)} className={`grid grid-cols-[144px_80px] cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 ${request.id === selectedId ? 'bg-neutral-200 dark:bg-neutral-700' : ''}`}>
                                            <div className='text-center font-semibold py-1'>
                                                {request.mrf_number}
                                            </div>
                                            <div className='text-center font-semibold py-1'>
                                                {request.for}
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                            <div className='w-[calc(100%-224px)] pl-6'>
                                <Table columns={parts_columns} collection={parts} loading={loading} ></Table>
                            </div>
                        </div>
                    </div>
                    <div className='w-full p-6 border-t border-neutral-300 flex gap-x-6'>
                        <Button color='gray' onClick={() => closeButton()} className={"w-20"}>Close</Button>
                    </div>
                </aside>
            </div>
        </>
    )
}

export default FleetHistory