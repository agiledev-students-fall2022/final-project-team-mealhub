const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const User = require("../models/User");

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
describe("TEST API- profilePage", () => {
    /**
     * Test the GET route for profilePage
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
    describe("GET request to /profilePage", () => {
        it("It should GET all the user profile information by ID", (done) => {
            chai.request(server)
                .get("/profilePage")
                .end((err, res) => {
                    res.should.be.a("object");
                    res.body.should.have.property("image");
                    res.body.should.have.property("displayName");
                    res.body.should.have.property("firstName");
                    res.body.should.have.property("lastName");
                    res.body.should.have.property("email");
                    done();
                });
        });
    });
});
