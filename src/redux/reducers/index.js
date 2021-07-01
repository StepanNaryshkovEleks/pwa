import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import user from "./user";
import signUpDetails from "./signUpDetails";

const reducers = combineReducers({
  router: routerReducer,
  user,
  signUpDetails,
});

export default reducers;
