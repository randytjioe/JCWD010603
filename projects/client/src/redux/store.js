import { combineReducers } from "redux";
import adminReducer from "./auth/adminAuth";
import userReducer from "./auth/userAuth";

const rootReducer = combineReducers({
  userAuth: userReducer,
  adminAuth: adminReducer,
});

export default rootReducer;
