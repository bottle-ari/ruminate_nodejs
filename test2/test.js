router.get("/ex2", function (req, res) {

    var email = "12345";

    var displayName = "123";

    var overlap = function () {
        return new Promise((resolve, reject) => {
            db.query("SELECT id FROM users WHERE email=?", [email], function (err, overlap) {
                if (err) {
                    reject(Error("error"));
                } else {
                    resolve(overlap);
                }
            });
        });
    };



    var overlap2 = function () {

        return new Promise((resolve, reject) => {

            db.query("SELECT id FROM users WHERE displayName=?", [displayName], function (

                err,

                overlap2

            ) {

                if (err) {

                    reject(Error("error"));

                } else {

                    resolve(overlap2);

                }

            });

        });

    };



    (async function () {

        const slow = await overlap();

        if (!ftn.isEmpty(slow)) {

            res.json("이메일이 존재합니다");

            return false;

        }

        const fast = await overlap2();

        if (!ftn.isEmpty(fast)) {

            res.json("닉네임이 존재합니다");

            return false;

        }

    })(); //즉시 실행함수를 모른다면 함수명을 입력하고 함수명() 으로 실행하시면 됩니다.

});