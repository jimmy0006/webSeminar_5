const mongoose = require('mongoose')
const connector = require('./mongooseConnector')

const {Schema}=mongoose;
const userSchema = new Schema({
    id:{
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    salt:{
        type:String,
        required:true
    }
})

module.exports = connector.mongoose.model('User',userSchema)