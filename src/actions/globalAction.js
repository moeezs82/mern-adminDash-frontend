import axios from "axios";
import { LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_USER_FAIL, LOGOUT_USER_SUCCESS } from "constants/globalConstants";
import { BASE_URL } from "./BaseUrl";

axios.defaults.withCredentials = true

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      BASE_URL + `general/user/login`,
      { email, password },
      { withCredentials: true },
      config
    );

    dispatch({type: LOGIN_SUCCESS, payload: data.user})

  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error?.response?.data?.message });
  }
};


//load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(BASE_URL + `general/user/me`);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error?.response?.data?.message });
  }
};

//logout user
export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get(BASE_URL + `general/user/logout`);

    dispatch({ type: LOGOUT_USER_SUCCESS});
  } catch (error) {
    dispatch({type: LOGOUT_USER_FAIL, payload: error?.response?.data?.message})
  }
}
