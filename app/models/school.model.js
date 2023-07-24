const sql = require("../../db.js");

//생성자 
const School = function(school){
    this.nm = school.nm;
    this.age = school.age;
    this.grade = school.grade;
    this.class = school.class;
};

// school 인서트
School.insert = (newSchool, result)=>{
    sql.query("INSERT INTO school SET ?", newSchool, (err, res)=>{

        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Insert school: ",{id:res.inseertId, ...newSchool });
        result(null, {id: res.inseertId, ...newSchool});
    });
};

// school id로 조회
School.findOne = (schoolID, result)=>{
    
    console.log("::::findOne "+schoolID);
    console.log("::::result "+result);

    sql.query('SELECT * FROM school WHERE id = ?',schoolID, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.length){
            console.log("found school: ", res[0]);
            result(null, res[0]);
            return;
        }

        // 결과가 없을 시 
        result({kind: "not_found"}, null);
    });
};

// school 전체 조회
School.getAll = result =>{
    sql.query('SELECT * FROM school ', (err, res)=>{

        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("school: ", res);
        result(null, res);
    });
};

// school id로 수정
School.update = (id, school, result)=>{


    console.log("::::update "+id);
    console.log("::::school "+school);

    sql.query('UPDATE school SET nm = ?, age = ?, grade = ?, class = ? WHERE id = ?', 
    [school.age, school.grade, school.class, id], (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows ==0){
            // id 결과가 없을 시 
            result({kind: "not_found"}, null);
            return;
        }

        console.log("update school: ", {id:id, ... school});
        result(null, {id:id, ...school});
    });
};

// school id로 삭제
School.remove = (id, result)=>{

    console.log("::::remove "+id);
    console.log("::::result "+result);

    sql.query('DELETE FROM school WHERE id = ?',id, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows ==0){
            // id 결과가 없을 시 
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted school with id: ", id);
        result(null, res);
    });
};

// school 전체 삭제
School.removeAll = result =>{
    sql.query('DELETE FROM school',(err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows ==0){
            // id 결과가 없을 시 
            result({kind: "not_found"}, null);
            return;
        }

        console.log('deleted ${res.affectedRows} school ');
        result(null, res);
    });
};

module.exports = School;