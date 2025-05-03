import { useEffect, useState } from 'react'
import IconRenderer from './icons';
import { Me } from '../services/authService';
import { Link } from 'react-router-dom';

function Header() {

    type Me = {
        id: number;
        id_number: string;
        name: string;
        email: string;
        role: string;
    }
    const [me, setMe] = useState<Me >({
        'id': 0,
        'id_number': '',
        'name': '',
        'email': '',
        'role': '',
    });

    const [showMenu, setShowMenu] = useState(false);

    const [dark, setDark] = useState(() => {
        if(localStorage.getItem('dark') == null){
            return 'light';
        }else{
            return localStorage.getItem('dark');
        }
    });

    useEffect(() => {
        if(dark == 'dark'){
            document.body.classList.add("dark");
        }else{
            document.body.classList.remove("dark");
        }
    }, [dark]);

    useEffect(() => {
        const getMe = async() => {
            try {
                const response = await Me();
                setMe(response.user);
            } catch (error) {
                console.log(error);
            }
        }
        getMe();
    }, [])

    const toggleTheme = () => {
        if(dark == 'dark'){
            setDark('light');
            localStorage.setItem('dark', 'light');
        }else{
            setDark('dark');
            localStorage.setItem('dark', 'dark');
        }
    };

    const handleHomeButton = () => {
        window.location.href = "/";
    }

    const handleMenuButton = () => {
        setShowMenu(prevValue => !prevValue);
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    return (
        <div className='w-screen h-16 bg-white dark:bg-gray-800'>
            <div className='flex items-center justify-between py-3 px-7 h-full'>
                <button onClick={handleHomeButton} className='text-gray-600 font-bold text-xl dark:text-white tracking-wide'>Accountability System</button>

                <button onClick={handleMenuButton} className='font-semibold text-gray-600 dark:text-white text-xl relative'>
                    <div className='bg-gray-500 dark:bg-white w-4 h-4 rounded-full absolute -right-1 bottom-0 translate-x-1/2 border-2 border-white dark:border-gray-800'>
                        <IconRenderer name="downArrow" className='dark:text-gray-700 text-white w-[14px] h-[14px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
                    </div>
                    {me.name}
                </button>
                
                {
                    showMenu ? 
                        <div className='w-48 flex flex-col items-center gap-x-2 absolute right-5 top-12 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-800 rounded-lg border dark:border-gray-600 text-gray-500 dark:text-gray-100 overflow-hidden text-sm'>
                            <button onClick={toggleTheme} className='h-12 w-full hover:bg-gray-100 dark:hover:bg-gray-700 px-3 flex items-center gap-x-2 font-medium border-b dark:border-gray-600'>
                                { dark == 'dark' ? 
                                    <>
                                        <IconRenderer name="sun" className='w-6 h-6' />
                                        Light Mode
                                    </>
                                    : 
                                    <>
                                        <IconRenderer name="moon" className='w-6 h-6' />
                                        Dark Mode
                                    </>
                                }
                            </button>
                            {
                                me.id === 1 && me.role === "admin" ?
                                <Link to="/settings" onClick={() => setShowMenu(false)} className='h-12 w-full hover:bg-gray-100 dark:hover:bg-gray-700 px-3 flex items-center gap-x-2 font-medium border-b dark:border-gray-600'>
                                    <IconRenderer name="settings" className='w-7 h-7' /> Settings
                                </Link>
                                :
                                ''
                            }
                            <button onClick={() => window.location.href = "/change-password"} className='h-12 w-full hover:bg-gray-100 dark:hover:bg-gray-700 px-3 flex items-center gap-x-2 font-medium border-b dark:border-gray-600'>
                                <IconRenderer name="key" className='w-7 h-7' /> Change Password
                            </button>
                            <button onClick={handleLogout} className='h-12 w-full hover:bg-gray-100 dark:hover:bg-gray-700 px-3 flex items-center gap-x-2 font-medium'>
                                <IconRenderer name="logout" className='w-7 h-7' /> Logout
                            </button>
                        </div>
                    :
                        ''
                }
            </div>
        </div>
    )
}

export default Header