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
    describe("GET request to /login", () => {
        it("It should GET all the user credentials", (done) => {
            chai.request(server)
                .get("/login")
                .end((err, res) => {
                    // res.should.be.a("object");
                    console.log(res.body);
                    // res.body.should.have.property("email");
                    // res.body.should.have.property("password");
                    done();
                

                });
        });
    });
});
