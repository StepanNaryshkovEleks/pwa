import CNST from "../../../constants";

export function getWinnerFileAction(data) {
  return {
    type: CNST.CHALLENGE.GET_WINNER_FILE.FETCH,
    payload: data,
  };
}
