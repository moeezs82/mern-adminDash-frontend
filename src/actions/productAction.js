import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
} from "constants/productConstants";
import { BASE_URL } from "./BaseUrl";

axios.defaults.withCredentials = true;

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });

    const { data } = await axios.get(BASE_URL + `client/products`);

    dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};
