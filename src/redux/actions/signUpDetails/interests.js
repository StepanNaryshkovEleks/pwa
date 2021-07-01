import CNST from "../../../constants";

export function setInterestAction(interest) {
  return {
    type: CNST.SIGN_UP_DETAILS.INTERESTS.SET_INTEREST,
    interest,
  };
}
