import { useNavigate } from 'react-router-dom';
import {login} from '../../services/UserService.js'
import React, {useState} from 'react'

const Login = (props) => {
    // TODO: Add login functionality -> Call to backend to check if user exists + credentials are valid
    // Also, maybe a Title saying login?
    const [state, setState] = useState({
        username: "",
        password: "",
    });
    const [invalid, setInvalid] = useState(false);
    const redirect = useNavigate();

    const handleInput = (e) => { // From react docs
        const {name, value} = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO, Check password and passwordConfirm match
        // Whatever the redirect is after the Register page, I assume the main search page!
        let result = await login(state.username, state.password)
        if(result.message === "Request failed with status code 404") // Again, we probably don't want to only check 404. 
        {
            setInvalid(true);
        } else {
            // Obviously, we store the token in local storage once someone finishes the backend for login
            console.log(result)
            localStorage.setItem("username", result.data)
            redirect("/")
            window.location.reload();
            // ^^^ I'm probably just stupid but how this reloads the nav correctly!
        }
        // Error handling in the event of a failed login.
        // Probably just a div above the login saying 'Invalid username or password'
    }

    return (
        <>
        {invalid &&
            <div className="invalid">
                <p>Invalid username or password!</p>
            </div>
        }
            <div className="login">
                <form className="" onSubmit={e => handleSubmit(e)}>
                    <h1>Login</h1>
                    <label>
                        Username
                    </label>
                        <input className="" onChange={handleInput} name="username" id="username" type="text" />
                    <label>
                        Password
                    </label>
                        <input onChange={handleInput} name="password" id="password" type="password" placeholder=""></input>
                    <button className="button-class" type="submit">Sign in</button>
                </form>
                {/* Should probably add a "don't have account register" Link here */}
            </div>
        </>
    );
}

export default Login;