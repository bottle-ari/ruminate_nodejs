
require("dotenv").config();
console.log("------------콜백 URI--------------")
console.log("KAKAO_URL:", process.env.KAKAO_URL,"\n");



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


// 포트넘버 설정
app.listen(8080, ()=>{
    console.log("Server is running on port 8080.");
})


// 패스포트 테스트 (카카오 로그인 필요 없으면 아래 부분 삭제)
const passportConfig = require('./passport');
passportConfig(app);
const userRouter = require('./app/routes/user');
app.use('/auth', [userRouter]);
