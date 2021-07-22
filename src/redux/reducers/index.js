import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import user from "./user";
import signUpDetails from "./signUpDetails";
import newChallenge from "./newChallenge";
import challenges from "./challenges";

const reducers = combineReducers({
  router: routerReducer,
  user,
  signUpDetails,
  newChallenge,
  challenges,
});

export default reducers;
