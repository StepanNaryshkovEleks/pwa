import CNST from "../../../constants";

export function voteChallengeAction(data) {
  return {
    type: CNST.CHALLENGE.VOTE_CHALLENGE.FETCH,
    payload: data,
  };
}
