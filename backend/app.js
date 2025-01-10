const express = require('express');
const router = express.Router();
const userRouter = require('./src/user/userController');
const cors = require('cors');

app = express();
app.use(router); 
app.use(cors());
app.use(express.json())
app.use("/api/user", userRouter)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// This shouldn't be hardcoded in the end product! 3000 already taken by React
const server = app.listen(3001, () => {
    console.log('Listening on port 3001');
});

module.exports = server; // Require for testing!