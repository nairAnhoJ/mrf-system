import React, { useEffect, useState } from 'react';
import IconRenderer from './icons';
import { NavLink } from 'react-router-dom';
import { Me } from '../services/authService';

const Sidebar = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const roles = JSON.parse(localStorage.getItem('roles'));
    // console.log(user, roles);
    // const [me, setMe] = useState({});

    const navItems = [
        { key: "nonChargeable",label: "Non-Chargeable", path: "/non-chargeable" },
        { key: "chargeable",label: "Chargeable", path: "/chargeable" },
        { key: "settings",label: "Settings", path: "/settings" },
    ];
    
    const [theme, setTheme] = useState(() => {
        if(localStorage.getItem('dark') == null){
            return 'light';
        }else{
            return localStorage.getItem('dark');
        }
    });

    useEffect(() => {
        if(theme == 'dark'){
            document.body.classList.add("dark");
        }else{
            document.body.classList.remove("dark");
        }
    }, [theme]);

    // useEffect(() => {
    //     const getMe = async() => {
    //         try {
    //             const response = await Me();
    //             setMe(response.user);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     getMe();
    // }, [])

    const toggleTheme = () => {
        if(theme == 'dark'){
            setTheme('light');
            localStorage.setItem('dark', 'light');
        }else{
            setTheme('dark');
            localStorage.setItem('dark', 'dark');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }



    return (
        <div className='h-[calc(100%-32px)] flex flex-col justify-between fixed w-24 hover:w-72 bg-neutral-800 text-neutral-300 overflow-hidden transition-all duration-300 z-99'>
            <div className='bg-white dark:bg-neutral-700 w-8 h-full absolute right-0 translate-x-1/2 rounded-l-2xl'></div>
            <div>
                <div className='w-[calc(100%-16px)] h-10 flex justify-center'><img src="/logo.ico" alt="logo" className='w-10 h-10'/></div>

                <div className='mt-20'>
                    {navItems.map((item) => (
                        <NavLink to={item.path} key={item.path} className={({ isActive }) => `w-72 h-12 pl-6 border-s-4 hover:border-white hover:text-white flex whitespace-nowrap items-center cursor-pointer ${isActive ? "border-white text-white" : "border-neutral-800"}`}>
                            <IconRenderer name={item.key} className='w-7 h-7' />
                            <span className='ms-6 font-semibold'>{item.label}</span>
                        </NavLink>
                    ))}
                </div>
            </div>

            <div>
                <button onClick={toggleTheme} className='w-72 h-12 pl-6 my-3 border-s-4 border-neutral-800 hover:border-white hover:text-white flex whitespace-nowrap items-center cursor-pointer pr-12'>
                    <IconRenderer name="moon" className='w-7 h-7' />
                    <div className='flex items-center justify-between w-full'>
                        <h1 className='ms-[26px] font-semibold'>Dark Mode</h1>
                        <div className={`w-10 h-6 border-0 border-gray-400 rounded-full relative p-1 shadow-inner bg-linear-to-b ${theme == 'dark' ? 'from-[#0c073d] to-[#1A1187]' : 'from-[#F52900] to-[#F48831]'}`}>
                            <div className={`h-4 w-4 bg-white rounded-full transition-transform duration-500 shadow-lg ${theme == 'dark' ? 'translate-x-4' : 'translate-x-0'}`}></div>
                        </div>
                    </div>
                </button>
                <button onClick={handleLogout} className='w-72 h-12 pl-6 my-3 border-s-4 border-neutral-800 hover:border-white hover:text-white flex whitespace-nowrap items-center cursor-pointer'>
                    <IconRenderer name="logout" className='w-7 h-7' />
                    <span className='ms-6 font-semibold'>Log out</span>
                </button>
                <div className='pl-4 pr-8'>
                    <hr className=''/>
                </div>
                <div className='w-72 h-12 pl-4 border-s-4 border-neutral-800 flex whitespace-nowrap items-center my-4'>
                    <img src="/default_profile_pic.png" alt="default_profile_pic" className='w-10 h-10 rounded-full' />
                    <div>
                        <h1 className='ms-[21px] font-semibold leading-4 pr-8'>{user.name}</h1>
                        {/* <p className='ms-[21px] leading-4 text-xs'>Team Leader</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar