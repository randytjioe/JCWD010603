import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedPage({
    children,
    needLogin = false,
    guestOnly = false,
}) {
    let navigate = useNavigate();
    const adminSelector = useSelector((state) => state.adminAuth);
    const userSelector = useSelector((state) => state.auth);

    useEffect(() => {

        if (!guestOnly && !adminSelector?.id) {
            return navigate("/admin_login", { replace: true });
        }
        if (needLogin && !adminSelector.isSuperAdmin && adminSelector.id) {
            return navigate("/dashboard", { replace: true });
        }
    }, []);
    return children;
}