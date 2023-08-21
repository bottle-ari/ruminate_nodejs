
const {KAKAO_URL,
    NAVER_URL,
    GOOGLE_LOGIN_URL,
    GOOGLE_REDIRECT_URI,
    GOOGLE_TOKEN_URL,
    GOOGLE_USERINFO_URL} = require('./config.js');


// ---------------------------------------------
// fs and https 모듈 가져오기
const https = require("https");
const fs = require("fs");


const options = {
    key: fs.readFileSync("./config/cert.key"),
    cert: fs.readFileSync("./config/cert.crt"),
  };




// ---------------------------------------------

require("dotenv").config();
console.log("------------로그인 링크--------------")
console.log("KAKAO_URL:", KAKAO_URL,"\n");
console.log("NAVER_URL:", NAVER_URL,"\n");
console.log("GOOGLE_LOGIN_URL:", GOOGLE_LOGIN_URL,"\n");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.json({message: "Hello Node!"});
    console.log(`req url test : ${req.url}`)
});

require("./app/routes/school.routes.js")(app);

// 네이버 로그인
// require("./app/routes/naver_auth.js");

https.createServer(options, app).listen(process.env.PORT, () => {
    console.log(`HTTPS server started on port ${process.env.PORT}`);
  });


// 포트넘버 설정
app.listen(8080, ()=>{
    console.log("Server is running on port 8080.");
})




// 패스포트 테스트 (카카오 로그인 필요 없으면 아래 부분 삭제)
const passportConfigKakao = require('./passport/index.js');
passportConfigKakao(app);

// 네이버 패스포트
const passportConfigNaver = require('./passport/naver_index.js');
passportConfigNaver();


// passportConfig(); // 네이버 로그인은 app인자 X
const kakaoRouter = require('./app/routes/kakao_routes');
app.use('/auth', [kakaoRouter]);


// 네이버 router
const naverUserRouter = require('./app/routes/naver_auth');
app.use('/auth',[naverUserRouter])


// 구글 router
const googleUserRouter = require('./app/routes/google_auth');
app.use('/',[googleUserRouter])

// 계정 처리 라우터
const accountRouter = require('./app/routes/account.routes');
app.use('/',[accountRouter])

// ---------------------------------------------------------------------------
// 구글

// 로그인 버튼을 누르면 도착하는 목적지 라우터 
// 모든 로직을 처리한 뒤 구글 인증 서버인 https://accounts.google.com/o/oauth2/v2/auth 
// 으로 redirect 되는데, 이 url에 첨부할 몇가지 QueryString들이 필요 
// app.get('/google_login', (req, res) => { 
// let url = 'https://accounts.google.com/o/oauth2/v2/auth'; 
// // client_id는 위 스크린샷을 보면 발급 받았음을 알 수 있음 
// // 단, 스크린샷에 있는 ID가 아닌 당신이 직접 발급 받은 ID를 사용해야 함. 
// url += `?client_id=${GOOGLE_CLIENT_ID}` 
// // 아까 등록한 redirect_uri 
// // 로그인 창에서 계정을 선택하면 구글 서버가 이 redirect_uri로 redirect 시켜줌 
// url += `&redirect_uri=${GOOGLE_REDIRECT_URI}` 
// // 필수 옵션. 
// url += '&response_type=code' 
// // 구글에 등록된 유저 정보 email, profile을 가져오겠다 명시 
// url += '&scope=email profile' 
// // 완성된 url로 이동 
// // 이 url이 위에서 본 구글 계정을 선택하는 화면임. 
// res.redirect(url); 
// }); 

// app.get('/google_login/redirect', (req, res) => { 
// const { code } = req.query; 
// console.log(`code: ${code}`); 
// res.send('ok'); 
// }); 

