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
    default:
      return state;
  }
}
