import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";


const useToken = () => {

    const token = useAppSelector(selectCurrentToken);

    return token;
};

export default useToken;