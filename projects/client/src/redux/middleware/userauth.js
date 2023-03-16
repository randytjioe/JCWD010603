import { axiosInstance } from "../../config/config";
import user_types from "../auth/types";

export function userLogin(values) {
  return async function (dispatch) {
    try {
      const res = await axiosInstance.post("/user/userlogin", values);
      const userData = res.data.result;
      console.log(userData.user);

      if (userData) {
        dispatch({
          type: user_types.USER_LOGIN,
          payload: userData.user,
        });
        localStorage.setItem("token", userData.token);
        return { status: true, data: userData.user };
      }

      return { status: false, data: {} };
    } catch (err) {
      console.log(err);
      return { status: false, data: {} };
    }
  };
}
