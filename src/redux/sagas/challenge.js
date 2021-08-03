import {put, call, select} from "redux-saga/effects";
import axios from "axios";
import CNST from "../../constants";
import {isResponseOk} from "../../helpers/api/isResponseOk";
import {getToken} from "../../helpers/local-storage-service";
import getMediaId from "../../helpers/getMediaId";
import {notification} from "antd";

const openNotification = () => {
  notification.info({
    message: "Creating new challenge is failed",
    placement: "topLeft",
  });
};

export const createChallengeRequest = ({
  name,
  description,
  securityToken,
  assetId,
  actorId,
}) => {
  const reqPayload = {
    jsonType: "vee.RecordChallengeForm",
    challengeDefinition: {
      challengeVersion: 1,
      challengeOwnerHandle: {
        actorId,
        assetId,
      },
      challengeName: name,
      challengeDescription: description,
      challengeVideoDurationSecMax: 30,
    },
  };

  return axios
    .put("rs/application/form/vee", reqPayload, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "realm-token": getToken(),
        "security-token": securityToken,
      },
    })
    .catch((error) => {
      throw error.response.data;
    });
};

export function* createChallenge(props) {
  try {
    const {user} = yield select();
    const response = yield call(createChallengeRequest, {
      ...props.payload,
      securityToken: user.securityToken,
      assetId: user.actorHandle.assetId,
      actorId: user.actorHandle.actorId,
    });

    const challenge = response.data.challengeDefinition;
    if (isResponseOk(response)) {
      yield put({type: CNST.CHALLENGE.CREATE.SUCCESS, payload: challenge});
    } else {
      openNotification();
      yield put({
        type: CNST.CHALLENGE.CREATE.ERROR,
      });
    }
  } catch (error) {
    openNotification();
    yield put({
      type: CNST.CHALLENGE.CREATE.ERROR,
    });
  }
}

export const getChallengesRequest = ({securityToken, actorId}) => {
  const reqPayload = {
    jsonType: "vee.ListChallengeHandlesForm",
    actorId,
  };

  return axios
    .put("rs/application/form/vee", reqPayload, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "realm-token": getToken(),
        "security-token": securityToken,
      },
    })
    .catch((error) => {
      throw error.response.data;
    });
};

export function* getChallenges() {
  try {
    const {user} = yield select();
    const response = yield call(getChallengesRequest, {
      securityToken: user.securityToken,
      actorId: user.actorHandle.actorId,
    });

    if (isResponseOk(response)) {
      yield put({
        type: CNST.CHALLENGE.GET_CHALLENGES.SUCCESS,
        payload: response.data.challengeHandleArray,
      });
    } else {
      yield put({
        type: CNST.CHALLENGE.GET_CHALLENGES.ERROR,
      });
    }
  } catch (error) {
    yield put({
      type: CNST.CHALLENGE.GET_CHALLENGES.ERROR,
    });
  }
}

export const uploadMediaRequest = ({
  securityToken,
  actorId,
  challengeId,
  mediaExtension,
  length = 0,
}) => {
  const reqPayload = {
    jsonType: "vee.ListChallengeHandlesForm",
    actorId,
  };

  return axios
    .put(
      `/rs/application/file/local/vee/media/${challengeId}/${actorId}/${
        getMediaId() + mediaExtension
      }`,
      reqPayload,
      {
        headers: {
          "Content-Type": "application/octet-stream",
          Accept: "application/json",
          "realm-token": getToken(),
          "File-Length": length,
          "security-token": securityToken,
        },
      }
    )
    .catch((error) => {
      throw error.response.data;
    });
};

export function* uploadMedia(props) {
  try {
    const {user} = yield select();
    const response = yield call(uploadMediaRequest, {
      securityToken: user.securityToken,
      actorId: user.actorHandle.actorId,
      length: props.payload.duration * 1000,
      mediaExtension: props.payload.mediaExtension,
    });

    if (isResponseOk(response)) {
      console.log("response", response);
    }
  } catch (error) {
    console.log(error);
  }
}
