import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import IconRenderer from '../../components/icons'
import Table from '../../components/Table'
import { getAll } from '../../services/nonChargeableService'
import NonChargeableShow from './NonChargeableShow'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const NonChargeableHome = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const roles = JSON.parse(localStorage.getItem('roles'));
    // console.log(roles);
    
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [collection, setCollection] = useState([]);
    const [selectedItem, setSelectedItem] = useState();
    const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {dateStyle: 'medium'});
    // const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {dateStyle: 'medium', timeStyle: 'short'});
    const [showRow, setShowRow] = useState(false);
    const [notif, setNotif] = useState(location.state?.message);

    const handleSearch = () => {
        let url = `?sort=${sort}&search=${search}`;
        if(perPage != 25){
            url += `&perPage=${perPage}`;
        }
        navigate(url, { replace: true });
        getCollection();
    };

    const handleClearSearch = () => {
        setSearch('');

        let url = `?sort=${sort}`;
        if(perPage != 25){
            url += `&perPage=${perPage}`;
        }
        navigate(url, { replace: true });
        getCollection();
    };

    const columns = [
        {'key': 'mrf_number', 'label': 'Request Number', 'className': `py-2 px-2 text-center font-bold`},
        {'key': 'customer_name', 'label': 'Customer Name', 'className': 'py-1 px-2 text-center'},
        {'key': 'area', 'label': 'Area', 'className': 'py-1 px-2 text-center'},
        {'key': 'date_requested', 'label': 'Date Requested', 'className': 'py-1 px-2 text-center'},
        {'key': 'date_needed', 'label': 'Date Needed', 'className': 'py-1 px-2 text-center'},
        {'key': 'brand', 'label': 'Brand', 'className': 'py-1 px-2 text-center'},
        {'key': 'fleet_number', 'label': 'Fleet Number', 'className': 'py-1 px-2 text-center'},
        {'key': 'requested_by', 'label': 'Requested By', 'className': 'py-1 px-2 text-center'},
    ]

    const getCollection = async() => {
        try {
            const response = await getAll();
            setCollection(response);
            updateDateFormat();
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const updateDateFormat = () => {
        setCollection((prevItem) => 
            prevItem.map((item) => (
                {
                    ...item,
                    date_requested: dateTimeFormatter.format(new Date(item.date_requested)),
                    date_needed: dateTimeFormatter.format(new Date(item.date_needed)),
                }
            ))
        );
    };

    useEffect(()=>{
        getCollection();

        // setCollection([
        //     {'id': '1', 'mrf_number': '89634893', 'customer_name': 'ABC'},
        //     {'id': '2', 'mrf_number': '56785263', 'customer_name': 'DEF'},
        //     {'id': '3', 'mrf_number': '56785265', 'customer_name': 'GHI'},
        // ])
    }, [])

    const handleRowClick = (id) => {
        setSelectedItem(id)
        setShowRow(true);
    }

    // const handleEdit = (item) => {
    //     console.log(item);
    // }

    // const handleDelete = (item) => {
    //     console.log(item);
    // }

    const handleShowCloseButton = () => {
        setShowRow(false)
    }

    const handleApproveSuccess = (message) => {
        setNotif(message);
        getCollection();
        setShowRow(false);
    }

    return (
        <>
            {(notif) && (
                <div className='absolute flex items-center justify-between left-1/2 -translate-x-1/2 text-white bg-green-600 pl-5 pr-3 py-3 my-5 rounded font-bold tracking-wide border border-green-900 z-[90]'>
                    <p className='flex items-center pr-20 pt-1'>{notif}</p>
                    <button onClick={() => { setNotif(''); navigate('.', { replace: true, state: {} }); }}>
                        <IconRenderer name='close' className='w-6 h-6'></IconRenderer>
                    </button>
                </div>
            )}

            {showRow && <NonChargeableShow closeButton={handleShowCloseButton} id={selectedItem} approveSuccess={(message) => handleApproveSuccess(message)} />}

            <div className='bg-white dark:bg-neutral-700 h-full w-[calc(100%-96px)] rounded-r-2xl ml-24 pt-2 pr-4'>
                <h1 className='text-2xl font-bold text-neutral-600 dark:text-white'>Non Chargeable Requests</h1>

                <div className='mt-3 flex justify-between items-center h-10'>
                    {   (roles.find(role => role.role === 'site_tl') || roles.find(role => role.role === 'site_supv') || roles.find(role => role.role === 'site_admin')) ?
                            <Button onClick={() => navigate('/non-chargeable/add')} className='w-40 h-full'>ADD</Button>
                        :
                        <div></div>
                    }
                    <div className='flex h-full'>
                        <div className='h-full flex items-center gap-x-1 relative text-neutral-700'>
                            <IconRenderer name={'search'} className='h-5 w-5 ml-2 absolute'></IconRenderer>
                            <input onChange={(e) => {setSearch(e.target.value)}} value={search} type="text" className='h-full rounded w-80 border border-gray-300 pl-8 dark:bg-neutral-400 dark:border-neutral-400 shadow-inner' />
                            <div className='absolute right-2 flex items-center gap-x-1'>
                                <button onClick={handleClearSearch} className='font-bold text-red-500'><IconRenderer name={'close'} className='h-5 w-5'></IconRenderer></button>
                                <button onClick={handleSearch} className='font-medium border border-gray-300 dark:border-gray-500 dark:bg-neutral-500 dark:text-neutral-100 rounded px-1 tracking-tight shadow-lg'>Search</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-3'>
                    <div className="w-full">
                        <table className='w-full'>
                            <thead className='border-b rounded-t-lg bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-100 text-neutral-700 border-neutral-500 text-sm'>
                                <tr className="">
                                    {   columns.map((row) => (
                                            <th key={row.key} className={row.className}>{row.label}</th>
                                        ))
                                    }
                                </tr>
                            </thead>

                            {/* ${ (index%2 === 1) ? 
                                                        (item.is_validated == 0 && ) ?
                                                        'bg-emerald-400 dark:bg-emerald-500 hover:bg-emerald-300 dark:hover:bg-emerald-600' 
                                                        :
                                                        'bg-neutral-200 dark:bg-neutral-600 hover:bg-neutral-300 dark:hover:bg-neutral-500' 
                                                    : 
                                                        (item.is_validated == 0 && roles == 'admin') ?
                                                        'bg-emerald-400 dark:bg-emerald-500 hover:bg-emerald-300 dark:hover:bg-emerald-600'
                                                        :
                                                        'dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-500'
                                                    }  */}


                            {/* ${(item.is_validated == 0 && roles.find(role => role.area_id === item.area_id)?.role == 'tl') ?
                                'bg-neutral-100 dark:bg-neutral-600 hover:bg-neutral-300 dark:hover:bg-neutral-500' 
                                :
                                'bg-neutral-100 dark:bg-neutral-600 hover:bg-neutral-300 dark:hover:bg-neutral-500'
                            } */}

                            <tbody>
                                {   loading == false ?
                                        collection.length > 0 ?
                                            collection.map((item, index) => (
                                                <tr key={index} onClick={() => handleRowClick(item.id)}  className={`font-normal text-sm 2xl:text-base cursor-pointer dark:text-neutral-100
                                                    ${
                                                        (new Date(item.date_needed) < new Date() ) ?
                                                        'bg-red-200 dark:bg-neutral-600 hover:bg-red-300 dark:hover:bg-neutral-500' 
                                                        :
                                                        'bg-neutral-100 dark:bg-neutral-600 hover:bg-neutral-300 dark:hover:bg-neutral-500'
                                                    }
                                                `}>
                                                    {
                                                        // Site TL and Site Supervisor
                                                        (item.is_validated == 0 && (roles.find(role => role.area_id === item.area_id)?.role == 'site_tl' || roles.find(role => role.area_id === item.area_id)?.role == 'site_supv')) ?
                                                            columns.map((row, index) => (
                                                                <td key={index} className={`${row.className} first:text-green-600`}>{item[row.key]}</td>
                                                            ))
                                                        : (item.is_validated == 1 && item.is_parts_approved == 0 && roles.find(role => role.area_id === item.area_id)?.role == 'svc_tech') ?
                                                            columns.map((row, index) => (
                                                                <td key={index} className={`${row.className} first:text-green-600`}>{item[row.key]}</td>
                                                            ))
                                                        : (item.is_parts_approved == 1 && item.is_service_head_approved == 0 && roles.find(role => role.area_id === item.area_id)?.role == 'svc_head') ?
                                                            columns.map((row, index) => (
                                                                <td key={index} className={`${row.className} first:text-green-600`}>{item[row.key]}</td>
                                                            ))
                                                        : (item.is_service_head_approved == 1 && (item.mri_number == '' || item.mri_number == null) && roles[0].role == 'mri') ?
                                                            columns.map((row, index) => (
                                                                <td key={index} className={`${row.className} first:text-green-600`}>{item[row.key]}</td>
                                                            ))
                                                        : ((item.mri_number != '' || item.mri_number != null) && item.is_doc_number_encoded != 1 && roles[0].role == 'doc_enc') ?
                                                            columns.map((row, index) => (
                                                                <td key={index} className={`${row.className} first:text-green-600`}>{item[row.key]}</td>
                                                            ))
                                                        : (item.is_doc_number_encoded == 2 && item.is_dr_number_encoded == 0 && roles[0].role == 'dr_enc') ?
                                                            columns.map((row, index) => (
                                                                <td key={index} className={`${row.className} first:text-green-600`}>{item[row.key]}</td>
                                                            ))
                                                        :
                                                            columns.map((row, index) => (
                                                                <td key={index} className={`${row.className}`}>{item[row.key]}</td>
                                                            ))
                                                    }
                                                </tr>
                                            ))
                                        : 
                                            <tr>
                                                <th colSpan={columns.length} className='py-2 px-4'>No data.</th>
                                            </tr>
                                    :
                                        <tr>
                                            <th colSpan={columns.length} className='py-2 px-4'>Loading...</th>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>

                    {/* <Table
                        columns={columns} 
                        collection={collection}
                        onRowClick={(item) => handleRowClick(item.id)}
                        loading={loading}
                        // actionRender={(item) => (
                        //     <div className='flex items-center justify-center'>
                        //         <button onClick={() => handleEdit(item)} className='pr-1 hover:underline cursor-pointer'>EDIT</button> | <button onClick={() => handleDelete(item)} className='pl-1 hover:underline cursor-pointer'>DELETE</button>
                        //     </div>
                        // )}
                    /> */}
                </div>

            </div>
        </>
    )
}

export default NonChargeableHome