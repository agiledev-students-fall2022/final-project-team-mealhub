const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");

//Assertion style
chai.should();
chai.use(chaiHttp);

//COMMENTED CODE FOR WHEN AUTHENTICATION IS SET
/*
//=============================================================
const userLoginInfo = {
    email: "applepie@gmail.com",
    password: "password",
};

//=============================================================
*/
describe("TEST API- editImage", () => {
    /**
     * Test the POST route for uploadImage
     */

    //COMMENTED CODE FOR WHEN AUTHENTICATION IS SET
    /*
    beforeEach((done) => {
        chai.request(server)
            .post("/login")
            .send(userLoginInfo)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    */

    describe("POST request to /uploadImage", () => {
        it("It should POST image to editImage", (done) => {
            const f = "test/dogTestPic.jpg";
            chai.request(server)
                .post("/uploadImage")
                .set("content-type", "multipart/form-data")
                .attach("image", f)
                .end((err, res) => {
                    res.should.be.a("object");
                    res.body.should.have.property("status").equals("success");
                    res.body.should.have
                        .property("message")
                        .equals("The files were uploaded!!!");
                    res.body.should.have.property("files");
                    done();
                });
        });
    });
});
