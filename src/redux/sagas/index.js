import {takeLatest} from "redux-saga/effects";
import CNST from "../../constants";
import {getUser, signIn, signOut, initUser, signUp} from "./user";
import {
  createChallenge,
  getChallenges,
  getChallenge,
  inviteUsers,
  uploadMedia,
} from "./challenge";

export default function* rootSaga() {
  yield takeLatest(CNST.USER.SIGN_IN.FETCH, signIn);
  yield takeLatest(CNST.USER.SIGN_UP.FETCH, signUp);
  yield takeLatest(CNST.USER.SIGN_OUT.FETCH, signOut);
  yield takeLatest(CNST.USER.GET_PROFILE.FETCH, getUser);
  yield takeLatest(CNST.USER.INIT_ADMIN_USER.FETCH, initUser);
  yield takeLatest(CNST.CHALLENGE.CREATE.FETCH, createChallenge);
  yield takeLatest(CNST.CHALLENGE.GET_CHALLENGES.FETCH, getChallenges);
  yield takeLatest(CNST.CHALLENGE.UPLOAD_MEDIA.FETCH, uploadMedia);
  yield takeLatest(CNST.CHALLENGE.GET_CHALLENGE.FETCH, getChallenge);
  yield takeLatest(CNST.CHALLENGE.INVITE_USERS.FETCH, inviteUsers);
}
