import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedPage({ children, needLogin = false }) {
  let navigate = useNavigate();
  const userSelector = useSelector((state) => state.auth);
  console.log(userSelector.isVerify);

  useEffect(() => {
    if (needLogin && !userSelector.id) {
      return navigate("/userlogin", { replace: true });
    }

    if (userSelector.id && userSelector.isVerivy) {
      return navigate("/userpage");
    }

    if (userSelector.id && !userSelector.isVerify) {
      return navigate("/");
    }
  }, []);

  return children;
}

export default ProtectedPage;
