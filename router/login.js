const express = require('express')
const router = express.Router();
const crypto = require('crypto')
const User = require('../DBconnector/userSchema')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.route('/')
.get((req,res)=>{
    res.send("로그인 페이지입니다")
})
.post(async(req,res)=>{
    let user = await User.findOne({
        id:req.body.id
    })
    const hashPassword = crypto
    .createHash('sha512')
    .update(req.body.password + user.salt)
    .digest('hex');
    if(user.password == hashPassword){
        res.cookie('auth',jwt.sign({id:user.id},process.env.SECRET_KEY),{
            maxAge:10000
        })
        res.send("로그인 완료")
    }else{
        res.send("비밀번호가 틀립니다")
    }
})

module.exports = router