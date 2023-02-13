const express= require('express')
const crypto = require('crypto')
const User = require('../DBconnector/userSchema')
const router = express.Router();

router.route('/')
.get((req,res)=>{
    res.send("회원가입 페이지입니다.")
})
.post(async(req,res)=>{
    console.log(req.body.id)
    const salt = crypto.randomBytes(128).toString('base64');
    const hashPassword = crypto
    .createHash('sha512')
    .update(req.body.password + salt)
    .digest('hex');
    await User.create({
        id:req.body.id,
        name:req.body.name,
        password:hashPassword,
        salt:salt
    })
    console.log(hashPassword)
    res.send(hashPassword)
})
.put(async (req,res)=>{
    let user = await User.findOne({
        id:req.body.id
    })
    const hashPassword = crypto
    .createHash('sha512')
    .update(req.body.password + user.salt)
    .digest('hex');
    if(user.password == hashPassword){
        const salt = crypto.randomBytes(128).toString('base64');
        const hashPassword = crypto
            .createHash('sha512')
            .update(req.body.newPassword + salt)
            .digest('hex');
        await User.updateOne({
            id:req.body.id
        },{
            password:hashPassword,
            salt:salt,
            name:req.body.name
        })
        res.send("회원 정보 수정 완료!")
    }else{
        res.send("비밀번호가 틀립니다")
    }
})
.delete(async (req,res)=>{
    let user = await User.findOne({
        id:req.body.id
    })
    const hashPassword = crypto
    .createHash('sha512')
    .update(req.body.password + user.salt)
    .digest('hex');
    if(user.password == hashPassword){
        await User.deleteOne({
            id:req.body.id
        })
        res.send("회원 탈퇴 완료!")
    }else{
        res.send("비밀번호가 틀립니다")
    }
})


module.exports = router;