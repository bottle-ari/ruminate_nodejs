require("dotenv").config();

const KAKAO_URL = 'https://'+process.env.IP_ADDRESS+':'+process.env.PORT+'/auth/kakao/callback'
const NAVER_URL = 'https://'+process.env.IP_ADDRESS+':'+process.env.PORT+'/auth/naver_login/callback'
const GOOGLE_LOGIN_URL = 'https://'+process.env.IP_ADDRESS+':'+process.env.PORT+'/google_login/'
const GOOGLE_REDIRECT_URI = 'https://'+process.env.IP_ADDRESS+':'+process.env.PORT+'/google_login/redirect'; 
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'; 
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo'; 

// GOOGLE_CLIENT_ID랑 GOOGLE_CLIENT_SECRET는 .env 파일에 있음


module.exports = {
    KAKAO_URL,
    NAVER_URL,
    GOOGLE_LOGIN_URL,
    GOOGLE_REDIRECT_URI,
    GOOGLE_TOKEN_URL,
    GOOGLE_USERINFO_URL
  };