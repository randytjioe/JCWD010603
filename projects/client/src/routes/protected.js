import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedPage({ children, needLogin = false }) {
    let navigate = useNavigate();
    const userSelector = useSelector((state) => state.auth);
    const adminSelector = useSelector((state) => state.adminAuth);
    console.log(userSelector.isVerify);

    useEffect(() => {
        if (needLogin && !userSelector.id) {
            return navigate("/userlogin", { replace: true });
        }

        if (needLogin && !adminSelector.id) {
            return navigate("/userpage", { replace: true });
        }
        if (needLogin && adminSelector.id) {
            return navigate("/dashboard", { replace: true });
        }
    }, []);
    return children;
}

export default ProtectedPage;