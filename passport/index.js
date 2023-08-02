const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const { User } = require('../app/models/User');

module.exports = (app) => {

    // code20230802182219
    app.use(require('express-session')({
        secret: 'asdf1234',
        resave: true,
        saveUninitialized: true
      }));

    app.use(passport.initialize()); // passport를 초기화 하기 위해서 passport.initialize 미들웨어 사용
    passport.use(
        new KakaoStrategy({
            clientID: process.env.KAKAO_ID, // 카카오 로그인에서 발급받은 REST API 키
            callbackURL: process.env.KAKAO_URL, // 카카오 로그인 Redirect URI 경로
        },
        // clientID에 카카오 앱 아이디 추가
        // callbackURL: 카카오 로그인 후 카카오가 결과를 전송해줄 URL
        // accessToken, refreshToken : 로그인 성공 후 카카오가 보내준 토큰
        // profile: 카카오가 보내준 유저 정보. profile의 정보를 바탕으로 회원가입
        async (accessToken, refreshToken, profile, done) => {
            try {
                // code20230729235927
                const exUser = await User.findOne({
                    // 카카오 플랫폼에서 로그인 했고 & snsId필드에 카카오 아이디가 일치할경우
                    where: { snsId: profile.id, /*providerType: 'kakao'*/ },
                },(a,b)=>{
                    console.log("exUser의 콜백함수 호출");
                    return b;
                });
                // 이미 가입된 카카오 프로필이면 성공
                console.log("exUser체크 시작..")
                if (exUser) {
                    done(null, exUser); // 로그인 인증 완료
                } else {
                    var call_back_temp = function (a, b) {return a * b};
                    // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
                    const newUser = await User.create_new({
                        // email: profile._json && profile._json.kakao_account_email,
                        user : {nickName: profile.displayName,email:profile.email,snsId: profile.id,providerType: 'kakao'},
                    },(err,data)=>{
                        console.log("(exUser else 콜백) err and data test",err,data);
                    });
                    done(null, newUser); // 회원가입하고 로그인 인증 완료
                }
            } catch (error) {
                console.error(error);
                done(error);
            }
        },
        ),
    );
    passport.serializeUser((user,done)=>{ 
        done(null,user);
    });
    passport.deserializeUser((user,done)=>{
        done(null,user);
    });
};