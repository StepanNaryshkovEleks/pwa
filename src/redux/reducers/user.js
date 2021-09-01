import CNST from "../../constants";

import user from "../stores/user";

export default function reducer(state = user, action) {
  switch (action.type) {
    case CNST.USER.INIT_ADMIN_USER.FETCH:
    case CNST.USER.SIGN_OUT.FETCH:
    case CNST.USER.SIGN_IN.FETCH:
    case CNST.USER.SIGN_UP.FETCH:
    case CNST.USER.GET_PROFILE.FETCH:
    case CNST.USER.SHARING_PROFILE.FETCH:
      return {
        ...state,
        fetching: true,
      };
    case CNST.USER.INIT_ADMIN_USER.SUCCESS: {
      return {
        ...state,
        isUserInitialized: true,
        fetching: false,
        securityToken: action.payload,
      };
    }
    case CNST.USER.INIT_ADMIN_USER.ERROR: {
      return {
        ...state,
        isUserInitialized: false,
        fetching: false,
      };
    }
    case CNST.USER.SIGN_IN.SUCCESS:
      return {
        ...state,
        realmToken: action.payload,
        isLoggedIn: true,
        shouldShowAdv: true,
      };
    case CNST.USER.SIGN_UP.SUCCESS:
      return {
        ...state,
        fetching: false,
        shouldShowAdv: true,
      };
    case CNST.USER.SIGN_IN.ERROR:
    case CNST.USER.SIGN_UP.ERROR:
    case CNST.USER.SHARING_PROFILE.ERROR:
    case CNST.USER.SHARING_PROFILE.SUCCESS:
      return {
        ...state,
        fetching: false,
      };
    case CNST.USER.SIGN_OUT.SUCCESS:
      return {
        ...user,
        isLoggedIn: false,
        fetching: false,
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
