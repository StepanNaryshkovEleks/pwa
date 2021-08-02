import CNST from "../../../constants";

export function getChallengeAction(data) {
  return {
    type: CNST.CHALLENGE.GET_CHALLENGE.FETCH,
    payload: data,
  };
}
