import CNST from "../../../constants";

export function submitChallengeWinnerAction(data) {
  return {
    type: CNST.CHALLENGE.SUBMIT_CHALLENGE_WINNER.FETCH,
    payload: data,
  };
}
