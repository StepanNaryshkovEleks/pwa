import CNST from "../../../constants";

export function getChallengesAction(data) {
  return {
    type: CNST.CHALLENGE.GET_CHALLENGES.FETCH,
    payload: data,
  };
}
