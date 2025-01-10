import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/UserService';

const Register = () => {
    // Todo: Add register functionality -> Hit /api/user endpoint with a post
    const [state, setState] = useState({
        username: "",
        password: "",
        passwordConfirm: ""
    });

    const [invalid, setInvalid] = useState(false);

    const redirect = useNavigate();

    const handleInput = (e) => {
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

        let res = await register(state.username, state.password)
        console.log(res.message)
        if(res.message === "Request failed with status code 422") // This shit is bad, what if we get another error code?
        {
            setInvalid(true);
        } else {
            redirect("/login") // This seems logical unless we change the backend to immediately log the user in after registering?
        }
        // Error handling in the event of a failed register.
        // This would probably be caused by a duplicate username
    }


    return (
        <>
        {invalid && 
            <div className="invalid">
                <p>Error registering user, username already taken!</p>
            </div>
        }
        {
            state.password !== state.passwordConfirm &&
            <div className="invalid">
                <p>Warning! Passwords do not match!</p>
            </div>
        }
        <div className="register">
            <form onSubmit={e => handleSubmit(e)}>
            <h1>Register</h1>
                <label>Username</label>
                <input onChange={handleInput} name="username" type="text"placeholder="Enter username" />
                <label>Password</label>
                <input onChange={handleInput} name="password" type="password" placeholder="Enter password" />
                <label>Confirm Password</label>
                <input onChange={handleInput} name="passwordConfirm" type="password" placeholder="Confirm password" />
                <button type="submit">Register</button>
            </form>
        </div>
    </>
    )
}

export default Register