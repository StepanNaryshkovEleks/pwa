import CNST from '../../../constants';

export function signInAction(data) {
  return {
    type: CNST.USER.SIGN_IN.FETCH,
    payload: data,
  };
}
