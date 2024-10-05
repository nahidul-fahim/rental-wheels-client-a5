import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";


const useLogout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/signin');
    };

    return handleLogout;
};

export default useLogout;