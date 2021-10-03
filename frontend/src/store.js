import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  userGetReducer,
  userLoginReducer,
  userRegisterReducer,
  ValidateToken,
} from "./Reducer/User";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userValidateToken: ValidateToken,
  userInfoBasic: userGetReducer,
});

let userInfofromStorage;

try {
  userInfofromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
} catch (err) {
  userInfofromStorage = null;
}

console.log(userInfofromStorage);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  userLogin: { userInfo: userInfofromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
