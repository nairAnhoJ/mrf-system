import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import { validate, verify, approve, verifyDetails, mri, doc_number, dr_number } from '../services/nonChargeableService'
import { useNavigate } from 'react-router-dom'

const Confirmation = ({closeButton, approveSuccess, id, parts, title, body}) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const [data, setData] = useState({
        mri: '',
        doc_number: '',
        dr_number: '',
        remarks: '',
        checkedPart: [],
    })
    // const [checkedPart, setCheckedPart] = useState([]);
    const [allChecked, setAllChecked] = useState(false);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleCheckAll = () => {
        if(allChecked == false){
            setData((prev) => ({...prev, checkedPart: []}))
            parts.forEach(part => {
                if(title == "DOCUMENT NUMBER"){
                    if(part.doc_number == null){
                        setData((prev) => ({...prev, checkedPart: [...prev.checkedPart, part.id]}))
                    }
                }else if(title == "DR NUMBER"){
                    if(part.dr_number == null && part.doc_number != null ){
                    console.log(parts);
                        setData((prev) => ({...prev, checkedPart: [...prev.checkedPart, part.id]}))
                    }
                }
            });8
        }else if(allChecked == true){
            setData((prev) => ({...prev, checkedPart: []}))
        }
        setAllChecked(!allChecked);
    }

    const handleCheckPart = (part_id) => {
        setData((prev) => {
            const next = prev.checkedPart.includes(part_id) ?
            prev.checkedPart.filter((pid) => pid !== part_id)
            :
            [...prev.checkedPart, part_id];

            if(title == "DOCUMENT NUMBER"){
                if(parts.filter((pid) => pid.doc_number == null).length === next.length){
                    setAllChecked(true);
                }else{
                    setAllChecked(false);
                }
            }else if(title == "DR NUMBER"){
                if(parts.filter((pid) => (pid.doc_number != null && pid.dr_number == null)).length === next.length){
                    setAllChecked(true);
                }else{
                    setAllChecked(false);
                }
            }

            return {...prev, checkedPart: next};
        })
    }

    const handleYes = async () => {
        if(title === 'Validate'){
            try {
                const response = await validate(id);
                if(response.status === 201){
                    approveSuccess(response.data.message);
                }
                console.log(response);
            } catch (error) {
                console.log(error);
            }
            closeButton();
        }else if(title === 'Verify Parts'){
            try {
                const response = await verify(id, data);
                if(response.status === 201){
                    approveSuccess(response.data.message);
                }
                console.log(response);
            } catch (error) {
                console.log(error);
            }
            closeButton();
        }else if(title === 'Approve'){
            try {
                const response = await approve(id, data);
                if(response.status === 201){
                    approveSuccess(response.data.message);
                }
                console.log(response);
            } catch (error) {
                console.log(error);
            }
            closeButton();
        }else if(title === 'Verify Details'){
            try {
                const response = await verifyDetails(id, data);
                if(response.status === 201){
                    approveSuccess(response.data.message);
                }
                console.log(response);
            } catch (error) {
                console.log(error);
            }
            closeButton();
        }else if(title === 'MRI'){
            try {
                const response = await mri(id, data);
                if(response.status === 201){
                    approveSuccess(response.data.message);
                }
                console.log(response);
            } catch (error) {
                console.log(error);
            }
            closeButton();
        }else if(title === 'DOCUMENT NUMBER'){
            const err = [];
            if(data.doc_number == '' || data.doc_number == null){
                err.push({
                    path: 'doc_number',
                    msg: 'Document Number is required.'
                })
                // setErrors([{
                //     path: 'doc_number',
                //     msg: 'Document number is required.'
                // }])
            }

            if(data.checkedPart.length == 0){
                err.push({
                    path: 'parts',
                    msg: 'Please select part/s.'
                })
            }

            setErrors(err);
            
            if(err.length == 0){
                try {
                    const response = await doc_number(id, data);
                    if(response.status === 201){
                        approveSuccess(response.data.message);
                    }
                    console.log(response);
                } catch (error) {
                    console.log(error);
                }
                closeButton();
            }
        }else if(title === 'DR NUMBER'){
            const err = [];
            if(data.dr_number == '' || data.dr_number == null){
                err.push({
                    path: 'dr_number',
                    msg: 'DR Number is required.'
                })
                // setErrors([{
                //     path: 'doc_number',
                //     msg: 'Document number is required.'
                // }])
            }

            if(data.checkedPart.length == 0){
                err.push({
                    path: 'parts',
                    msg: 'Please select part/s.'
                })
            }

            setErrors(err);
            
            if(err.length == 0){
                try {
                    const response = await dr_number(id, data);
                    if(response.status === 201){
                        approveSuccess(response.data.message);
                    }
                    console.log(response);
                } catch (error) {
                    console.log(error);
                }
                closeButton();
            }
        }else if(title === 'Return to Requestor'){
            try {
                const response = await verifyDetails(id, data);
                if(response.status === 201){
                    approveSuccess(response.data.message);
                }
                console.log(response);
            } catch (error) {
                console.log(error);
            }
            closeButton();
        }
    }

    return (
        <>
            <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900/30 z-100">
                <aside className='bg-white dark:bg-neutral-600 min-w-[400px] rounded text-neutral-600 dark:text-neutral-50'>
                    <div className='w-full p-6 border-b border-neutral-300 text-xl leading-5 font-bold flex justify-center items-center'>
                        <h1>{title}</h1>
                    </div>
                    <div className='w-full h-[calc(100%-158px)] p-6 font-medium flex flex-col'>
                        <span className={`${(body != '' || body != null) ? '' : 'mb-3'}`}>{body}</span>

                        {title == 'MRI' && 
                            <div className='flex flex-col text-sm font-normal'>
                                <label>MRI Number</label>
                                <input type='text' className='border rounded p-2 resize-none' onChange={(e) => setData({...data, mri: e.target.value})}></input>
                            </div>
                        }

                        {title == 'DOCUMENT NUMBER' && 
                            <div className='flex flex-col text-sm font-normal'>
                                <table className='w-[75vw]'>
                                    <thead className='border-b border-neutral-500'>
                                        <tr>
                                            <th>
                                                {(parts.filter(part => part.doc_number === null).length > 0) ? 
                                                    <input type="checkbox" className='cursor-pointer' checked={allChecked} onChange={handleCheckAll} />
                                                :
                                                    <input disabled type="checkbox" className='cursor-pointer disabled:opacity-50' />
                                                }
                                            </th>
                                            <th className='text-center py-1'>Item Number</th>
                                            <th>Part Number</th>
                                            <th>Description</th>
                                            <th>Brand</th>
                                            <th>Quantity</th>
                                            <th>Doc Number</th>
                                            <th>DR Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            parts.map((part, index) => (
                                                <tr key={index} className='last:border-b border-neutral-500 hover:bg-gray-100 cursor-pointer' onClick={() => handleCheckPart(part.id)}>
                                                    <td className='text-center py-1'>
                                                        {
                                                            part.doc_number != null
                                                            ?
                                                                <input disabled readOnly type="checkbox" className='cursor-pointer disabled:opacity-50'/>
                                                            :
                                                                <input readOnly type="checkbox" className={`cursor-pointer`} checked={data.checkedPart.includes(part.id)}/>
                                                        }
                                                    </td>
                                                    <td className='text-center py-1'>{part.item_number}</td>
                                                    <td className='text-center py-1'>{part.number}</td>
                                                    <td className='text-center py-1'>{part.name}</td>
                                                    <td className='text-center py-1'>{part.brand}</td>
                                                    <td className='text-center py-1'>{part.quantity}</td>
                                                    <td className='text-center py-1'>{part.doc_number}</td>
                                                    <td className='text-center py-1'>{part.dr_number}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                {
                                    errors.find((err) => err.path == "parts") && 
                                    <p className='text-red-500 text-xs italic mt-1'>{errors.find((err) => err.path == "parts").msg}</p>
                                }
                                <div className='flex flex-col text-sm font-normal mt-3'>
                                    <label>Document Number</label>
                                    <input type='text' className='border rounded p-2 resize-none w-64' onChange={(e) => setData({...data, doc_number: e.target.value})}></input>
                                    {
                                        errors.find((err) => err.path == "doc_number") ? (
                                            <p className='text-red-500 text-xs italic'>{ errors.find((err) => err.path == "doc_number")?.msg }</p>
                                        ) : null
                                    }
                                </div>
                            </div>
                        }

                        {title == 'DR NUMBER' && 
                            <div className='flex flex-col text-sm font-normal'>
                                <table className='w-[75vw]'>
                                    <thead className='border-b border-neutral-500'>
                                        <tr>
                                            <th>
                                                {(parts.filter(part => part.dr_number === null).length != parts.filter(part => part.doc_number === null).length) ? 
                                                    <input type="checkbox" className='cursor-pointer' checked={allChecked} onChange={handleCheckAll} />
                                                :
                                                    <input disabled type="checkbox" className='cursor-pointer disabled:opacity-50' />
                                                }
                                            </th>
                                            <th className='text-center py-1'>Item Number</th>
                                            <th>Part Number</th>
                                            <th>Description</th>
                                            <th>Brand</th>
                                            <th>Quantity</th>
                                            <th>Doc Number</th>
                                            <th>DR Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            parts.map((part, index) => (
                                                <tr key={index} className='last:border-b border-neutral-500 hover:bg-gray-100 cursor-pointer' onClick={() => handleCheckPart(part.id)}>
                                                    <td className='text-center py-1'>
                                                        {
                                                            (part.dr_number !== null || part.doc_number === null)
                                                            ?
                                                                <input disabled readOnly type="checkbox" className='cursor-pointer disabled:opacity-50'/>
                                                            :
                                                                <input readOnly type="checkbox" className={`cursor-pointer`} checked={data.checkedPart.includes(part.id)}/>
                                                        }
                                                    </td>
                                                    <td className='text-center py-1'>{part.item_number}</td>
                                                    <td className='text-center py-1'>{part.number}</td>
                                                    <td className='text-center py-1'>{part.name}</td>
                                                    <td className='text-center py-1'>{part.brand}</td>
                                                    <td className='text-center py-1'>{part.quantity}</td>
                                                    <td className='text-center py-1'>{part.doc_number}</td>
                                                    <td className='text-center py-1'>{part.dr_number}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                {
                                    errors.find((err) => err.path == "parts") && 
                                    <p className='text-red-500 text-xs italic mt-1'>{errors.find((err) => err.path == "parts").msg}</p>
                                }
                                <div className='flex flex-col text-sm font-normal mt-3'>
                                    <label>DR Number</label>
                                    <input type='text' className='border rounded p-2 resize-none w-64' onChange={(e) => setData({...data, dr_number: e.target.value})}></input>
                                    {
                                        errors.find((err) => err.path == "dr_number") ? (
                                            <p className='text-red-500 text-xs italic'>{ errors.find((err) => err.path == "dr_number")?.msg }</p>
                                        ) : null
                                    }
                                </div>
                            </div>
                        }

                        { (title !== 'Validate' && title !== 'MRI' && title !== 'DOCUMENT NUMBER' && title !== 'DR NUMBER') && 
                            <div className='flex flex-col mt-3 text-sm font-normal'>
                                <label>Remarks</label>
                                <textarea className='border rounded h-24 p-2 resize-none' onChange={(e) => setData({...data, remarks: e.target.value})}></textarea>
                            </div>
                        }

                    </div>
                    <div className='w-full p-6 border-t border-neutral-300 flex gap-x-3'>
                        <Button color={`${title === 'Return to Requestor' ? 'red' : 'blue' }`} onClick={handleYes} className={"w-1/2"}>{['MRI', 'DOCUMENT NUMBER'].includes(title) ? 'Submit' : 'Yes' }</Button>
                        <Button color='gray' onClick={() => closeButton()} className={"w-1/2"}>Close</Button>
                    </div>
                </aside>
            </div>
        </>
    )
}

export default Confirmation