import React from 'react'

const SelectParts = ({closeButton, path}) => {
  return (
    <>
        <div onClick={(e) => closeButton(e)} className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900/60 z-100">
            <div className='bg-white w-3/4 h-3/4'>
                <div className='w-full h-12 bg-amber-500'>
                    
                </div>
                <div className='w-full h-[calc(100%-96px)] bg-red-500'>
                    
                </div>
                <div className='w-full h-12 bg-amber-500'>
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default SelectParts