import React from 'react';
import IconRenderer from '../../components/icons';
import Button from '../../components/Button';

const NonChargeableShow = ({item, closeButton}) => {

    return (
        <div className='fixed left-0 top-0 w-screen h-screen bg-neutral-900/50 flex items-center justify-center z-99'>
            <div className='w-8/12 h-11/12 bg-neutral-50 dark:bg-neutral-700 rounded flex flex-col'>

                <div className='w-full bg-neutral-50 dark:bg-neutral-700 rounded-t border-b border-neutral-200 text-neutral-600 shadow flex items-center justify-between p-6'>
                    <h1 className='text-xl font-semibold leading-5'>{item.mrf_number}</h1>
                    <button type='button' onClick={closeButton} className="cursor-pointer">
                        <IconRenderer name="close" className="w-5 h-5"/>
                    </button>
                </div>

                <div className='w-full h-full bg-neutral-50 dark:bg-neutral-700  border-b border-neutral-200 shadow'>

                </div>

                <div className='w-full bg-neutral-50 dark:bg-neutral-700 rounded-b p-6 flex items-center'>
                    <Button color="white" onClick={closeButton}>CLOSE</Button>
                </div>
                
            </div>
        </div>
    )
}

export default NonChargeableShow