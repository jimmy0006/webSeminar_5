const express = require("express")
const bodyParser = require('body-parser')
const mongodb = require('./DBconnector/mongooseConnector')

const app = express();
const login = require('./router/login')
const join = require('./router/join')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
mongodb.connect();

app.get('/',(req,res)=>{
    res.send("hello world!")
})

app.use('/login',login)
app.use('/join',join)

app.listen(3000,()=>{
    console.log("Listening on port : 3000")
})