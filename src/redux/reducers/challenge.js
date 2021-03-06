import CNST from "../../constants";

const defaultState = {
  fetching: false,
  isFileLoading: false,
  isWinnerLoading: false,
  error: false,
  mediaFilesForDetails: {},
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case CNST.CHALLENGE.GET_CHALLENGE.FETCH:
    case CNST.CHALLENGE.VOTE_CHALLENGE.FETCH:
    case CNST.CHALLENGE.GET_MEDIA_FILES.FETCH: {
      return {
        ...state,
        fetching: true,
        error: false,
        shouldFetchChallenge: false,
      };
    }
    case CNST.CHALLENGE.UPLOAD_MEDIA.FETCH: {
      return {
        ...state,
        isFileLoading: true,
      };
    }
    case CNST.CHALLENGE.UPLOAD_MEDIA.ERROR:
    case CNST.CHALLENGE.UPLOAD_MEDIA.SUCCESS: {
      return {
        ...state,
        isFileLoading: false,
      };
    }
    case CNST.CHALLENGE.SUBMIT_CHALLENGE_WINNER.FETCH: {
      return {
        ...state,
        isWinnerLoading: true,
      };
    }
    case CNST.CHALLENGE.GET_MEDIA_FILE.FETCH: {
      return {
        ...state,
        mediaFilesForDetails: {
          ...state.mediaFilesForDetails,
          [action.payload.mediaId]: {
            fetching: true,
          },
        },
      };
    }
    case CNST.CHALLENGE.SUBMIT_CHALLENGE_WINNER.ERROR:
    case CNST.CHALLENGE.SUBMIT_CHALLENGE_WINNER.SUCCESS: {
      return {
        ...state,
        isWinnerLoading: false,
        data: {
          ...state.data,
          challengeState: {
            ...state.data.challengeState,
            selectParticipantEntryArray: [action.payload],
          },
        },
        fetching: false,
        error: false,
      };
    }
    case CNST.CHALLENGE.VOTE_CHALLENGE.SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          challengeState: {
            ...state.data.challengeState,
            striveParticipantEntryArray:
              state.data.challengeState.striveParticipantEntryArray.length > 0
                ? state.data.challengeState.striveParticipantEntryArray.map(
                    (striveParticipantEntry) =>
                      striveParticipantEntry.striveMediaId.id ===
                      action.payload.striveMediaId
                        ? {
                            ...striveParticipantEntry,
                            voteCount: (striveParticipantEntry.voteCount || 0) + 1,
                          }
                        : striveParticipantEntry
                  )
                : [
                    {
                      striveMediaId: action.payload.striveMediaId,
                      participantId: action.payload.mediaOwnerId,
                      voteCount: 1,
                      entryId: {
                        id: action.payload.participantEntry.voteEntryId.id,
                      },
                    },
                  ],
            voteParticipantEntryArray: [
              ...state.data.challengeState.voteParticipantEntryArray,
              action.payload.participantEntry,
            ],
          },
        },
        fetching: false,
        error: false,
      };
    }
    case CNST.CHALLENGE.GET_CHALLENGE.SUCCESS: {
      return {
        ...state,
        data: action.payload,
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
    case CNST.CHALLENGE.GET_MEDIA_FILES.SUCCESS: {
      return {
        ...state,
        fetching: false,
        data: {
          ...state.data,
          mediaFiles: action.payload,
        },
      };
    }
    case CNST.CHALLENGE.GET_MEDIA_FILE.SUCCESS: {
      return {
        ...state,
        mediaFilesForDetails: {
          ...state.mediaFilesForDetails,
          [action.payload.details.mediaId.id]: {
            ...action.payload,
            fetching: false,
          },
        },
      };
    }
    case CNST.CHALLENGE.VOTE_CHALLENGE.ERROR:
    case CNST.CHALLENGE.GET_CHALLENGE.ERROR:
    case CNST.CHALLENGE.GET_MEDIA_FILES.ERROR: {
      return {
        ...state,
        error: true,
        fetching: false,
        shouldFetchChallenge: false,
      };
    }
    case CNST.CHALLENGE.GET_MEDIA_FILE.ERROR: {
      return {
        ...state,
        mediaFilesForDetails: {
          ...state.mediaFilesForDetails,
          [action.payload.mediaId]: {
            error: true,
            fetching: false,
          },
        },
      };
    }
    case CNST.CHALLENGE.CLEAR_CHALLENGE_SUCCESS: {
      return defaultState;
    }
    default:
      return state;
  }
}
