import CNST from "../../../constants";

export function createPasswordAction(payload) {
  return {
    type: CNST.SIGN_UP_DETAILS.PASSWORD.CREATE_PASSWORD,
    payload,
  };
}
