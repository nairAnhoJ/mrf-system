import { useEffect, useState } from 'react';
import IconRenderer from '../components/icons';
import { UserLogin } from '../services/authService';

function Login() {
    const [data, setData] = useState({
        id_number: '',
        password: ''
    })

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors([]);
        try {
            const response = await UserLogin(data);
            console.log(response);
            
            if(response.status === 400){
                setErrors(response.response.data.errors);
            }
            if(response.status === 401){
                setErrors(response.response.data.errors);
            }
            if(response.status === 200){
                localStorage.setItem("token", response.token);
                window.location.href = "/";
            }
        } catch (error) {
            console.log(error);
        }
    }

    const [errors, setErrors] = useState([]);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        
        if(token){
            window.location.href = "/";
        }
    }, [])


    return (
        <>
            <div className='w-screen h-screen flex items-center justify-center bg-gray-200'>
                <form onSubmit={handleSubmit} className='bg-white rounded w-[400px] p-6 text-gray-600 shadow-xl'>
                    <h1 className='text-center text-3xl font-semibold pb-6'>eMRF</h1>
                    {
                        errors.find((err) => err.path == "all") ? (
                            <div className='bg-red-500/20 w-full h-10 mb-4 rounded border border-red-500 flex items-center justify-center text-red-500'>
                                <IconRenderer name={'warning'} className={'w-5 h-5 mr-1'} />
                                <p className='text-sm font-semibold'>{ errors.find((err) => err.path == "all")?.msg }</p>
                            </div>
                        ) : null
                    }
                    <div className='relative pb-3'>
                        <div className='absolute top-[11px] left-[9px] flex items-center gap-x-1'>
                            <IconRenderer name={'user'} className={'w-6 h-6'} />
                            <span className='font-semibold mt-[2px]'>HII -</span>
                        </div>
                        <input type="text" value={data.id_number} onChange={(e) => setData({...data, id_number: e.target.value})} className='border w-full pb-2 pt-3 rounded border-gray-300 pl-[70px] font-semibold text-gray-600' placeholder='ID Number' />
                        {
                            errors.find((err) => err.path == "id_number") ? (
                                <p className='text-red-500 text-sm font-semibold italic'>{ errors.find((err) => err.path == "id_number")?.msg }</p>
                            ) : null
                        }
                    </div>
                    <div className='relative'>
                        <IconRenderer name={'password'} className={'absolute top-[11px] left-[9px] w-6 h-6'} />
                        <input type="password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})} className='border w-full pb-2 pt-3 rounded border-gray-300 pl-9 font-semibold text-gray-600' placeholder='Password' />
                        {
                            errors.find((err) => err.path == "password") ? (
                                <p className='text-red-500 text-sm font-semibold italic'>{ errors.find((err) => err.path == "password")?.msg }</p>
                            ) : null
                        }
                    </div>
                    <div>
                        <button type='submit' className='w-full mt-5 border py-2 rounded font-bold text-white bg-blue-600 tracking-wider shadow-lg'>LOGIN</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login