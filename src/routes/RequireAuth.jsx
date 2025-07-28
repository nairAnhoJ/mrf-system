import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { IsValid, getRole } from '../services/authService';

const RequireAuth = () => {
    const [outlet, setOutlet] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(user);
        
        const isValid = async() => {
            try {
                const response = await IsValid();
                const { first_time_login, is_active, is_deleted } = response.user;
                const allowed_app = response.user.allowed_app.split(';');
                
                if(!allowed_app.includes("mrf") || is_active != 1 || is_deleted != 0){
                    navigate("/page-not-found", { replace: true });
                }else if(first_time_login === 1){
                    navigate("/change-password", { replace: true });
                }else{
                    const role = await getRole();
                    console.log(role);
                    
                    if(location.pathname == "/"){
                        navigate("/non-chargeable", { replace: true }); 
                        setOutlet(true);
                    }else{
                        setOutlet(true);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        isValid();
    }, []);

    if(outlet){
        return <Outlet />
    }
}

export default RequireAuth