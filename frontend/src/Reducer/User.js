import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_ERROR_RESET,
  USER_VALIDATE_REQUEST,
  USER_VALIDATE_SUCCESS,
  USER_VALIDATE_FAIL,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_FAIL,
} from "../Constant/User";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload, isRegistered: true };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_ERROR_RESET:
      return {};
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const ValidateToken = (state = {}, action) => {
  switch (action.type) {
    case USER_VALIDATE_REQUEST:
      return { loading: true };
    case USER_VALIDATE_SUCCESS:
      return { loading: false, isValid: true };
    case USER_VALIDATE_FAIL:
      return { loading: false, isValid: false, error: action.payload };
    default:
      return state;
  }
};

export const userGetReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_GET_REQUEST:
      return { loading: true };
    case USER_GET_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
