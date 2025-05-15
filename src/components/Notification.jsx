import IconRenderer from "./icons"

export const Notification = ({ message, setNotifIsVisible }: { message: string; setNotifIsVisible: (val: boolean) => void; }) => {
    const handleClose = () => {
        setNotifIsVisible(false);
    }

    return (
        <>
            <div className='absolute flex items-center justify-between left-1/2 -translate-x-1/2 text-white bg-green-600 pl-5 pr-3 py-3 rounded font-bold tracking-wide border border-green-900 z-[90]'>
                <p className='flex items-center pr-20 pt-1'>{message}</p>
                <button onClick={handleClose}>
                    <IconRenderer name='close' className='w-6 h-6'></IconRenderer>
                </button>
            </div>
        </>
    )
}
