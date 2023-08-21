

const express = require('express');
const router = express.Router();
const passport = require('passport');
const axios = require('axios');
const token_manager = require('../utils/token_manager')
const account_controller = require('../controllers/account.controller')

const {
    GOOGLE_LOGIN_URL,
    GOOGLE_REDIRECT_URI,
    GOOGLE_TOKEN_URL,
    GOOGLE_USERINFO_URL} = require('../../config.js');

// 회원가입 라우터 
router.get('/google_login', (req, res) => {
    let url = 'https://accounts.google.com/o/oauth2/v2/auth'; 
    url += `?client_id=${process.env.GOOGLE_CLIENT_ID}` 
    url += `&redirect_uri=${GOOGLE_REDIRECT_URI}` 
    url += '&response_type=code' 
    url += '&scope=email profile' 
    res.redirect(url); 
    });

router.get('/google_login/redirect', async (req, res) => {
    const { code } = req.query;
    // console.log(`code: ${code}`);

    // access_token, refresh_token 등의 구글 토큰 정보 가져오기
    const resp = await axios.post(GOOGLE_TOKEN_URL, {
    // x-www-form-urlencoded(body)
            code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
    });

    // email, google id 등의 사용자 구글 계정 정보 가져오기
    // 토큰 정보는 resp -> data에 존재함
    const resp2 = await axios.get(GOOGLE_USERINFO_URL, {
        // Request Header에 Authorization 추가
        headers: {
            Authorization: `Bearer ${resp.data.access_token}`,
        },
    });

    var e_id = 0
    await account_controller.getOrMakeDBIdBySnsId({snsId:resp2.data.id, snsInfo:"google",email: resp2.data.email},()=>{console.log("callback...???")})
        .then(rs=>{
            e_id = rs
        }).catch(err=>{
            console.log(err)
            // console.log("ERROR : account_controller.getOrMakeDBIdBySnsId")
            res.send("ERROR : account_controller.getOrMakeDBIdBySnsId")
        })

    // 구글 인증 서버에서 json 형태로 반환 받은 body 클라이언트에 반환
    // e_id 값으로 토큰 발급
    new_token = token_manager.make_token(e_id,resp2.email); // code20230811171308
    console.log("토큰 return 값 :"+new_token)
    res.cookie("JWT_TOKEN_TODO",new_token);
    res.json(resp2.data);
});

module.exports = router;
