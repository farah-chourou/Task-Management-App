import axios from "axios";

const API_URL = "http://localhost:3001/user/";

const register = ({name, email, password}) => {
  console.log(name)
  return axios.post(API_URL + "register", {name:name,email:email,password:password});
};

const login =    ({email, password}) => {
  return  axios.post(API_URL + "login", { email: email, password: password})

}
    

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;