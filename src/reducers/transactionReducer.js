import {
  ALL_TRANSACTION_FAIL,
  ALL_TRANSACTION_REQUEST,
  ALL_TRANSACTION_SUCCESS,
  CLEAR_ERRORS,
} from "constants/transactionConstants";

export const transactionReducer = (
  state = { transactions: [], total: 0 },
  action
) => {
  switch (action.type) {
    case ALL_TRANSACTION_REQUEST:
      return {
        loading: true,
        transactions: [],
        total: 0,
      };
    case ALL_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        transactions: action.payload.transactions,
        total: action.payload.total,
      };
    case ALL_TRANSACTION_FAIL:
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
