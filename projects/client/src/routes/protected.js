import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedPage({
    children,
    needLogin = false,
    guestOnly = false,
    superAdminOnly = false,
}) {
    let navigate = useNavigate();
    const adminSelector = useSelector((state) => state.adminAuth);
    const userSelector = useSelector((state) => state.auth);

    useEffect(() => {

        if (needLogin && !adminSelector?.id) {
            return navigate("/admin_login", { replace: true });
        }
        if (guestOnly && adminSelector.id) {
            return navigate("/dashboard", { replace: true });
        }
        if (superAdminOnly && !adminSelector.isSuperAdmin) {
            return navigate("/dashboard", { replace: true });
        }

    }, []);
    return children;
}