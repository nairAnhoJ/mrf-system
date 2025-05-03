import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Me } from '../services/authService';

const RequireAuth = () => {
    const token = localStorage.getItem("token");
    const [firstTimeLogin, setFirstTimeLogin] = useState(false);

    useEffect(() => {
        const getMe = async() => {
            try {
                const response = await Me();
                const { first_time_login } = response.user;
                if(first_time_login === 1){
                    setFirstTimeLogin(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getMe();
    }, [])

    return token ? (firstTimeLogin ? <Navigate to="/change-password" replace /> : <Outlet />) : <Navigate to="/login" replace />;
}

export default RequireAuth