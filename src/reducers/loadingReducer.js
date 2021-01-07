import { LOADING } from "../actions/types";

const initialState = {
    isLoading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING:
        state.isLoading = action.payload;
        return {
          ...state,
        };
      default:
        return state;
    }
  }