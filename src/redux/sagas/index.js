import {takeLatest} from "redux-saga/effects";
import CNST from "../../constants";
import {getUser, signIn, signOut, initUser, signUp} from "./user";
import {createChallenge} from "./challenge";

export default function* rootSaga() {
  yield takeLatest(CNST.USER.SIGN_IN.FETCH, signIn);
  yield takeLatest(CNST.USER.SIGN_UP.FETCH, signUp);
  yield takeLatest(CNST.USER.SIGN_OUT.FETCH, signOut);
  yield takeLatest(CNST.USER.GET_PROFILE.FETCH, getUser);
  yield takeLatest(CNST.USER.INIT_ADMIN_USER.FETCH, initUser);
  yield takeLatest(CNST.CHALLENGE.CREATE.FETCH, createChallenge);
}
