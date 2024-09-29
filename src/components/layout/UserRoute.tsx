import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const UserRoute = ({ children }: { children: ReactNode }) => {

    const user = useAppSelector(selectCurrentUser);
    if (!user || user?.userRole !== 'user') {
        return <Navigate to="/signin" replace />;
    }

    return children;
}

export default UserRoute;
