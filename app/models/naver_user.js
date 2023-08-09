const sql = require("../../db.js");


class NaverUser {
    constructor(user) {
        this.snsId = user.snsId;
        this.email = user.email;
        this.nickName = user.nickName;
        this.providerType = user.providerType;
    }

    static findOne(where, result) {
        const snsId = where.where.snsId;

        console.log("::::findOne " + snsId);

        sql.query('SELECT * FROM NaverUsers WHERE snsId = ?',snsId, (err, res) => {
            console.log("static findOne 콜백함수 실행");
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found NaverUser: ", res[0]);
                result(null, res[0]);
                return;
            }

            // 결과가 없을 시 
            result({kind: "not_found"}, null);
        });
    };

    static create(user,result) {
        const new_user = new NaverUser({
            snsId: user.snsId,
            email: "naverTestMail@naver.com",
            providerType: user.provider,
            nickName: user.nick
        });
        // var c_str_tmp = 'INSERT INTO User SET snsId=7123 , email="1234@naver.com" , nickName="ssss", providerType="kakao"' // 잘들어가는 것 
        var c_str = `INSERT INTO NaverUsers SET snsId="${new_user.snsId}" , email="${new_user.email}" , nickName="${new_user.nickName}", providerType="${new_user.providerType}"`
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

module.exports = { NaverUser };  // User를 객체로 내보내기

