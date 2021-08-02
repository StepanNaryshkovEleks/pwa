import {put, call, select} from "redux-saga/effects";
import axios from "axios";
import CNST from "../../constants";
import {isResponseOk} from "../../helpers/api/isResponseOk";
import {getToken} from "../../helpers/local-storage-service";

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
      props.payload.history.push("/invitation/audience");
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
