import axios from "axios";
import { ALL_TRANSACTION_FAIL, ALL_TRANSACTION_REQUEST, ALL_TRANSACTION_SUCCESS } from "constants/transactionConstants";

import { BASE_URL } from "./BaseUrl";

axios.defaults.withCredentials = true;

export const getTransactions = ({page, pageSize, sort, search}) => async (dispatch) => {
  try {
    dispatch({ type: ALL_TRANSACTION_REQUEST });

    const { data } = await axios.get(BASE_URL + `client/transactions?page=${page}&pageSize=${pageSize}&sort=${sort}&search=${search}`);

    dispatch({ type: ALL_TRANSACTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_TRANSACTION_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};
