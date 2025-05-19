import React from 'react'
import Button from '../../components/Button'

const NonChargeableHome = () => {
  const handleTest = () => {
    console.log('test');
    
  }

  return (
    <div className='bg-white h-full w-[calc(100%-96px)] rounded-r-2xl ml-24 pt-2 pr-2'>
      <h1 className='text-xl font-bold'>Non Chargeable Requests</h1>
      <div className=''>
        <Button onClick={handleTest} className='w-40'>test</Button>
      </div>
    </div>
  )
}

export default NonChargeableHome