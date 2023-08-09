const passport = require('passport');
// const local = require('./localStrategy'); // 로컬서버로 로그인할때
const naver = require('./naverStrategy'); // 네이버서버로 로그인할때

const NaverUser = require('../app/models/naver_user');

module.exports = () => {
    console.log("네이버 exports")
  passport.serializeUser((user, done) => {
      done(null, user.id);
   });

  passport.deserializeUser((id, done) => {
    NaverUser.findOne({ where: { id } })
         .then(user => done(null, user))
         .catch(err => done(err));
   });

//    local();
   naver(); // 네이버 전략 등록
};