import AuthFormSignIn from "./AuthFormSignIn";
import {useSelector} from "react-redux";

const AuthModal = () => {
    const user = useSelector(state => state.userReducer)
    
    if(user.id) return null

    return (
        <div className="auth-modal">
            <AuthFormSignIn />
        </div>
     );
}
 
export default AuthModal;