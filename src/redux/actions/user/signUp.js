import CNST from "../../../constants";

export function signUpAction(data) {
  return {
    type: CNST.USER.SIGN_UP.FETCH,
    payload: data,
  };
}
