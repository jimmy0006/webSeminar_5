const express = require("express")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongodb = require('./DBconnector/mongooseConnector')
const User = require('./DBconnector/userSchema')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const app = express();
const login = require('./router/login')
const join = require('./router/join')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cookieParser())
mongodb.connect();

app.get('/',async(req,res)=>{
    if(req.cookies['auth']!==undefined){
        let user = await User.findOne({
            id:jwt.verify(req.cookies.auth,process.env.SECRET_KEY).id
        })
        res.send(`안녕하세요 ${user.name}님.`)
    }else{
        res.send("hello world!")
    }
})

app.use('/login',login)
app.use('/join',join)

app.listen(3000,()=>{
    console.log("Listening on port : 3000")
})