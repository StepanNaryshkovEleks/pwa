import CNST from "../../constants";

import interests from "../stores/interests";

export default function reducer(state = interests, action) {
  switch (action.type) {
    case CNST.INTERESTS.SET_INTEREST:
      return {...state, ...action.interest};
    default:
      return state;
  }
}
