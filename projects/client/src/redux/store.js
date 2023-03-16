import { combineReducers } from "redux";
import adminReducer from "./auth/adminAuth";
import userReducer from "./auth/userAuth";

const rootReducer = combineReducers({
  auth: userReducer,
  adminAuth: adminReducer,
});

export default rootReducer;
