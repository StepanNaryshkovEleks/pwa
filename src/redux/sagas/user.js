import {put, call, select} from "redux-saga/effects";
import axios from "axios";
import CNST from "../../constants";
import {isResponseOk} from "../../helpers/api/isResponseOk";
import {getToken, removeToken, setToken} from "../../helpers/local-storage-service";
import base64ToHex from "../../helpers/base64ToHex";

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

export const getListLocalActorRequest = ({securityToken, realmToken}) =>
  axios
    .put(
      "/rs/application/form/vee",
      {
        jsonType: "vee.ListLocalActorHandlesForm",
      },
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "realm-token": realmToken,
          "security-token": securityToken,
        },
      }
    )
    .catch((error) => {
      throw error.response.data;
    });

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

export const recordProfileRequest = ({securityToken, data}) =>
  axios
    .put("rs/application/form/vee", data, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "realm-token": getToken(),
        "security-token": securityToken,
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
    const name = shouldCreateNewUser
      ? signUpDetails.userDetails.name
      : signUpDetails.companyDetails.name;

    const signUpResponse = yield call(signUpRequest, {
      realmType,
      password: signUpDetails.password,
      name,
    });
    const token = signUpResponse.data || "";
    const cutFrom = ":";
    const realmToken = token.slice(token.indexOf(cutFrom) + cutFrom.length);

    setToken(realmToken);

    yield call(getUser, {
      shouldShareProfile: true,
    });

    // end fetch
  } catch (error) {
    console.log(error);
  }
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

export const shareProfileRequest = ({realmToken, securityToken}) =>
  axios
    .put(
      "/rs/application/form/vee",
      {
        jsonType: "vee.DistributeProfileActionForm",
        actionFileDepositId: "6X8yNjMws2RbDA==",
        actionFileAccessIdArray: ["YW/q5GAndTyjfw==", "gfyub6XIa1u+3g=="],
        actionIdentityDepositId: "UxvzMmpBsBH2dg==",
        shareProfileForm: {
          jsonType: "vee.ShareProfileForm",
          profileSpecification: {
            publicIndividualProfile: {
              name: "individualName17",
              age: 12,
              gender: "Male",
              interestArray: ["Football", "Tennis", "cats"],
            },
          },
        },
        targetIdentityDepositIdArray: [
          // users
          "ydvTff0S94JSow==",
          "Sw+UwctWf2dNbQ==",
        ],
      },
      {
        headers: {
          "realm-token": realmToken,
          "security-token": securityToken,
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
        },
      }
    )
    .catch((error) => {
      throw error.response.data;
    });

export function* getUser({shouldShareProfile = false}) {
  try {
    const realmToken = getToken();
    const {user, signUpDetails} = yield select();
    const response = yield call(getUserRequest, {
      realmToken,
      securityToken: user.securityToken,
    });
    if (isResponseOk(response)) {
      yield put({type: CNST.USER.GET_PROFILE.SUCCESS, payload: response.data});

      if (shouldShareProfile) {
        const shouldCreateNewUser = signUpDetails.activeAccountDetailsTab === "user";
        const name = shouldCreateNewUser
          ? signUpDetails.userDetails.name
          : signUpDetails.companyDetails.name;
        const {user: userAfterUpdating} = yield select();

        yield call(recordProfileRequest, {
          securityToken: user.securityToken,
          data: {
            jsonType: "vee.RecordProfileForm",
            profileDefinition: {
              profileReference: {assetId: {id: name}},
              propertyDataArray: [
                {id: "asset.id", value: name},
                {id: "asset.type", value: "vee.Profile"},
                {
                  id: "asset.owner",
                  value: base64ToHex(
                    userAfterUpdating?.actorHandle?.actorId
                  ).toLocaleLowerCase(),
                },
              ],
            },
          },
        });
        const getListOfUsersResponse = yield call(getListLocalActorRequest, {
          securityToken: user.securityToken,
          realmToken,
        });
        const data = [];
        if (getListOfUsersResponse.data.actorHandleArray.length > 0) {
          getListOfUsersResponse.data.actorHandleArray.forEach((item) =>
            data.push(item.actorId)
          );
        }
      }
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
