import CNST from "../../../constants";

export function setAccountDetailsTabAction(payload) {
  return {
    type: CNST.SIGN_UP_DETAILS.DETAILS.SET_ACCOUNT_DETAILS_TAB,
    payload,
  };
}

export function setCompanyDetailsAction(payload) {
  return {
    type: CNST.SIGN_UP_DETAILS.DETAILS.SET_COMPANY_DETAILS,
    payload,
  };
}

export function setUserDetailsAction(payload) {
  return {
    type: CNST.SIGN_UP_DETAILS.DETAILS.SET_USER_DETAILS,
    payload,
  };
}
