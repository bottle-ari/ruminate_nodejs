

const express = require('express');
const router = express.Router();
const passport = require('passport');
const axios = require('axios');
const token_manager = require('../token_utils/token_manager')
const account_model = require('../models/account.model')

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
    console.log(`code: ${code}`);

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

    //code20230811185716
    e_id = account_model.Account.findBySnsIdAndSnsInfo({snsId:resp2.data.id, snsInfo:"google"},()=>{console.log("findbysns 콜백테스트")})
    console.log("e id 테스트 : "+e_id)
    
    // 구글 인증 서버에서 json 형태로 반환 받은 body 클라이언트에 반환
    //code20230811165142
    new_token = token_manager.make_token(resp2.id,resp2.email); // code20230811171308
    console.log("토큰 return 값 :"+new_token)
    res.cookie("JWT_TOKEN_TODO",new_token);
    res.json(resp2.data);

});

module.exports = router;
