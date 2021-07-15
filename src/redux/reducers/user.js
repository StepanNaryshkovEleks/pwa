import CNST from "../../constants";

import user from "../stores/user";

export default function reducer(state = user, action) {
  switch (action.type) {
    case CNST.USER.INIT_ADMIN_USER.FETCH:
    case CNST.USER.SIGN_OUT.FETCH:
    case CNST.USER.SIGN_IN.FETCH:
      return {
        ...state,
        fetching: true,
      };
    case CNST.USER.INIT_ADMIN_USER.SUCCESS: {
      return {
        ...state,
        isUserInitialized: true,
        securityToken: action.payload,
      };
    }
    case CNST.USER.INIT_ADMIN_USER.ERROR: {
      return {
        ...state,
        isUserInitialized: false,
      };
    }
    case CNST.USER.SIGN_IN.SUCCESS:
      return {
        ...state,
        realmToken: action.payload,
        isLoggedIn: true,
      };
    case CNST.USER.SIGN_IN.ERROR:
      return {
        ...state,
        fetching: false,
      };
    case CNST.USER.SIGN_OUT.SUCCESS:
      return {
        ...user,
        isLoggedIn: false,
      };
    case CNST.USER.GET_PROFILE.FETCH:
      return {
        ...state,
        fetching: true,
      };
    case CNST.USER.GET_PROFILE.SUCCESS:
      return {
        ...state,
        ...action.payload,
        fetching: false,
        isLoggedIn: true,
        isGetUserFetched: true,
      };
    case CNST.USER.GET_PROFILE.ERROR:
      return {
        ...state,
        fetching: false,
        isGetUserFetched: false,
        isFetchingProfile: false,
        isLoggedIn: false,
      };
    default:
      return state;
  }
}
