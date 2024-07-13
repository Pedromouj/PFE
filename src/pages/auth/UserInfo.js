import { decodeToken } from "react-jwt";
import { token } from "./Token";
const UsersInfo = decodeToken(token);
export default UsersInfo;
