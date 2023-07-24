module.exports = app =>{
    const school = require("../controllers/school.controller.js");

    // 인서트 추가 테스트
    app.get("/schoolInsert",school.insertTest);

    
    // 인서트 
    app.post("/school", school.insert);


    // 전체 조회 
    app.get("/school", school.findAll);

    // id로 조회
    app.get("/school/:schoolId", school.findOne);

    // id로 수정
    app.put("/school/:schoolId", school.update);

    // id로 삭제
    app.delete("/school/:schoolId", school.delete);

    // 전체 삭제
    app.delete("/school", school.deleteAll);

};