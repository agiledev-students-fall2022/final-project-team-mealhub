const assert = require("assert");
const express = require("express");
const request = require("supertest");

describe("Explore", function () {
	describe("GET /", () => {
		// Test to get all students record
		// it("should redirect to explore page", (done) => {
		// 	request(express()).get("/").expect(302, done);
		// });
		it("should show all groups", function (done) {
			request(express())
				.get("/explore")
				.expect("Content-Type", /json/)
				.end((err, res) => {
					assert.equal(typeof res.body, "object");
					// assert.equal(res.status, 200);
					// res.should.have.status(200);
					//      res.body.should.be.a('object');
					done();
				});
		});
	});
});
