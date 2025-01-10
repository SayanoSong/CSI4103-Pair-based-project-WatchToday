const express = require('express');
const { createNewUser, deleteUser, addMovieToUser, removeMovieFromUser, getUser, getUsers, changeUserPwd, getUserWithPwd, login} = require('./userService');
const router = express.Router();


// User model
// Name
// Password
// Film List
// Email?

router.get('/', async (req, res) => {
    let result = await getUsers()
    if(!result){
        res.status(404).send("No users found")
        return
    }
    res.status(200).send(result)
    // Probably want some sort of DTO to not share the passwords!
});

router.get('/:username', async (req, res) => {
    // This works, but username is case sensitive!
    // Maybe have the frontend make it all lower/upper and validate it here?
    let result = await getUser(req.params.username)
    if(!result){
        res.status(404).send("User not found")
        return
    }
    res.status(200).send(result)
});

router.post('/', async (req, res) => {
    let result = await createNewUser(req.body) //Obviously, we need to check on front end + backend that body is correct!
    if(!result){ // We should actually be doing more handling here, checking if the user already exists, etc.
        res.status(422).send("Unable to create user") //Not sure 422 is appropriate here, but it's the closest I could find
        return
    }
    res.status(201).send(req.body) // Echo back the data sent to us
});

router.delete('/', async (req, res) => {
    let result = await deleteUser(req.body.name) // Again, we need to check on front end + backend that body is correct!
    if(!result){
        res.status(404).send("User not found")
        return
    }
    res.status(200).send("User deleted")
});

router.patch("/change", async (req, res) => {
    let result = await getUserWithPwd(req.body.name);
    if(!result){
        res.status(404).send("User not found");
        return;
    }else if(result.password !== req.body.oldPwd){
        res.status(418).send("Password not match");
        return;
    }
    result = await changeUserPwd(req.body.name, req.body.newPwd);
    if (!result) {
        res.status(403).send("Cannot change the password");
        return;
    }
    res.status(200).send(result);
})

router.patch("/add", async (req, res) => {
    let result = await addMovieToUser(req.body.name, req.body.movieId) // Again, we need to check on front end + backend that body is correct!
    if(!result){
        res.status(400).send("Cannot add movie to user")
        return
    }
    res.status(200).send(result) // This sends back only the movie list, Maybe we should send the whole user?
});

router.patch("/remove", async (req, res) => {
    let result = await removeMovieFromUser(req.body.name, req.body.movieId) // Again, we need to check on front end + backend that body is correct!
    res.send(result)
});

router.post("/login", async (req, res) => {
    // This belongs in its own AuthController!
    console.log(req.body);
    let result = await login(req.body.name, req.body.password);
    if(!result){
        res.status(404).send("User not found");
        return;
    }
    res.status(200).send(result);
})


module.exports = router;