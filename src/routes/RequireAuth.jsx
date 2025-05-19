import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Me } from '../services/authService';

const RequireAuth = () => {
    const token = localStorage.getItem("token");
    const [firstTimeLogin, setFirstTimeLogin] = useState(false);
    const location = useLocation();

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

    if(token){
        if(firstTimeLogin){
            return <Navigate to="/change-password" replace /> 
        }else{
            if(location.pathname == "/"){
                return <Navigate to="/non-chargeable" replace /> 
            }else{
                return <Outlet />
            }
        }
    }else{
        return <Navigate to="/login" replace />;
    }
}

export default RequireAuth