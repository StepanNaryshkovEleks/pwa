const CHALLENGE = {
  ACTIVE: "active",
  CREATED: "created",
  INVITES: "invites",
  REJECTED: "rejected",
  VOTING: "voting",
  FORFEIT: "forfeit",
  CLEAR_CHALLENGE_SUCCESS: "CLEAR_CHALLENGE_SUCCESS",
  CREATE: {
    FETCH: "CREATE_CHALLENGE_FETCH",
    SUCCESS: "CREATE_CHALLENGE_SUCCESS",
    ERROR: "CREATE_CHALLENGE_ERROR",
  },
  SUBMIT_CHALLENGE_WINNER: {
    FETCH: "SUBMIT_CHALLENGE_WINNER_FETCH",
    SUCCESS: "SUBMIT_CHALLENGE_WINNER_SUCCESS",
    ERROR: "SUBMIT_CHALLENGE_WINNER_ERROR",
  },
  GET_CHALLENGES: {
    FETCH: "GET_CHALLENGES_FETCH",
    SUCCESS: "GET_CHALLENGES_SUCCESS",
    SUCCESS_WITH_DETAILS: "GET_CHALLENGES_SUCCESS_WITH_DETAILS",
    ERROR: "GET_CHALLENGES_ERROR",
  },
  VOTE_CHALLENGE: {
    FETCH: "VOTE_CHALLENGE_FETCH",
    SUCCESS: "VOTE_CHALLENGE_SUCCESS",
    ERROR: "VOTE_CHALLENGE_ERROR",
  },
  UPLOAD_MEDIA: {
    FETCH: "UPLOAD_MEDIA_FETCH",
    SUCCESS: "UPLOAD_MEDIA_SUCCESS",
    ERROR: "UPLOAD_MEDIA_ERROR",
  },
  GET_CHALLENGE: {
    FETCH: "GET_CHALLENGE_FETCH",
    SUCCESS: "GET_CHALLENGE_SUCCESS",
    ERROR: "GET_CHALLENGE_ERROR",
  },
  INVITE_OBSERVER: "INVITE_OBSERVER",
  UNINVITE_OBSERVER: "UNINVITE_OBSERVER",
  INVITE_CHALLENGER: "INVITE_CHALLENGER",
  UNINVITE_CHALLENGER: "UNINVITE_CHALLENGER",
  INVITE_USERS: {
    FETCH: "INVITE_USERS_FETCH",
    SUCCESS: "INVITE_USERS_SUCCESS",
    ERROR: "INVITE_USERS_ERROR",
  },
  ENGAGE: {
    FETCH: "ENGAGE_CHALLENGE_FETCH",
    SUCCESS: "ENGAGE_CHALLENGE_SUCCESS",
    ERROR: "ENGAGE_CHALLENGE_ERROR",
  },
  GET_MEDIA_FILES: {
    FETCH: "GET_MEDIA_FILES_FETCH",
    SUCCESS: "GET_MEDIA_FILES_SUCCESS",
    ERROR: "GET_MEDIA_FILES_ERROR",
  },
};

export default CHALLENGE;
