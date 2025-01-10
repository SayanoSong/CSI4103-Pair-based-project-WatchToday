import axios from 'axios'

const backend = "http://localhost:3001/api/user";

const register = async (username, password) => {
    let res;
    try{
    await axios.post(backend, {name: username, password: password}).then(response => {
        res = response;
    }) } catch (e) {
        res = e;
    }
    return res;
    }

const login = async (username, password) => {
    // Placeholder while waiting for the backend login endpoint to get implemented
    // Realistically, this should probably be in its own AuthService.js file
    let res;
    try{ 
    await axios.post(backend + "/login", {name: username, password: password}).then(response => {
        res = response;
    }) } catch (e) {
        res = e;
    }
    return res;
}

const changePassword = async (username, oldPwd, newPwd) => {
    let res;
    try{
        console.log(username)
        console.log(oldPwd)
        console.log(newPwd)
        await axios.patch(backend + "/change", {name: username, oldPwd: oldPwd, newPwd: newPwd})
        .then(response => {
            res = response;
        })
    }catch (e){
        res = e;
    }
    return res;
}
export {login, register, changePassword}