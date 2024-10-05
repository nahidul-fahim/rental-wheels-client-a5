import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

    const user = useAppSelector(selectCurrentUser);
    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    return children;
};

export default ProtectedRoute;