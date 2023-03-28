import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedPage({
    children,
    needLogin = false,
    guestOnly = false,
    adminLogin = false,
    adminGuest = false,
    superAdmin = false
}) {
    let navigate = useNavigate();
    const userSelector = useSelector((state) => state.auth);
    const adminSelector = useSelector((state) => state.adminAuth);

    useEffect(() => {
        console.log('adminSelector:', adminSelector);
        console.log('adminLogin:', adminLogin);
        if (needLogin && !userSelector.id) {
            return navigate("/userlogin", { replace: true });
        }
        if (adminLogin && !adminSelector.id) {
            return navigate("/admin_login", { replace: true });
        }
        if (!adminLogin && adminSelector.id) {
            return navigate("/admin_category", { replace: true });
        }
        console.log("superadmin =",superAdmin);
        if (!adminSelector.isSuperAdmin && superAdmin) {
            return navigate("/dashboard", { replace: true });
        }
    }, []);
    return children;
}

export default ProtectedPage;