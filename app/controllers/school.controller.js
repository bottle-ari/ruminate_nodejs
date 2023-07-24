const School = require("../models/school.model.js");

// 새 객체 생성
exports.insert = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };

    const school = new School({
        nm: req.body.nm,
        age: req.body.age,
        grade: req.body.grade,
        class: req.body.class
    });
    console.log("받은 데이터 : %s",school.nm);

    // 데이터베이스에 저장
    School.insert(school, (err, data) =>{
      console.log("받은 데이터2 : %s",school.nm);
        if(err){
            res.status(500).send({
                message:
                err.message || "Some error occured while creating th School."
            });
        }else {
          res.send("저장을 성공 하였습니다.");
        }
    })
};



exports.insertTest = (req,res) =>{
    const nm = req.query.nm
    const age = req.query.age
    const grade = req.query.grade
    const class1 = req.query.class
    // const data = JSON.parse(req.params.data);
    // const { nm, age, grade, class1: studentClass } = data;
    const school = new School({
      nm: nm,
      age: age,
      grade: grade,
      class: class1
    });
    console.log("받은 데이터 : %s", school.nm);
    // 데이터베이스에 저장
    School.insert(school, (err, data) => {
      console.log("받은 데이터2 : %s", school.nm);
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occured while creating th School."
        });
      } else {
        res.send("저장을 성공 하였습니다.");
      }
    })
}

// 전체 조회 
exports.findAll = (req,res)=>{
    School.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving school."
          });
        else res.send(data);
      });
};

// id로 조회
exports.findOne = (req,res)=>{
    School.findOne(req.params.schoolId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found School with id ${req.params.schoolId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving School with id " + req.params.schoolId
            });
          }
        } else res.send(data);
      });
};

// id로 갱신
exports.update = (req,res)=>{
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  School.update(
    req.params.schoolId,
    new School(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found School with id ${req.params.schoolId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating School with id " + req.params.schoolId
          });
        }
      } else res.send(data);
    }
  );
};

// id로 삭제
exports.delete = (req,res)=>{
    School.remove(req.params.schoolId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found School with id ${req.params.schoolId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete School with id " + req.params.schoolId
            });
          }
        } else res.send({ message: `School was deleted successfully!` });
      });
};

// 전체 삭제
exports.deleteAll = (req,res)=>{
    School.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all school."
          });
        else res.send({ message: `All School were deleted successfully!` });
      });
};