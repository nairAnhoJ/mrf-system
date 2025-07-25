import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { IsValid } from '../services/authService';

const RequireAuth = () => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const [firstTimeLogin, setFirstTimeLogin] = useState(false);
    const [userValid, setUserValid] = useState(false);
    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        const isValid = async() => {
            try {
                const response = await IsValid();
                
                const { first_time_login, allowed_app, is_active, is_deleted } = response.user;
                console.log(response.user);
                
                if(allowed_app == "mrf" && is_active == 1 && is_deleted == 0){
                    navigate("/page-not-found", { replace: true });
                    // setUserValid(true);
                }
                
                if(first_time_login === 1){
                    navigate("/change-password", { replace: true });
                    // setFirstTimeLogin(true);
                }
                
                if(location.pathname == "/"){
                    navigate("/non-chargeable", { replace: true }); 
                }else{
                    return <Outlet />
                }
            } catch (error) {
                console.log(error);
            }
        }
        isValid();
    }, [])
}

export default RequireAuth