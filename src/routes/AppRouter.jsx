import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from '../pages/Login'
import NotFoundPage from "../pages/NotFoundPage";
import Sidebar from "../components/Sidebar";

// Non Chargeable
import NonChargeableHome from '../pages/non-chargeable/NonChargeableHome'
// import IssuedItemsAdd from '../pages/issued-items/Add'
// import IssuedItemsEdit from '../pages/issued-items/Edit'


// Settings
// import Settings from '../pages/settings/Index'

import RequireAuth from "./RequireAuth";
import NonChargeableAdd from "../pages/non-chargeable/NonChargeableAdd";
import NonChargeableEdit from "../pages/non-chargeable/NonChargeableEdit";
// import AdminAuth from "./AdminAuth";
// import ChangePassword from "../pages/ChangePassword";
// import RequireAuthOnly from "./RequireAuthOnly";


function AppRouter() {
    return (
        <Router>
            <HeaderWrapper />

            <Routes>
                <Route path="/login" element={<Login />} />

                <Route element={<RequireAuth />}>
                    {/* HOME AND ISSUED ITEMS */}
                    <Route path="/" element={<NonChargeableHome />} />
                    <Route path="/non-chargeable" element={<NonChargeableHome />} />
                    <Route path="/non-chargeable/add" element={<NonChargeableAdd />} />
                    <Route path="/non-chargeable/edit/:id" element={<NonChargeableEdit />} />

                    {/* <Route element={<AdminAuth />}> */}
                        {/* SETTING */}
                        {/* <Route path='/settings' element={<Settings />} /> */}
                    {/* </Route> */}
                </Route>
                
                {/* <Route element={<RequireAuthOnly />}>
                    <Route path="/change-password" element={<ChangePassword />} />
                </Route> */}

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}

const HeaderWrapper = () => {
    const token = localStorage.getItem("token");
    
    const path = useLocation();
    const hideHeaderRoutes = ['/', '/non-chargeable', '/non-chargeable/add'];
    const isEditPage = path.pathname.startsWith('/non-chargeable/edit/');

    if((hideHeaderRoutes.includes(path.pathname) || isEditPage) && token){
        return <Sidebar />
    }
}

export default AppRouter;