import CNST from "../../../constants";

export function setInterestAction(interest) {
  return {
    type: CNST.INTERESTS.SET_INTEREST,
    interest,
  };
}
