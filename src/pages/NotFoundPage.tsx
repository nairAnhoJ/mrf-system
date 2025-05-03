import { Link } from 'react-router-dom'

function NotFoundPage() {
    return (
        <>
            <div className='w-screen h-screen flex items-center justify-center flex-col'>
                <h1 className='text-[200px] font-base tracking-widest leading-[210px]'>404</h1>
                <h2 className='font-base text-3xl'>Page Not Found</h2>
                <Link to='/' className='mt-10 px-10 py-3 text-white bg-blue-500 rounded font-semibold tracking-wide text-lg'>HOME</Link>
            </div>
        </>
    )
}

export default NotFoundPage