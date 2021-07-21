import CNST from "../../constants";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case CNST.CHALLENGE.CREATE.FETCH:
      return {
        ...state,
        fetching: true,
        error: false,
      };
    case CNST.CHALLENGE.CREATE.SUCCESS: {
      return {
        ...state,
        data: action.payload,
        fetching: false,
        error: false,
      };
    }
    case CNST.CHALLENGE.CREATE.ERROR: {
      return {
        ...state,
        error: true,
        fetching: false,
      };
    }
    default:
      return state;
  }
}
