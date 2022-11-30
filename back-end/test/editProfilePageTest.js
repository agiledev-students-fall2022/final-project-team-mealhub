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
describe("TEST API- editProfilePage", () => {
    /**
     * Test the POST route for editProfilePage
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
    describe("POST request to /editInfo", () => {
        it("It should POST changes to user profile", (done) => {
            const change = {
                displayName: "Hello Dog",
            };
            chai.request(server)
                .post("/editInfo")
                .send(change)
                .end((err, res) => {
                    res.should.be.a("object");
                    res.body.should.have.property("status").equals("success!");
                    res.body.should.have
                        .property("your_data")
                        .that.includes.all.key(["displayName"]);
                    res.body.should.have.nested
                        .property("your_data.displayName")
                        .not.equal("");

                    done();
                });
        });
    });
});
