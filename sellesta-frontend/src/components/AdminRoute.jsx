import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }){
    const { user , loading} = useAuth();

    if(loading){
        return <div className="p-10 text-center">درحال بررسی دسترسی...</div>;
    }

    if(!user || !user.is_staff){
        return <Navigate to="/" replace/>
    }

    return children;
}

export default AdminRoute;