import CNST from "../../constants";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case CNST.CHALLENGE.GET_CHALLENGE.FETCH: {
      return {
        ...state,
        fetching: true,
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
    case CNST.CHALLENGE.ENGAGE.SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          challengeState: {
            ...state.data.challengeState,
            participantArray: state.data.challengeState.participantArray.map((el) =>
              el.participantId === action.payload.participantId ? action.payload : el
            ),
          },
        },
      };
    }
    case CNST.CHALLENGE.GET_CHALLENGE.ERROR: {
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