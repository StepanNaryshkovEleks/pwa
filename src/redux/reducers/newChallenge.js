import CNST from "../../constants";
import newChallenge from "../stores/newChallenge";

export default function reducer(state = newChallenge, action) {
  switch (action.type) {
    case CNST.CHALLENGE.CREATE.FETCH:
    case CNST.CHALLENGE.GET_CHALLENGE.FETCH: {
      return {
        ...state,
        fetching: true,
        error: false,
      };
    }
    case CNST.CHALLENGE.CREATE.SUCCESS: {
      return {
        ...state,
        data: action.payload,
        fetching: false,
        error: false,
      };
    }
    case CNST.CHALLENGE.GET_CHALLENGE.SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
        fetching: false,
        error: false,
      };
    }
    case CNST.CHALLENGE.CREATE.ERROR:
    case CNST.CHALLENGE.GET_CHALLENGE.ERROR: {
      return {
        ...state,
        error: true,
        fetching: false,
      };
    }
    case CNST.CHALLENGE.INVITE_OBSERVER: {
      return {
        ...state,
        observers: [...state.observers, action.user],
      };
    }
    case CNST.CHALLENGE.UNINVITE_OBSERVER: {
      return {
        ...state,
        observers: state.observers.filter((el) => el !== action.user),
      };
    }
    case CNST.CHALLENGE.INVITE_CHALLENGER: {
      return {
        ...state,
        challengers: [...state.challengers, action.user],
      };
    }
    case CNST.CHALLENGE.UNINVITE_CHALLENGER: {
      return {
        ...state,
        challengers: state.challengers.filter((el) => el !== action.user),
      };
    }
    default:
      return state;
  }
}
