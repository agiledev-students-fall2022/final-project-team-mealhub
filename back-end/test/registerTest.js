const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");

//Assertion style
chai.should();
chai.use(chaiHttp);

describe("TEST API- login", () => {
    /**
     * Test the GET route for profilePage
     */
    describe("GET request to /register", () => {
        it("It should GET all the user credentials", (done) => {
            chai.request(server)
                .get("/register")
                .end((err, res) => {
                        res.body.should.have.property("email"); 
                        res.body.should.have.property("password");
                        res.body.should.have.property("firstname");
                        res.body.should.have.property("lastname");
                        res.body.should.have.property("confirmPassword");
                        res.should.have.status(200);
                    done();
                });
        });
    });
});
