import { combineReducers } from "redux";
import userReducer from "./auth/auth";
import adminReducer from "./auth/adminAuth";
const rootReducer = combineReducers({
  userAuth: userReducer,
  adminAuth: adminReducer,
});

export default rootReducer;
