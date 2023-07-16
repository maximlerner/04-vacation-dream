import { useEffect } from "react";
import authService from "../../../Services/AuthService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/UserSlice";

function LogOut():JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        authService.logout();
        dispatch(logout())
        navigate("/login");
    },[]);

    return <div>
        <h2>Logout</h2>
    </div>
}

export default LogOut;