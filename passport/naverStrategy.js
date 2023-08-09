const passport = require('passport');
// const { Strategy: NaverStrategy, Profile: NaverProfile } = require('passport-naver-v2');
const { Strategy: NaverStrategy, Profile: NaverProfile } = require('passport-naver-v2');

const { NaverUser } = require('../app/models/naver_user');

module.exports = () => {
   passport.use(
      new NaverStrategy(
         {
            clientID: process.env.NAVER_ID,
            clientSecret: process.env.NAVER_SECRET,
            callbackURL: '/auth/naver_login/callback',
         },
         async (accessToken, refreshToken, profile, done) => {
            console.log('naver profile : ', profile);
            try {
               const exUser = await NaverUser.findOne({
                  // 네이버 플랫폼에서 로그인 했고 & snsId필드에 네이버 아이디가 일치할경우
                  where: { snsId: profile.id, provider: 'naver' },
               },(a,b)=>{
                console.log("naver의 exUser 콜백함수 호출");
                return b;
            });
               // 이미 가입된 네이버 프로필이면 성공
               if (exUser) {
                  done(null, exUser);
               } else {
                  // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
                  const newUser = await NaverUser.create({
                     email: profile.email,
                     nickName: profile.name,
                     snsId: profile.id,
                     providerType: 'naver',
                  }, (err,data)=>{
                    console.log("(네이버 exUser else 콜백) err and data test",err,data);
                    });
                  done(null, newUser);
               }
            } catch (error) {
               console.error(error);
               done(error);
            }
         },
      ),
   );
};