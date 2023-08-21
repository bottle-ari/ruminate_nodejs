const sql = require("../../db.js");

class User {
    constructor(user) {
        this.snsId = user.snsId;
        this.email = user.email;
        this.nickName = user.nickName;
        this.providerType = user.providerType;
    }

    static findOne(where, result) {
        const snsId = where.where.snsId;

        console.log("::::findOne " + snsId);

        sql.query('SELECT * FROM User WHERE snsId = ?',snsId, (err, res) => {
            console.log("static findOne 콜백함수 실행");
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found User: ", res[0]);
                result(null, res[0]);
                return;
            }

            // 결과가 없을 시 
            result({kind: "not_found"}, null);
        });
    };

    // static create(profile,result) {
    //     // email = profile._json && profile._json.kakao_account_email,
    //     var nickname =  profile.nickname;
    //     var snsId =  profile.snsId;
    //     var providerType = 'kakao';
    //     console.log("received create KAKAO Profile data : "+email+" "+nickname+" "+snsId+" "+providerType);
        
    //     var email = "임시이메일(아직 카카오 이메일 권한 X)"
    //     var sql_str = "INSERT INTO User (snsId,email,nickName,providerType) VALUES ('"+snsId+"','"+email+"','"+nickname+"','"+providerType+"')"
    //     sql.query(sql_str,(err,res) => {
    //         if (err) {
    //             console.log("error: ", err);
    //             result(err, null);
    //             return;
    //         } else {
    //             console.log("정상 Insert 수행..?");
    //         }
    //     });
    //     // 
    // }

    static create_new(user,result) {
        const new_user = new User({
            snsId: user.user.snsId,
            email: "testEmail1234@naver.com",
            providerType: user.user.providerType,
            nickName: user.user.nickName
        });
        // var c_str_tmp = 'INSERT INTO User SET snsId=7123 , email="1234@naver.com" , nickName="ssss", providerType="kakao"' // 잘들어가는 것 
        var c_str = `INSERT INTO User SET snsId=${new_user.snsId} , email="${new_user.email}" , nickName="${new_user.nickName}", providerType="${new_user.providerType}"`
        sql.query(c_str,new_user,(err,res)=>{
            console.log("create new의 콜백함수 실행됨");
            if(err){
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("Insert User.. ");
            result(null, {id: res.insertId, ...new_user});
        })
        return new_user;
        // School.insert = (newSchool, result)=>{
        //     sql.query("INSERT INTO school SET ?", newSchool, (err, res)=>{
        
        //         if(err){
        //             console.log("error: ", err);
        //             result(err, null);
        //             return;
        //         }
        
        //         console.log("Insert school: ",{id:res.inseertId, ...newSchool });
        //         result(null, {id: res.inseertId, ...newSchool});
        //     });
        // };
    }
}

module.exports = { User };  // User를 객체로 내보내기


// //생성자 
// const User = function(user){
//     this.snsId = user.snsId;
//     this.email = user.email;
//     this.nickname = user.nickname;
//     this.providerType = user.providerType;
// };


// // school id로 조회
// User.findOne = (where)=>{
//     snsId = profile.id;
//     result = "임시";
//     console.log("::::findOne "+snsId);
//     console.log("::::result "+result);

//     sql.query('SELECT * FROM User WHERE snsId = ?',snsId, (err, res)=>{
//         if(err){
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }

//         if(res.length){
//             console.log("found User: ", res[0]);
//             result(null, res[0]);
//             return;
//         }

//         // 결과가 없을 시 
//         result({kind: "not_found"}, null);
//     });
// };

// module.exports = User;


