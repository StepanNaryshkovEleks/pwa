import CNST from "../../../constants";

export function engageChallengeAction(data) {
  return {
    type: CNST.CHALLENGE.ENGAGE.FETCH,
    payload: data,
  };
}
