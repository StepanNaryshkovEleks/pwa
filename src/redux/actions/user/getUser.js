import CNST from "../../../constants";

export function getUserAction(securityToken) {
  return {
    type: CNST.USER.GET_PROFILE.FETCH,
    payload: securityToken,
  };
}
