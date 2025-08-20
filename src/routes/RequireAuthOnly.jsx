import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { IsValid, getRole } from '../services/authService';

const RequireAuthOnly = () => {
    const [outlet, setOutlet] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const isValid = async() => {
            try {
                const response = await IsValid();
                
                const { is_active, is_deleted } = response.user;
                const allowed_app = response.user.allowed_app.split(';');
                
                if(!allowed_app.includes("mrf") || is_active != 1 || is_deleted != 0){
                    navigate("/page-not-found", { replace: true });
                }else{
                    const roles = await getRole();
                    // console.log(roles);
                    
                    localStorage.setItem("roles",  JSON.stringify(roles));
                    
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

export default RequireAuthOnly