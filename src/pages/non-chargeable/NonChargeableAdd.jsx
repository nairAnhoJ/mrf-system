import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import IconRenderer from '../../components/icons'
import Table from '../../components/Table'
import { getAll } from '../../services/nonChargeableService'
import NonChargeableShow from './NonChargeableShow'
import { Link } from 'react-router-dom'

const NonChargeableAdd = () => {
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [collection, setCollection] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});

    return (
        <>
            <div className='bg-white dark:bg-neutral-700 h-full w-[calc(100%-96px)] rounded-r-2xl ml-24 pt-2 pr-4'>
                <form className='w-full h-full'>
                    <h1 className='text-2xl font-bold text-neutral-600 dark:text-white'>Non Chargeable Requests</h1>

                    <div className='flex justify-between mt-2'>
                        <div className='flex items-center gap-x-2 text-neutral-700'>
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
                        <div className='flex'>

                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NonChargeableAdd