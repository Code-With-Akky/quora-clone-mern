import axios from "axios";
import Swal from "sweetalert2";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_FAIL,
  USER_VALIDATE_REQUEST,
  USER_VALIDATE_SUCCESS,
  USER_VALIDATE_FAIL,
} from "../Constant/User";
import { errorModal, successModal } from "../Utils/AlertModal";

export const loginGoogle = () => {
  
}

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post("/api/login", { email, password }, config)
      .then((res) => {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: res.data,
        });
        Swal.fire({
          icon: 'success',
          title: 'Logged in successfully...',
          showConfirmButton: false,
          timer: 3000
        }).then(() => {
          window.location.href = '/'
        })
      })
      .catch((error) => {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload:
            error.response && error.response.data ? error.response.data : error,
        });
        errorModal('User not found...')
      });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data ? error.response.data : error,
    });
    errorModal('Wrong credentials...')
  }
};

export const register = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post("/api/register", { email, password }, config)
      .then((res) => {
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: res.data,
        });
        console.log(res.data);
        successModal('You have been registered successfully')
        // alert("You have been registered successfully");
      });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? {
              message: error.response.data.message,
              emailExists: error.response.data.emailExists,
            }
          : { message: error.message, emailExists: error.emailExists },
    });
    errorModal('Email already exits...')
  }
};

export const logout =
  (displayAlert = true) =>
  (dispatch) => {
    localStorage.removeItem("userInfo");
    if (displayAlert) {
       Swal.fire({
        title: 'Are you sure to logout?',
        text: "Thanks for your time",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#244B35',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Logout!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            dispatch({ type: USER_LOGOUT });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          
        }
      })
    };
    
  };

export const validateToken = (token) => async (dispatch) => {
  try {
    dispatch({
      type: USER_VALIDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    await axios
      .post("/api/validateToken", {}, config)
      .then((res) => {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        dispatch({
          type: USER_VALIDATE_SUCCESS,
          payload: res.data,
        });
        // dispatch({
        //   type: USER_LOGIN_SUCCESS,
        //   payload: res.data,
        // });
      })
      .catch((error) => {
        dispatch({
          type: USER_VALIDATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: USER_VALIDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const GetUser = () => async (dispatch) => {
  dispatch({
    type: USER_GET_REQUEST,
  });

  const userInfo = localStorage.getItem("userInfo");
  const token = userInfo ? JSON.parse(userInfo).token : "";

  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  };

  await axios
    .get("/api/user", config)
    .then(({ data }) => {
      dispatch({
        type: USER_GET_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: USER_GET_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};
