import CNST from "../../../constants";

export function uploadMediaAction(data) {
  return {
    type: CNST.CHALLENGE.UPLOAD_MEDIA.FETCH,
    payload: data,
  };
}
