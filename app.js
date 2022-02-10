const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const router = require('./route/api')


//middleware to convert every data from body, to json
app.use(bodyParser.json())

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

mongoose.connect(process.env.CONNECT_DB, connectionParams)
    .then(() => {
        console.log('connected to DB!');
    }).catch(err => {
        console.log(err);
    })

//to be able to get requests from react
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authoriztion");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

//a middleware to check if the user is sined to our app
app.use('/', (req, res, next) => {
    //don't check for 'add' func
    if (req.path.includes('addAdmin') || req.path.includes('addUser') || req.path.includes('loginUserOrAdmin'))
        next()
    else {
        try {
            jwt.verify(req.headers['authorization'], process.env.SECRET); //check the token
            next()
        }
        catch (err) {
            res.send('not signed to our app.')
        }
    }
})

//middleware to go to the router
app.use('/', router)

app.listen(3000, () => {
    console.log('listenning port 3000!');
})