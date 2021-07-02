import CNST from "../../constants";

import signUpDetails from "../stores/signUpDetails";

export default function reducer(state = signUpDetails, action) {
  switch (action.type) {
    case CNST.SIGN_UP_DETAILS.INTERESTS.SET_INTEREST:
      return {
        ...state,
        interests: {
          ...state.interests,
          ...action.interest,
        },
      };
    case CNST.SIGN_UP_DETAILS.PASSWORD.CREATE_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case CNST.SIGN_UP_DETAILS.DETAILS.SET_ACCOUNT_DETAILS_TAB:
      return {
        ...state,
        activeAccountDetailsTab: action.payload,
      };
    case CNST.SIGN_UP_DETAILS.DETAILS.SET_COMPANY_DETAILS:
      return {
        ...state,
        companyDetails: {
          ...state.companyDetails,
          [action.payload.key]: action.payload.value,
        },
      };
    case CNST.SIGN_UP_DETAILS.DETAILS.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          [action.payload.key]: action.payload.value,
        },
      };
    default:
      return state;
  }
}
