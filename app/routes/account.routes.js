

const express = require('express');
var cookies = require("cookie-parser");
const router = express.Router();
router.use(cookies())
const passport = require('passport');
const token_manager = require('../utils/token_manager');
const { Account } = require('../models/account.model');
const query_utils = require('../utils/query_utils');


// GET
router.get('/account',async(req,res)=> {
    var token;
    try {
        token = await token_manager.get_token_in_req(req).then(tk=>{return tk});
    } catch(e) {
        res.send("Cannot Find Token or Expired Token")
        return;
    }

    const {where,values} = query_utils.convertQueryStringToWhere(req.query)
    const sql_str = `select * from Account ${where}`
    const data = await Account.query(sql_str,values).then(rt=>{return rt}).catch(e=>{console.log(e)});
    res.send(data)
})

// DELETE
router.delete('/account',async(req,res)=> {
    var token;
    try {
        token = await token_manager.get_token_in_req(req).then(tk=>{return tk});
    } catch(e) {
        res.send("Cannot Find Token or Expired Token")
        return;
    }

    const {where,values} = query_utils.convertQueryStringToWhere(req.query)
    if (where.replace(" ","") === "" || values.length == 0) {
        res.send("cannot remove all data");
        return;
    }

    const sql_str = `delete from Account ${where}`
    const data = await Account.query(sql_str,values).then(rt=>{return rt}).catch(e=>{console.log(e)});
    res.send(data)
})


// PUT
router.put("/account",async(req,res)=>{
    var token;
    try {
        token = await token_manager.get_token_in_req(req).then(tk=>{return tk});
    } catch(e) {
        res.send("Cannot Find Token or Expired Token")
        return;
    }
    const {update_sql,values}= query_utils.convertPutReqToUpdateSql('Account',req);
    const data = await Account.query(update_sql,values).then(rt=>{return rt}).catch(e=>{console.log(e)});
    res.send(data)
})


// 디버깅용 임시 토큰을 발급
// req의 id 키에 DB에 존재하는 id
router.get('/jwt_token',(req,res) => {
    console.log("디버깅을 위한 토큰 강제 발급")
    var new_token = token_manager.make_token(req.id,"test_token_email@naver.com");
    console.log("토큰 return 값 :"+new_token)
    res.cookie("JWT_TOKEN_TODO",new_token);
    res.json(new_token)
})


// jwt in header
/**
 * Three way to verify token
 * 1. cookies
 * 2. authorization header
 * 3. body
 */
router.get('/verify_token', async(req, res) => {
    // if req contains cookies -> verify
    var token;
    try {
        token = await token_manager.get_token_in_req(req).then(tk=>{return tk});
    } catch(e) {
        res.status(400).send("Cannot Find Token or Expired Token")
        return;
    }


    const answer = await token_manager.verify_token(token)
    if (!answer) {
        console.log("토큰 검증 실패")
        res.send({"verify":false})
    } else {
        console.log("토큰 검증 성공")
        res.send({"verify":true});
    }
});




// jwt jwt를 body에 담는 방식
// router.get('/verify_token', async(req, res) => {
//         // console.log("GET account 요청을 받았습니다");
//         // console.log("토큰 검증을 시작합니다..")
//         const token_str = req.body.token
//         const answer = await token_manager.verify_token(token_str)
//         if (!answer) {
//             console.log("토큰 검증 실패")
//             res.send({"verify":false})
//         } else {
//             console.log("토큰 검증 성공")
//             res.send({"verify":true});
//             // const allData = await Account.findAll().then(rt=>{return rt}).catch(e=>{
//                 // console.log("account sql중 오류")
//                 // console.error(e)
//             // })
//             // res.send(allData)
//         }
//     });


module.exports = router;

