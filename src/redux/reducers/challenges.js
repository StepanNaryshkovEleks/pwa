import CNST from "../../constants";
import challenges from "../stores/challenges";

export default function reducer(state = challenges, action) {
  switch (action.type) {
    case CNST.CHALLENGE.GET_CHALLENGES.FETCH:
      return {
        ...state,
        fetching: true,
        error: false,
      };
    case CNST.CHALLENGE.GET_CHALLENGES.SUCCESS: {
      return {
        ...state,
        data: action.payload,
        fetching: false,
        error: false,
      };
    }
    case CNST.CHALLENGE.CREATE.SUCCESS: {
      return {
        ...state,
        data: [
          ...state.data,
          {
            ...action.payload,
            challengeId: action.payload.challengeReference.challengeId,
          },
        ],
      };
    }
    case CNST.CHALLENGE.GET_CHALLENGES.ERROR: {
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
