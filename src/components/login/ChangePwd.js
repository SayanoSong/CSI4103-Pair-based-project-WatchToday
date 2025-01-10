import { useNavigate } from 'react-router-dom';
import React, {useState} from 'react'
import {changePassword} from '../../services/UserService.js'

const ChangePwd = (props) => {
    const [state, setState] = useState({
        oldPwd: "",
        newPwd1: "",
        newPwd2: ""
    });
    const redirect = useNavigate();
    const handleInput = (e) => {
        console.log("HERE")
        const {name, value} = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const [invalidFormat, setInvalidFormat] = useState(false);
    const [failedChange, setFailedChange] = useState(false);
    const [invalidOldPwd, setInvalidOldPwd] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (state.newPwd1 !== state.newPwd2){
            setInvalidFormat(true);
            setInvalidOldPwd(false);
            setFailedChange(false);
            return;
        }
        let result = await changePassword(localStorage.getItem("username"), state.oldPwd, state.newPwd1)
        console.log(result.message);
        if(result.message === "Request failed with status code 404") // Again, we probably don't want to only check 404. 
        {
            setFailedChange(true);
            setInvalidOldPwd(false);
            setInvalidFormat(false);
        } else if (result.message === "Request failed with status code 418"){
            setInvalidOldPwd(true);
            setFailedChange(false);
            setInvalidFormat(false);
        }
        else {
            // Obviously, we store the token in local storage once someone finishes the backend for login
            alert("Password changed successfully!")
            redirect("/")
        }
        // Error handling in the event of a failed login.
        // Probably just a div above the login saying 'Invalid username or password'
    }

    return (
        <div className='changePwd'>
            <form onSubmit={e => handleSubmit(e)}>
                <h1>Change Password</h1>
                <label>
                    Please enter your current password
                </label>
                <input onChange={handleInput} name="oldPwd" id="oldPwd" type="password" placeholder="Old password"></input>
                <label>
                    Please enter your new password
                </label>
                <input onChange={handleInput} name="newPwd1" id="newPwd1" type="password" placeholder="New password"></input>
                <label>
                    Please confirm your new password
                </label>
                <input onChange={handleInput} name="newPwd2" id="newPwd2" type="password" placeholder="New password"></input>
                <button type='submit'>Confirm</button>
                {invalidFormat &&
                    <div className="message">
                        <p>The new Passwords are not matched</p>
                    </div>
                }
                {failedChange &&
                    <div className="message">
                        <p>Invalid username or old password!</p>
                    </div>
                }
                {invalidOldPwd &&
                    <div className="message">
                        <p>The old password is incorrect</p>
                    </div>
                }
            </form>
        </div>
    );
}

export default ChangePwd;