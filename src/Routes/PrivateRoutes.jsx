import { useContext } from "react";
import { AuthContext } from "../Hooks/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoutes = ({children}) => {
    const { user,loading } = useContext(AuthContext);
 const path = useLocation().pathname
 console.log(path)

    if (loading) return <h1 className="text-5xl">Loading....</h1>

    if (!user?.email) {
        return <Navigate state={path} to='/login' />
    }



    return children;
};

export default PrivateRoutes;