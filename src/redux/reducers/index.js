import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import user from "./user";
import signUpDetails from "./signUpDetails";
import newChallenge from "./newChallenge";

const reducers = combineReducers({
  router: routerReducer,
  user,
  signUpDetails,
  newChallenge,
});

export default reducers;
