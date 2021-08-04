import {put, call, select} from "redux-saga/effects";
import axios from "axios";
import CNST from "../../constants";
import {isResponseOk} from "../../helpers/api/isResponseOk";
import {getToken} from "../../helpers/local-storage-service";
import getMediaId from "../../helpers/getMediaId";
import {notification} from "antd";
import base64ToHexString from "../../helpers/base64ToHexString";

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

export const submitChallengeStriveEntryRequest = ({
  securityToken,
  challengeId,
  participantId,
  striveMediaId,
}) => {
  const reqPayload = {
    jsonType: "vee.UpdateChallengeParticipationForm",
    challengeReference: {
      challengeId,
    },
    participantEntry: {
      participantId,
      striveMediaId: {
        id: striveMediaId,
      },
    },
  };

  return axios
    .put(`rs/application/form/vee`, reqPayload, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
        "realm-token": getToken(),
        "security-token": securityToken,
      },
    })
    .catch((error) => {
      throw error.response.data;
    });
};

export const uploadMediaRequest = ({
  securityToken,
  actorId,
  challengeId,
  mediaExtension,
  length = 0,
  file,
  mediaId,
}) => {
  return axios
    .post(
      `/rs/application/file/local/vee/media/${challengeId}/${base64ToHexString(
        actorId
      )}/${mediaId + mediaExtension}`,
      file,
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
    const mediaId = getMediaId();

    const response = yield call(uploadMediaRequest, {
      securityToken: user.securityToken,
      actorId: user.actorHandle.actorId,
      length: props.payload.fileSize,
      mediaExtension: props.payload.mediaExtension,
      file: props.payload.file,
      challengeId: props.payload.challengeId,
      mediaId,
    });

    if (isResponseOk(response)) {
      yield call(submitChallengeStriveEntryRequest, {
        securityToken: user.securityToken,
        challengeId: props.payload.originChallengeId,
        striveMediaId: mediaId,
        participantId: user.actorHandle.actorId,
      });
      notification.info({
        message: "You successfully submitted your file",
        placement: "topLeft",
      });
      window.history.push(CNST.ROUTES.DASHBOARD);
    }
  } catch (error) {
    console.log(error);
  }
}
