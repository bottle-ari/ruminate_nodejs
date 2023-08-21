const account_model = require('../models/account.model')

/**
 * snsId가 서버 DB에 이미 계정이 추가 되어있으면 해당 계정의 id를 리턴하고, 없다면 새로 회원 가입 후에 새로 만든 id를 리턴
 * @param {string} snsId 
 * @param {string} snsInfo google or kakao or naver
 * @returns 
 */
exports.getOrMakeDBIdBySnsId = async function getOrMakeDBIdBySnsId(data) {
    return new Promise(async(resolve,reject)=>{
        try {
            const snsId = data.snsId
            const snsInfo = data.snsInfo
            var e_id = 0
            e_id = await account_model.Account.findBySnsIdAndSnsInfo({snsId:snsId, snsInfo:snsInfo},
            ()=>{console.log("바깥 findbysns 콜백테스트")})
            .then(db_result=>{
                // 아이디가 이미 존재하는 경우 db_result = True
                if (!db_result) {
                    console.log("해당 snsId로 새로운 DB id를 생성합니다")
                    return 0;
                } else {
                    console.log("이미 해당 snsId로 회원가입이 처리된 회원입니다")
                    return db_result;
                }
            })
        
            if (!e_id) {
                console.log("신규 회원 가입 시작..")
                await account_model.Account.create({snsInfo: "google",
                    sns_id: snsId,
                    email: "test_email_new_make@gmail.com"}).then(result1=>{
                        // console.log("여기에서 res에서 새로운 id(pkey로 사용할)의 정보가 포함되어있으면 됨\n"+
                        // "parse로 OkPacket -> JSON 파싱");
                        const js = JSON.parse(JSON.stringify(result1))
                        const insertId = js['insertId']
                        console.log("신규 구글 회원이 가입한 Account 테이블의 insert ID : ",insertId)
                        e_id = insertId
                    })
            }
        } catch(err_1) {
            reject(err1)
        }
        resolve(e_id)
    })

    

}



