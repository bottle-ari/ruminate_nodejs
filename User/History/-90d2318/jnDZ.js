const sql = require("../../db.js");


TABLE_NAME = "Account"

class Account {
    constructor(account) {
        this.snsInfo = account.snsInfo
        this.sns_id = account.snsId;
        this.email = account.email;
    }

    static findById(id, result) {
        sql.query(`SELECT * FROM ${TABLE_NAME} WHERE id = ?`,id, (err, res) => {
            console.log("Account=>findById 콜백함수 실행");
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found "+TABLE_NAME+": ", res[0]);
                result(null, res[0]);
                return;
            }

            // 결과가 없을 시 
            result({kind: "not_found"}, null);
        });
    };

    static findBySnsIdAndSnsInfo(where, result) {
        const snsId = where.snsId   
        const snsInfo = where.snsInfo
        // 여기서 '?'로 컬럼 여러개 전달방법 기억안나서 {}로 묶었는데 틀릴수도 있음     
        sql.query(`SELECT * FROM ${TABLE_NAME} WHERE id = ? and snsInfo = ?`,{sns_id:snsId,snsInfo:snsInfo}, (err, res) => {
            console.log("Account=>findBySnsIdAndSnsInfo 콜백함수 실행"); 
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found "+TABLE_NAME+": ", res[0]);
                result(null, res[0]);
                return;
            }

            // 결과가 없을 시 
            result({kind: "not_found"}, null);
        });


    }

    static create(account,result) {
        const new_account = new Account({
            snsInfo: account.snsInfo,
            sns_id: account.snsId,
            email: account.email
        });
        // var c_str_tmp = 'INSERT INTO User SET snsId=7123 , email="1234@naver.com" , nickName="ssss", providerType="kakao"' // 잘들어가는 것 
        var c_str = `INSERT INTO ${TABLE_NAME} SET snsId="${account.snsId}" , email="${account.email}" , snsInfo="${account.snsInfo}""`
        sql.query(c_str,new_account,(err,res)=>{
            console.log(account+"테이블의 create의 콜백함수 실행됨");
            if(err){
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("Insert "+TABLE_NAME+".. ");
            result(null, {id: res.insertId, ...new_account});
        })
        return new_account;
    }
}

module.exports = { Account };  // User를 객체로 내보내기

