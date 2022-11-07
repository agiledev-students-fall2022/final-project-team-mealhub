const assert = require("assert");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");

//Assertion style
chai.should();
chai.use(chaiHttp);

describe("TEST API- createGroup Page", () => {
    describe("GET request to /createGroup", () => {
        it("It should fetch all the group details submitted by the user", function (done) {
            chai.request(server)
                .post("/createGroup")
                .end((err, req) => {
                    // res.should.have.status(200);
                    // console.log(req.body)
                    // console.log(err)
                    req.body.should.be.a("object");
                    req.body.should.have.property("groupData");
                    assert.equal(typeof req.body, "object");
                    done();
                });
        });
    });
});



// describe("TEST API- createGroup Page", () => {

//     describe("GET request to /createGroup", () => {
//         it("It should GET all the group details submitted by the user", (done) => {
//             chai.request(server)
//                 .get("/createGroup")
//                 .end((err, res) => {
//                     // res.should.be.a("array");
//                     assert.equal(typeof res.body, "object");

//                     // res.body.should.have.property("");
//                     res.body.should.have.property("restaurant")
//                     res.body.should.have.property("email")
//                     res.body.should.have.property("attendees")
//                     res.body.should.have.property("location")
//                     res.body.should.have.property("date")
//                     res.body.should.have.property("time")
//                     res.body.should.have.property("name")
//                     res.body.should.have.property("budgetDollar")
                   
//                     done();
//                 });
//         });
//     });
// });



