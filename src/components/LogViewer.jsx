import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import IconRenderer from './icons'

const LogViewer = ({closeButton, logs, show}) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, [logs]);

    return (
        <>
            {/* <div onClick={(e) => closeButton(e)} className="fixed top-0 left-0 w-screen h-screen bg-gray-900/10 z-100"> */}
                <aside className={`fixed top-0 right-0 bg-white dark:bg-neutral-600 w-[600px] h-screen rounded-s text-neutral-600 dark:text-neutral-50 z-100 border-l border-neutral-300 transition-all duration-500 ${(!show ? 'translate-x-full' : '' )}`}>
                    <div className='w-full p-6 border-b border-neutral-300 text-xl leading-5 font-bold flex justify-between'>
                        <h1>Logs</h1>
                        <button className='h-5 w-5' onClick={closeButton}>
                            <IconRenderer name={'close'} className='h-5 w-5'></IconRenderer>
                        </button>
                    </div>
                    <div className='w-full h-[calc(100%-69px)] py-6 pl-6'>
                        <div ref={scrollRef} className='w-full h-full overflow-auto resize-none whitespace-pre-wrap' dangerouslySetInnerHTML={{ __html: logs }}></div>
                    </div>
                </aside>
            {/* </div> */}
        </>
    )
}

export default LogViewer