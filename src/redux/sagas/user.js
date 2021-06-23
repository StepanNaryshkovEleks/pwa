import {put, call} from "redux-saga/effects";
import axios from "axios";
import CNST from "../../constants";
import {isResponseOk} from "../../helpers/api/isResponseOk";

export const signInRequest = () =>
  axios.get("/users/s").catch((error) => {
    throw error.response.data;
  });

export function* signIn(props) {
  try {
    const user = yield call(signInRequest, props.payload);
    console.log(user);
  } catch (error) {}
}

export function* signOut() {
  yield put({
    type: CNST.USER.SIGN_OUT.SUCCESS,
  });
}

export const getUserRequest = () =>
  axios.get("/users/current").catch((error) => {
    throw error.response.data;
  });

export function* getUser() {
  try {
    const response = yield call(getUserRequest);
    if (isResponseOk(response)) {
      yield put({type: CNST.USER.GET_PROFILE.SUCCESS, payload: response.data});
    }
  } catch (error) {
    yield put({
      type: CNST.USER.GET_PROFILE.ERROR,
    });
  }
}
