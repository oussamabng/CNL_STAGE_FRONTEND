import { LOADING } from './types';

export const setLoading = data => dispatch => {
  dispatch({
      type: LOADING,
      payload: data
  })
};