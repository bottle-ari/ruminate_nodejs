// const express = require('express');
// const router = express.Router();
// const passport = require('passport');

// //* 네이버로 로그인하기 라우터 ***********************
// router.get('/naver_login', passport.authenticate('naver', { authType: 'reprompt' }));

// //? 위에서 네이버 서버 로그인이 되면, 네이버 redirect url 설정에 따라 이쪽 라우터로 오게 된다.
// router.get(
//    '/naver_login/callback',
//    //? 그리고 passport 로그인 전략에 의해 naverStrategy로 가서 카카오계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
//    passport.authenticate('naver', { failureRedirect: '/' }),
//    (req, res) => {
//       res.redirect('/');
//    },
// );


const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/naver_login',passport.authenticate('naver', { authType: 'reprompt' }))
router.get(
    '/naver_login/callback',
    //? 그리고 passport 로그인 전략에 의해 naverStrategy로 가서 카카오계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
    passport.authenticate('naver', { failureRedirect: '/' }),
    (req, res) => {
       res.redirect('/');
    },
 );

module.exports = router;


// module.exports = app =>{
//     // const express = require('express');
//     // const router = express.Router();
//     // const passport = require('passport');
    
//     //* 네이버로 로그인하기 라우터 ***********************
//     // 블로그 원본 : app이 아니라 router
//     app.get('/naver_login', passport.authenticate('naver', { authType: 'reprompt' }));
    
//     //? 위에서 네이버 서버 로그인이 되면, 네이버 redirect url 설정에 따라 이쪽 라우터로 오게 된다.
//     app.get(
//        '/naver_login/callback',
//        //? 그리고 passport 로그인 전략에 의해 naverStrategy로 가서 카카오계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
//        passport.authenticate('naver', { failureRedirect: '/' }),
//        (req, res) => {
//           res.redirect('/');
//        },
//     );
// };

// router.get('/kakao', passport.authenticate('kakao'));
// router.get('/kakao/callback', userController.kakaoCallback);

// router.get(
//     '/kakao/callback',
//     //? 그리고 passport 로그인 전략에 의해 kakaoStrategy로 가서 카카오계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
//     passport.authenticate('kakao', {
//        failureRedirect: '/fail_page', // kakaoStrategy에서 실패한다면 실행
//     }),
//     // kakaoStrategy에서 성공한다면 콜백 실행
//     (req, res) => {
//       console.log("res in router.get : ",res);
//        res.redirect('/success_page_change_after'); // 일단 성공했으면 여기로 이동 (링크는 나중에 수정)
//     },
//  );
