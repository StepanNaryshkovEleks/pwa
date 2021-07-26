import {put, call, select} from "redux-saga/effects";
import axios from "axios";
import CNST from "../../constants";
import {isResponseOk} from "../../helpers/api/isResponseOk";
import {getToken, removeToken, setToken} from "../../helpers/local-storage-service";
import base64ToHex from "../../helpers/base64ToHex";
import getAge from "../../helpers/getAge";

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

export const compileLocalProfilePotentialFormRequest = ({
  securityToken,
  realmToken,
  actorId,
  profileId,
}) =>
  axios
    .put(
      "/rs/application/form/vee",
      {
        profileId,
        actorId,
        jsonType: "vee.CompileLocalProfilePotentialForm",
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
    yield put({type: CNST.USER.SIGN_UP.SUCCESS});
  } catch (error) {
    yield put({type: CNST.USER.SIGN_UP.ERROR});
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
      document.location.reload();
      yield put({type: CNST.USER.SIGN_OUT.SUCCESS});
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

export const listLocalProfileHandlesFormRequest = ({
  realmToken,
  securityToken,
  actorId,
}) =>
  axios
    .put(
      "/rs/application/form/vee",
      {
        jsonType: "vee.ListLocalProfileHandlesForm",
        actorId,
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

export const shareProfileRequest = ({
  realmToken,
  securityToken,
  actionIdentityDepositId,
  name,
  age,
  gender,
  interestArray,
  targetIdentityDepositIdArray,
}) =>
  axios
    .put(
      "/rs/application/form/vee",
      {
        jsonType: "vee.DistributeProfileActionForm",
        actionIdentityDepositId,
        shareProfileForm: {
          jsonType: "vee.ShareProfileForm",
          profileSpecification: {
            publicIndividualProfile: {
              name,
              age,
              gender,
              interestArray,
            },
          },
        },
        targetIdentityDepositIdArray,
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
        yield put({type: CNST.USER.SHARING_PROFILE.FETCH});
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

        const getProfileIdResponse = yield call(listLocalProfileHandlesFormRequest, {
          securityToken: user.securityToken,
          realmToken,
          actorId: userAfterUpdating?.actorHandle?.actorId,
        });

        let profileId = null;
        let assetId = userAfterUpdating?.actorHandle?.assetId?.id;

        for (let i = 0; i < getProfileIdResponse.data.profileHandleArray?.length; i++) {
          if (getProfileIdResponse.data.profileHandleArray[i]?.assetId?.id === assetId) {
            profileId = getProfileIdResponse.data.profileHandleArray[i].profileId;
            break;
          }
        }
        const {signUpDetails: signUpDetailsAfterUpdating} = yield select();
        const interestArray = [];

        for (const [key, value] of Object.entries(signUpDetailsAfterUpdating.interests)) {
          if (value) {
            interestArray.push(key);
          }
        }

        const getListOfUsersResponse = yield call(
          compileLocalProfilePotentialFormRequest,
          {
            securityToken: user.securityToken,
            realmToken,
            actorId: userAfterUpdating?.actorHandle?.actorId,
            profileId,
          }
        );
        const usersForSharing = [];
        const actorHandleArray =
          getListOfUsersResponse.data?.profilePotential?.toShareProfileAction
            ?.toActorHandleArray;
        if (actorHandleArray.length > 0) {
          actorHandleArray.forEach((item) => usersForSharing.push(item.actorId));
        }
        console.log(usersForSharing);
        yield call(shareProfileRequest, {
          securityToken: user.securityToken,
          realmToken,
          actionIdentityDepositId: profileId,
          targetIdentityDepositIdArray: usersForSharing,
          name: signUpDetails.userDetails.name,
          age: getAge(signUpDetails.userDetails.date),
          gender: signUpDetails.userDetails.gender,
          interestArray,
        });
        yield put({type: CNST.USER.SHARING_PROFILE.SUCCESS});
        yield put({type: CNST.USER.SIGN_UP.SUCCESS});
      }
    } else {
      yield put({type: CNST.USER.SHARING_PROFILE.ERROR});
      yield put({
        type: CNST.USER.GET_PROFILE.ERROR,
      });
    }
  } catch (error) {
    yield put({type: CNST.USER.SHARING_PROFILE.ERROR});
    yield put({
      type: CNST.USER.GET_PROFILE.ERROR,
    });
  }
}
