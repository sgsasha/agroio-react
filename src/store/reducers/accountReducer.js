import { LOGIN, LOGIN_ERROR } from "../actionTypes";

const initialState = {
  accessToken: "",
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      const { accessToken } = action.payload;
      return {
        ...state,
        accessToken: accessToken
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        error: "Something went wrong during login. Please check your email or password."
      }
    }
    default:
      return state;
  }
}

