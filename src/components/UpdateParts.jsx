import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import { getAll } from '../services/partBrandService'
import { useNavigate } from 'react-router-dom'

const UpdateParts = ({closeButton, approveSuccess, id, parts}) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const [partBrands, setPartBrands] = useState([])
    const [updatedParts, setUpdatedParts] = useState(parts)
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getPartBrands();
    }, [])

    const getPartBrands = async() => {
        try {
            const response = await getAll();
            setPartBrands(response);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleOnChange = (id, col_name, value) => {
        setUpdatedParts(prev => 
            prev.map(epart => (
                    epart.id === id ? {...epart, [col_name]: value} : epart
                )
            )
        );
    }

    const handleYes = () => {

    }

    return (
        <>
            <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900/30 z-100">
                <aside className='bg-white dark:bg-neutral-600 w-[90vw] min-w-[500px] rounded text-neutral-600 dark:text-neutral-50'>
                    <div className='w-full p-6 border-b border-neutral-300 text-xl leading-5 font-bold flex justify-start items-center'>
                        <h1>Update Parts</h1>
                    </div>
                    <div className='w-full h-[calc(100%-158px)] p-6 font-medium flex flex-col'>
                        <div className='flex w-full gap-x-3'>
                            <h1 className='text-center w-40 font-bold whitespace-nowrap'>Item Number</h1>
                            <h1 className='text-center w-56 font-bold whitespace-nowrap'>Part Number</h1>
                            <h1 className='flex-1 text-center font-bold'>Description</h1>
                            <h1 className='text-center w-52 font-bold'>Brand</h1>
                        </div>
                        {
                            updatedParts.map((part, index) => (
                                <div key={index} className='mt-3'>
                                    <div className='flex gap-x-3'>
                                        <input type="text" name='item_number' className='border border-neutral-500 rounded p-1 text-center text-sm w-40' onChange={(e) => handleOnChange(part.id, e.target.name, e.target.value)} value={part.item_number}/>
                                        <input type="text" name='number' className='border border-neutral-500 rounded p-1 text-center text-sm w-56' onChange={(e) => handleOnChange(part.id, e.target.name, e.target.value)} value={part.number}/>
                                        <input type="text" name='name' className='border border-neutral-500 rounded p-1 text-sm flex-1' onChange={(e) => handleOnChange(part.id, e.target.name, e.target.value)} value={part.name}/>
                                        <select name="brand_id" className='border border-neutral-500 rounded p-1 text-center text-sm w-52' onChange={(e) => handleOnChange(part.id, e.target.name, e.target.value)} value={part.brand_id}>
                                            {
                                                partBrands.map((brand, index) => (
                                                    <option key={index} value={brand.id}>{brand.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='w-full p-6 border-t border-neutral-300 flex gap-x-3'>
                        <Button color='blue' onClick={handleYes} className={"w-40"}>Update</Button>
                        <Button color='gray' onClick={() => closeButton()} className={"w-40"}>Close</Button>
                    </div>
                </aside>
            </div>
        </>
    )
}

export default UpdateParts