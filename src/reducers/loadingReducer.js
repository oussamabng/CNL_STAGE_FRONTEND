import { LOADING } from "../actions/types";

const initialState = {
    isLoading: false,
};

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