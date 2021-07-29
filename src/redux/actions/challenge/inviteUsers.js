import CNST from "../../../constants";

export function inviteObserverAction(user) {
  return {
    type: CNST.CHALLENGE.INVITE_OBSERVER,
    user,
  };
}

export function uninviteObserverAction(user) {
  return {
    type: CNST.CHALLENGE.UNINVITE_OBSERVER,
    user,
  };
}

export function inviteChallengerAction(user) {
  return {
    type: CNST.CHALLENGE.INVITE_CHALLENGER,
    user,
  };
}

export function uninviteChallengerAction(user) {
  return {
    type: CNST.CHALLENGE.UNINVITE_CHALLENGER,
    user,
  };
}

export function inviteUserAction(data) {
  return {
    type: CNST.CHALLENGE.INVITE_USERS.FETCH,
    payload: data,
  };
}
