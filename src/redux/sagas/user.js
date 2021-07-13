import {put, call, select} from "redux-saga/effects";
import axios from "axios";
import CNST from "../../constants";
import {isResponseOk} from "../../helpers/api/isResponseOk";
import {getToken, removeToken, setToken} from "../../helpers/local-storage-service";

export const initUserRequest = () =>
  axios
    .post("/login", "", {
      headers: {
        "account-key": "admin",
        "account-id": "admin",
      },
    })
    .catch((error) => {
      throw error;
    });

export const signInRequest = ({password, email}) =>
  axios
    .post("application/vee/signin", "", {
      headers: {
        "realm-id": "vee." + email,
        "realm-secret": password,
      },
    })
    .catch((error) => {
      throw error.response.data;
    });

export function* initUser() {
  try {
    const response = yield call(initUserRequest);
    if (isResponseOk(response)) {
      const token = response.data || "";
      const cutFrom = "admin:";
      const securityToken = token.slice(token.indexOf(cutFrom) + cutFrom.length);

      yield put({type: CNST.USER.INIT_ADMIN_USER.SUCCESS, payload: securityToken});
      if (getToken()) {
        yield put({
          type: CNST.USER.GET_PROFILE.FETCH,
          payload: securityToken,
        });
      }
    } else {
      yield put({
        type: CNST.USER.INIT_ADMIN_USER.ERROR,
      });
    }
  } catch (error) {
    yield put({
      type: CNST.USER.INIT_ADMIN_USER.ERROR,
    });
  }
}

export function* signIn(props) {
  try {
    const response = yield call(signInRequest, props.payload);
    if (isResponseOk(response)) {
      const token = response.data || "";
      const cutFrom = ":";
      const realmToken = token.slice(token.indexOf(cutFrom) + cutFrom.length);
      const {user} = yield select();

      setToken(realmToken);
      yield put({
        type: CNST.USER.GET_PROFILE.FETCH,
        payload: user.securityToken,
      });
      yield put({type: CNST.USER.SIGN_IN.SUCCESS, payload: realmToken});
    } else {
      yield put({
        type: CNST.USER.SIGN_IN.ERROR,
      });
    }
  } catch (error) {
    yield put({
      type: CNST.USER.SIGN_IN.ERROR,
    });
  }
}

export function* signUp() {
  try {
    const {signUpDetails} = yield select();

    console.log("hahaha", signUpDetails.activeAccountDetailsTab);
  } catch (error) {}
}

export const signOutRequest = () =>
  axios.get("application/vee/signout").catch((error) => {
    throw error.response.data;
  });

export function* signOut() {
  try {
    const response = yield call(signOutRequest);
    if (isResponseOk(response)) {
      removeToken();
      yield put({type: CNST.USER.SIGN_OUT.SUCCESS});
      document.location.reload();
    } else {
      yield put({
        type: CNST.USER.SIGN_OUT.ERROR,
      });
    }
  } catch (error) {
    yield put({
      type: CNST.USER.SIGN_OUT.ERROR,
    });
  }
}

export const getUserRequest = ({realmToken, securityToken}) =>
  axios
    .put(
      "/rs/application/form/vee",
      {
        jsonType: "vee.FetchIdentificationForm",
      },
      {
        headers: {
          "realm-token": realmToken,
          "security-token": securityToken,
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    )
    .catch((error) => {
      throw error.response.data;
    });

export function* getUser(props) {
  try {
    const realmToken = getToken();
    const response = yield call(getUserRequest, {
      realmToken,
      securityToken: props.payload,
    });
    if (isResponseOk(response)) {
      yield put({type: CNST.USER.GET_PROFILE.SUCCESS, payload: response.data});
    } else {
      yield put({
        type: CNST.USER.GET_PROFILE.ERROR,
      });
    }
  } catch (error) {
    yield put({
      type: CNST.USER.GET_PROFILE.ERROR,
    });
  }
}
