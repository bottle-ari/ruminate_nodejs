// const express = require('express');
// const axios = require('axios');

// const app = express();

// const IP_ADDRESS = process.env.IP_ADDRESS

// const GOOGLE_CLIENT_ID = '45608429421-h23ldoj9ugaeme5d85scbth08c6c1pe6.apps.googleusercontent.com' // YOUR GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = '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' // YOUR GOOGLE_CLIENT_SECRET;


// const GOOGLE_REDIRECT_URI = 'http://'+IP_ADDRESS+':8080/google_login/redirect';
// // const GOOGLE_SIGNUP_REDIRECT_URI = 'http://'+IP_ADDRESS+':8080/google_signup/redirect';


// const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
// const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';


// // 루트 페이지
// // 로그인 버튼을 누르면 GET /login으로 이동
// app.get('/', (req, res) => {
//     res.send(`
//         <h1>Log in</h1>
//         <a href="/google_login">Log in</a>
//     `);
// });

// // 로그인 버튼을 누르면 도착하는 목적지 라우터
// // 모든 로직을 처리한 뒤 구글 인증 서버인 https://accounts.google.com/o/oauth2/v2/auth
// // 으로 redirect 되는데, 이 url에 첨부할 몇가지 QueryString들이 필요
// // app.get('/google_login', (req, res) => {
// //     let url = 'https://accounts.google.com/o/oauth2/v2/auth';
// // 	// client_id는 위 스크린샷을 보면 발급 받았음을 알 수 있음
// // 	// 단, 스크린샷에 있는 ID가 아닌 당신이 직접 발급 받은 ID를 사용해야 함.
// //     url += `?client_id=${GOOGLE_CLIENT_ID}`
// // 	// 아까 등록한 redirect_uri
// //     // 로그인 창에서 계정을 선택하면 구글 서버가 이 redirect_uri로 redirect 시켜줌
// //     url += `&redirect_uri=${GOOGLE_REDIRECT_URI}`
// //     // 필수 옵션.
// //     url += '&response_type=code'
// //   	// 구글에 등록된 유저 정보 email, profile을 가져오겠다 명시
// //     url += '&scope=email profile'    
// //   	// 완성된 url로 이동
// //   	// 이 url이 위에서 본 구글 계정을 선택하는 화면임.
// // 	res.redirect(url);
// // });

// // app.get('/google_login/redirect', (req, res) => {
// //     const { code } = req.query;
// //     console.log(`code: ${code}`);
// //     res.send('ok');
// // });

// // 회원가입 라우터
// app.get('/google_login', (req, res) => {
//     let url = 'https://accounts.google.com/o/oauth2/v2/auth';
//     url += `?client_id=${GOOGLE_CLIENT_ID}`
//     url += `&redirect_uri=${GOOGLE_REDIRECT_URI}`
//     url += '&response_type=code'
//     url += '&scope=email profile'
//     res.redirect(url);
// });

// app.get('/google_login/redirect', async (req, res) => {
//     const { code } = req.query;
//     console.log(`code: ${code}`);

//   	// access_token, refresh_token 등의 구글 토큰 정보 가져오기
//     const resp = await axios.post(GOOGLE_TOKEN_URL, {
//         // x-www-form-urlencoded(body)
//       	code,
//         client_id: GOOGLE_CLIENT_ID,
//         client_secret: GOOGLE_CLIENT_SECRET,
//         redirect_uri: GOOGLE_REDIRECT_URI,
//         grant_type: 'authorization_code',
//     });

//   	// email, google id 등의 사용자 구글 계정 정보 가져오기
//     const resp2 = await axios.get(GOOGLE_USERINFO_URL, {
//       	// Request Header에 Authorization 추가
//         headers: {
//             Authorization: `Bearer ${resp.data.access_token}`,
//         },
//     });
  
//   	// 구글 인증 서버에서 json 형태로 반환 받은 body 클라이언트에 반환
//     res.json(resp2.data);
// });

// app.listen(8080, () => {
//     console.log('server is running at 8080');
// });