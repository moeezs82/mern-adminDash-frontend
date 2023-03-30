import {
  ALL_CUSTOMER_FAIL,
  ALL_CUSTOMER_REQUEST,
  ALL_CUSTOMER_SUCCESS,
  CLEAR_ERRORS,
} from "constants/userConstants";

export const customerReducer = (state = { customers: [] }, action) => {
  switch (action.type) {
    case ALL_CUSTOMER_REQUEST:
      return {
        loading: true,
        customers: [],
      };
    case ALL_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: action.payload,
      };
    case ALL_CUSTOMER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
