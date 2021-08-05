import {put, call, select, all} from "redux-saga/effects";
import axios from "axios";
import CNST from "../../constants";
import {isResponseOk} from "../../helpers/api/isResponseOk";
import {getToken} from "../../helpers/local-storage-service";
import getMediaId from "../../helpers/getMediaId";
import {notification} from "antd";
import base64ToHexString from "../../helpers/base64ToHexString";

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
      challengeCategoryArray: [],
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
      props.payload.history.push(CNST.ROUTES.INVITATION);
      yield put({type: CNST.CHALLENGE.CREATE.SUCCESS, payload: challenge});
    } else {
      yield put({
        type: CNST.CHALLENGE.CREATE.ERROR,
      });
    }
  } catch (error) {
    yield put({
      type: CNST.CHALLENGE.CREATE.ERROR,
    });
  }
}

export const getChallengeRequest = ({securityToken, actorId, challengeId}) => {
  const reqPayload = {
    jsonType: "vee.CompileChallengePotentialForm",
    actorHandle: {actorId},
    challengeReference: {challengeId},
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

export function* getChallenge(props) {
  try {
    const {user} = yield select();
    const response = yield call(getChallengeRequest, {
      ...props.payload,
      securityToken: user.securityToken,
      actorId: user.actorHandle.actorId,
    });

    if (isResponseOk(response)) {
      yield put({
        type: CNST.CHALLENGE.GET_CHALLENGE.SUCCESS,
        payload: response.data.challengePotential,
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

export function* getChallenges(props) {
  try {
    const {user} = yield select();
    const response = yield call(getChallengesRequest, {
      securityToken: user.securityToken,
      actorId: user.actorHandle.actorId,
    });

    if (isResponseOk(response)) {
      if (props?.payload?.withDetails) {
        let detailedChallengesResponse = yield all(
          response.data.challengeHandleArray.map((challenge) => {
            return (function* () {
              try {
                return yield call(getChallengeRequest, {
                  securityToken: user.securityToken,
                  actorId: user.actorHandle.actorId,
                  challengeId: challenge.challengeId,
                });
              } catch (e) {
                return e;
              }
            })();
          })
        );
        const newData = {
          all: [],
          created: [],
          active: [],
          invites: [],
          rejected: [],
          voting: [],
          forfeit: [],
        };

        detailedChallengesResponse = detailedChallengesResponse
          .filter((data) => data.status === 200)
          .map((data) => {
            return {
              challengePotential: data.data.challengePotential,
              challengeReference: data.data.challengeReference,
              actorHandle: data.data.actorHandle,
            };
          });

        const myId = user.actorHandle.actorId;

        for (let i = 0; i < detailedChallengesResponse.length; i++) {
          const indx = detailedChallengesResponse[
            i
          ].challengePotential.challengeState.participantArray.findIndex(
            (el) => el.participantId === myId
          );
          if (
            detailedChallengesResponse[i].challengePotential.challengeState
              .challengeDefinition.challengeOwnerHandle.actorId === myId
          ) {
            newData.created.push(detailedChallengesResponse[i]);
          } else if (
            indx >= 0 &&
            detailedChallengesResponse[i].challengePotential.challengeState
              .participantArray[indx].participantStatus === "INVITED"
          ) {
            newData.invites.push(detailedChallengesResponse[i]);
          } else if (
            indx >= 0 &&
            detailedChallengesResponse[i].challengePotential.challengeState
              .participantArray[indx].participantStatus === "ENGAGED"
          ) {
            newData.active.push(detailedChallengesResponse[i]);
          } else if (
            indx >= 0 &&
            detailedChallengesResponse[i].challengePotential.challengeState
              .participantArray[indx].participantStatus === "DISENGAGED"
          ) {
            newData.rejected.push(detailedChallengesResponse[i]);
          }
        }
        yield put({
          type: CNST.CHALLENGE.GET_CHALLENGES.SUCCESS_WITH_DETAILS,
          payload: newData,
        });
      } else {
        yield put({
          type: CNST.CHALLENGE.GET_CHALLENGES.SUCCESS,
          payload: response.data.challengeHandleArray,
        });
      }
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

export const inviteUsersRequest = ({
  securityToken,
  actorId,
  assetId,
  challengeReference,
  observers,
  challengers,
}) => {
  const reqPayload = {
    jsonType: "vee.InviteChallengeParticipantsForm",
    challengeOwnerHandle: {actorId, assetId},
    challengeReference,
    challengerParticipantIdArray: challengers,
    observerParticipantIdArray: observers,
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

export function* inviteUsers(props) {
  try {
    const {user} = yield select();
    const {newChallenge} = yield select();

    const response = yield call(inviteUsersRequest, {
      securityToken: user.securityToken,
      actorId: user.actorHandle.actorId,
      assetId: user.actorHandle.assetId,
      observers: newChallenge.observers,
      challengers: newChallenge.challengers,
      challengeReference: newChallenge.data.challengeReference,
    });

    if (isResponseOk(response)) {
      props.payload.history.push(CNST.ROUTES.DASHBOARD);
      yield put({
        type: CNST.CHALLENGE.INVITE_USERS.SUCCESS,
      });
    } else {
      yield put({
        type: CNST.CHALLENGE.INVITE_USERS.ERROR,
      });
    }
  } catch (error) {
    yield put({
      type: CNST.CHALLENGE.INVITE_USERS.ERROR,
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

export const engageChallengeRequest = ({
  securityToken,
  actorId,
  challengeReference,
  participantRole,
  participantStatus,
}) => {
  const reqPayload = {
    jsonType: "vee.UpdateChallengeParticipationForm",
    challengeReference,
    participant: {
      participantId: actorId,
      participantRole,
      participantStatus,
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

export function* engageChallenge(props) {
  try {
    const {user} = yield select();

    const response = yield call(engageChallengeRequest, {
      ...props.payload,
      securityToken: user.securityToken,
      actorId: user.actorHandle.actorId,
    });

    if (isResponseOk(response)) {
      yield put({
        type: CNST.CHALLENGE.ENGAGE.SUCCESS,
        payload: response.data.participant,
      });
    } else {
      yield put({
        type: CNST.CHALLENGE.ENGAGE.ERROR,
      });
    }
  } catch (error) {
    yield put({
      type: CNST.CHALLENGE.ENGAGE.ERROR,
    });
  }
}
