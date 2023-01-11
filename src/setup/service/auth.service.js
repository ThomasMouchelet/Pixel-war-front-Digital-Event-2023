import axios from "axios";
import api from "./api.service";
import TokenService from "./token.service";
import UserService from "./user.service";

const signup = (credentials) => {
    return api.post("/auth/signup", credentials)
        .then((res) => {
            const data = res.data
            if (data.access_token) {
                TokenService.setUser(data);
            }
            return data;
        })
};

const oauthGoogle =  (credentials) => {
    return api.post('/google-authentication', credentials)
        .then(async res => {
            const data = res.data

            if (data.access_token) {
                TokenService.setUser(data);
                const user = UserService.getCurrentUser()

                return user;
            }
        })
}

const signin = (credentials) => {
    return api.post("/auth/signin", credentials)
        .then((res) => {
            const data = res.data
            
            if (data.access_token) {
                TokenService.setUser(data);
            }
            
            return data;
        })
};

const regenerateToken = () => {
    return api.get("/auth/regenerate-token")
        .then((res) => {
            const data = res.data
            
            if (data.access_token) {
                TokenService.setUser(data);
            }
            
            return data;
        })
};

const logout = () => {
    TokenService.removeUser();
};

const forgotPassword = (credentials) => {
    return api.post("/auth/forgot-password", credentials)
        .then((res) => res.data)
}

const resetPassword = (credentials) => {
    return api.post("/auth/reset-password", credentials)
        .then((res) => res.data)
}

const AuthService = {
    resetPassword,
    forgotPassword,
    signup,
    signin,
    logout, 
    oauthGoogle,
    regenerateToken,
};
  
export default AuthService;