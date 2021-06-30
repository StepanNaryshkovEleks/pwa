import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import user from "./user";
import interests from "./interests";

const reducers = combineReducers({
  router: routerReducer,
  user,
  interests,
});

export default reducers;
