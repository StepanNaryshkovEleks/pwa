import CNST from "../../../constants";

export function getMediaFilesAction(data) {
  return {
    type: CNST.CHALLENGE.GET_MEDIA_FILES.FETCH,
    payload: data,
  };
}
