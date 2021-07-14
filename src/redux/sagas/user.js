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

export const recordRequest = ({data, name}) => {
  const reqPayload = {
    jsonType: "vee.RecordProfileForm",
    profileDefinition: {
      profileReference: {
        profileId: "QqguEece2l/rpw==",
      },
      propertyDataArray: data,
    },
  };
  return axios.post("rs/application/form/vee", reqPayload).catch((error) => {
    throw error.response.data;
  });
};

export const signInRequest = ({password, name, securityToken}) =>
  axios
    .post("application/vee/signin", "", {
      headers: {
        "realm-id": "vee." + name,
        "realm-secret": password,
        "security-token": securityToken,
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
    const {user} = yield select();
    const response = yield call(signInRequest, {
      ...props.payload,
      securityToken: user.securityToken,
    });
    if (isResponseOk(response)) {
      const token = response.data || "";
      const cutFrom = ":";
      const realmToken = token.slice(token.indexOf(cutFrom) + cutFrom.length);

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

export const signUpRequest = ({password, name, realmType}) =>
  axios
    .post("application/vee/signup", "", {
      headers: {
        "realm-id": "vee." + name,
        "realm-secret": password,
        "realm-type": realmType,
      },
    })
    .catch((error) => {
      throw error.response.data;
    });

export function* signUp() {
  try {
    const {signUpDetails} = yield select();
    const shouldCreateNewUser = signUpDetails.activeAccountDetailsTab === "user";
    const realmType = shouldCreateNewUser ? "vee.Individual" : "vee.Business";
    const signUpResponse = yield call(signUpRequest, {
      realmType,
      password: signUpDetails.password,
      name: shouldCreateNewUser
        ? signUpDetails.userDetails.name
        : signUpDetails.companyDetails.name,
    });
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
