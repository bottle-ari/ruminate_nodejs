const sql = require("../../db.js");


TABLE_NAME = "Account"

class Account {
    constructor(account) {
        this.snsInfo = account.snsInfo
        this.sns_id = account.snsId;
        this.email = account.email;
    }

    static async query(sql_str,values) {
        return new Promise((resolve,reject)=>{
            sql.query(sql_str, values, (err, res) => {
                if (err) {
                    console.log("쿼리 error: ", err);
                    reject(new Error());
                    return;
                }
                resolve(res);
            });
        })
    }


    // link109234801932
    static async findBySnsIdAndSnsInfo(where, result) {
        const snsId = where.snsId
        const snsInfo = where.snsInfo
        const query = `SELECT * FROM ${TABLE_NAME} WHERE sns_id = ${snsId} and snsInfo = "${snsInfo}"`
        console.log("query : "+query)
        return new Promise((resolve,reject)=>{
            sql.query(query, (err, res) => {
                console.log("Account=>findBySnsIdAndSnsInfo 콜백함수 실행"); 
                if (err) {
                    console.log("쿼리 error: ", err);
                    reject(new Error());
                    // result(err, null);
                    return;
                }
                console.log("res값 : ",res);
    
                if (res.length) {
                    console.log("성공 found "+TABLE_NAME+": ", res[0]);
                    resolve(res.at(0).id) // 아이디가 있으면 아이디를 리턴 -> 아이디는 정수이므로 참??
                    // result(null, res[0]);
                    return;
                } else {
                    // 아이디가 없으면 false를 리턴
                    console.log(`snsId가 ${snsId}인 계정은 존재하지 않습니다`);
                    resolve(false)
                }
                // 결과가 없을 시 
                // result({kind: "not_found"}, null);
            });
            console.log("sql.query() 콜백의 끝부분")
        })
        // var overlap = function(){}

        // const slow = await overlap();
        // console.log("slow 값 : "+slow)

        // (async function (){
            // const slow = await overlap();
            // console.log("slow 값 : "+slow)
        // })(); //즉시 실행함수를 모른다면 함수명을 입력하고 함수명() 으로 실행하시면 됩니다.
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


    static async create(account,result) {
        const new_account = new Account({
            snsInfo: account.snsInfo,
            sns_id: account.snsId,
            email: account.email
        });
        console.log("create 함수 호출됨");
        // var c_str_tmp = 'INSERT INTO User SET snsId=7123 , email="1234@naver.com" , nickName="ssss", providerType="kakao"' // 잘들어가는 것 
        var c_str = `INSERT INTO ${TABLE_NAME} SET sns_id=${account.sns_id} , email="${account.email}" , snsInfo="${account.snsInfo}"`
        console.log("인서트 쿼리 : "+c_str)
        return new Promise((resolve,reject)=>{
            sql.query(c_str,new_account,(err,res)=>{
                console.log(account+"테이블의 create의 콜백함수 실행됨");
                if(err){
                    console.log("error in create 함수: ", err);
                    reject(new Error());
                    // result(err, null);
                    return;
                }
                console.log("Insert 수행 : "+TABLE_NAME+".. ");
                console.log("res값 임시 출력 -> 혹시 mysql에서 insert하면 만든 데이터리턴됨..?",res)
                resolve(res);
                // result(null, {id: res.insertId, ...new_account});
            })
        });
    }

    static async findAll() {
        const sql_str = `select * from ${TABLE_NAME}`
        return new Promise((resolve,reject)=>{
            sql.query(sql_str,(err,res)=>{
                if(err){
                    console.log("오류 -> findAll 함수: ", err);
                    reject(new Error());
                    return;
                }
                resolve(res);
                // result(null, {id: res.insertId, ...new_account});
            })
        });
    }

}

module.exports = { Account };  // User를 객체로 내보내기

