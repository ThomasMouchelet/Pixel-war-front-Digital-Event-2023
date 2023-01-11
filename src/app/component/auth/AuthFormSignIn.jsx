import { useState } from "react"
import AuthService from "../../../setup/service/auth.service"
import { store } from "../../../setup/redux/store";
import UserService from "../../../setup/service/user.service";

const AuthFormSignIn = () => {
    const [credentials, setCredentials] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setCredentials({ ...credentials, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await AuthService.signin(credentials)
            const user = await UserService.getCurrentUser();
            store.dispatch({ type: 'user/update', payload: user })
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="username" name="username" id="username" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={handleChange} />
            </div>
            <input type="submit" value="Sign In" />
        </form>
     );
}
 
export default AuthFormSignIn;