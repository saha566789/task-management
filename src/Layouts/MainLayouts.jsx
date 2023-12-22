import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Navbar/Navbar";


const MainLayouts = () => {
    return (
        <div>
            <Navbar></Navbar>
         <Outlet></Outlet>
        </div>
    );
};

export default MainLayouts;