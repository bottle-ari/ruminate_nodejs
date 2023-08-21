require("dotenv").config();

SECRET_KEY = process.env.JWT_SECRET_KEY

const jwt = require('jsonwebtoken');


function make_token(id,email) {
    console.log("${id} 아이디를 가진 계정의 JWT 토큰 발급 시작");
    // make token
    const token = jwt.sign({ id:id,email: email}, SECRET_KEY,
    { expiresIn: "24h",});
    console.log("발급된 토큰 : "+token);
    return token
}


/**
 * request에서 3가지 방법으로 토큰 찾기 + verfiy
 * 토큰 발견 못했을 때 계속 진행되는 것을 막기위해 토큰이 없다면 예외 발생
 * @param {req} request  
 * @returns 
 */
async function get_token_in_req_and_verify(req){
    return new Promise(async(resolve,reject)=>{
        const { authorization } = req.headers;
        if (req.cookies && req.cookies.JWT_TOKEN_TODO) { // req.cookies not none and req.cookies contains JWT_TOKEN_TODO
            token = req.cookies.JWT_TOKEN_TODO
        } else if (authorization != undefined) { // authorization not null
            token = authorization.split(' ')[1]; // index 0 : 'Bearer' | index 1 : token string
        } else { // token in body
            token = req.body.token
        }
        if (!token) {
            reject(new Error("Cannot Find Token or Expired Token"))
        }
        
        const answer = await verify_token(token)
        if (!answer) {
            console.log("토큰 검증 실패")
            reject(new Error("Failed to verify token"))
        }
        resolve(token);
    })
}

async function verify_token(token){
    // check token
    // code20230814195800
    const decodedData = await decodeToken(token).then(decodedData=>{
        console.log("토큰 검증 완료 : 복호화된 데이터 -> ");
        console.log(decodedData)
        return decodedData;
    }).catch(e => { // 토큰 검증 실패한 경우
        console.error(e); // 일단은 에러 출력
        console.log("토큰 검증에 실패하였습니다")
        return false
      });
    return decodedData;
    // verified -> email / iat (unix time stamp when token made) / exp
    // console.log("verified : "+verified);
    // console.log("토큰 검증 완료?")
    // console.log("email : "+verified['email']);
    // console.log("age : "+verified['age']);
}


// private
/**
 * 
 * @param {string} token 
 * @returns 
 */
async function decodeToken(token) {
    return new Promise(
        (resolve, reject) => {
            jwt.verify(token, SECRET_KEY, (error, decoded) => {
                if(error) reject(error);
                resolve(decoded);
            });
        }
    );
}

module.exports = {make_token,verify_token,get_token_in_req: get_token_in_req_and_verify}


// console.log("decoded : "+decoded);

