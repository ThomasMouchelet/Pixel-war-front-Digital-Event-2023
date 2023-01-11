import api from "./api.service";
import jwtDecode from "jwt-decode";

const getCurrentUser =  () => {
    const data = JSON.parse(window.localStorage.getItem("user")) 
    
    if (data && data.access_token) { 
      const  tokenDecode = jwtDecode(data.access_token);
      
      if(tokenDecode){
        delete tokenDecode.iat
        delete tokenDecode.exp
        
        return tokenDecode
      }
      return false;
    }
    return false;
} 

const account = () => {
  return api.get(`/users/account`)
      .then((res) => {
          const data = res.data
          return data;
      })
}

const update = (credentials) => {
  return api.patch(`/users/account`, credentials)
      .then((res) => res.data)
};

const getAll = () => {
  return api.get(`/users`)
      .then((res) => res.data)
};


const UserService = {
  getCurrentUser,
  update,
  account,
  getAll
};

export default UserService;