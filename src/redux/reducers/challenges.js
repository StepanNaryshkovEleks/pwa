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
    case CNST.CHALLENGE.GET_CHALLENGES.SUCCESS_WITH_DETAILS: {
      return {
        ...state,
        challengesWithDetails: action.payload,
        fetching: false,
      };
    }
    case CNST.CHALLENGE.GET_CHALLENGES.SUCCESS: {
      return {
        ...state,
        data: action.payload,
        fetching: false,
        error: false,
      };
    }
    case CNST.CHALLENGE.GET_CHALLENGES.ERROR: {
      return {
        ...state,
        error: true,
        fetching: false,
      };
    }
    case CNST.CHALLENGE.GET_WINNER_FILE.FETCH: {
      return {
        ...state,
        challengesWithDetails: {
          ...state.challengesWithDetails,
          closedChallengesMapForMediaFiles: {
            ...state.challengesWithDetails.closedChallengesMapForMediaFiles,
            [action.payload.challengeId]: {
              ...state.challengesWithDetails.closedChallengesMapForMediaFiles[
                action.payload.challengeId
              ],
              isFetching: true,
            },
          },
        },
      };
    }
    case CNST.CHALLENGE.GET_WINNER_FILE.SUCCESS: {
      return {
        ...state,
        challengesWithDetails: {
          ...state.challengesWithDetails,
          closedChallengesMapForMediaFiles: {
            ...state.challengesWithDetails.closedChallengesMapForMediaFiles,
            [action.payload.challengeId]: {
              ...state.challengesWithDetails.closedChallengesMapForMediaFiles[
                action.payload.challengeId
              ],
              file: {...action.payload.data},
              isFetching: false,
            },
          },
        },
      };
    }
    case CNST.CHALLENGE.GET_WINNER_FILE.ERROR: {
      return {
        ...state,
        challengesWithDetails: {
          ...state.challengesWithDetails,
          closedChallengesMapForMediaFiles: {
            ...state.challengesWithDetails.closedChallengesMapForMediaFiles,
            [action.payload.challengeId]: {
              ...state.challengesWithDetails.closedChallengesMapForMediaFiles[
                action.payload.challengeId
              ],
              isFetching: false,
            },
          },
        },
      };
    }
    default:
      return state;
  }
}
