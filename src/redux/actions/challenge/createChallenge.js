import CNST from "../../../constants";

export function createChallengeAction(data) {
  return {
    type: CNST.CHALLENGE.CREATE.FETCH,
    payload: data,
  };
}
