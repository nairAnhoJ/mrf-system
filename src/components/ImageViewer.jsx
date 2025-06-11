import React from 'react'

const ImageViewer = ({closeButton, path}) => {
  return (
    <>
        <div onClick={(e) => closeButton(e)} className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900/60 z-100">
            <button type='button' onClick={(e) => closeButton(e)} className="absolute top-7 right-7 w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" className="w-6 h-6">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
            </button>
            <img src={path} alt="fsrr attachment" className="max-h-[80%] w-auto object-contain" />
        </div>
    </>
  )
}

export default ImageViewer