const express = require('express')
const router = express.Router();

router.route('/')
.get((req,res)=>{
    res.send("로그인 페이지입니다")
})
.post((req,res)=>{

})

module.exports = router