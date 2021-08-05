import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import user from "./user";
import signUpDetails from "./signUpDetails";
import newChallenge from "./newChallenge";
import challenges from "./challenges";
import challenge from "./challenge";

const reducers = combineReducers({
  router: routerReducer,
  user,
  signUpDetails,
  newChallenge,
  challenges,
  challenge,
});

export default reducers;
