import axios from "axios";
import { ALL_CUSTOMER_FAIL, ALL_CUSTOMER_REQUEST, ALL_CUSTOMER_SUCCESS } from "constants/userConstants";

import { BASE_URL } from "./BaseUrl";

axios.defaults.withCredentials = true;


export const getCustomers = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_CUSTOMER_REQUEST });
  
      const { data } = await axios.get(BASE_URL + `client/customers`);
  
      dispatch({ type: ALL_CUSTOMER_SUCCESS, payload: data.customers });
    } catch (error) {
      dispatch({
        type: ALL_CUSTOMER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };