import { decodeToken, isExpired } from "react-jwt";

const _userInfo = localStorage.getItem("userInfo");
const token = _userInfo ? JSON.parse(_userInfo).token : "";

let myDecodedToken;
myDecodedToken = isExpired(token) ? false : decodeToken(token);
console.log(myDecodedToken);

export { token };
export default myDecodedToken;
