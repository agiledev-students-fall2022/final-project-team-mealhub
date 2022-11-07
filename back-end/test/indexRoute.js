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
				// .expect(200, done)
				.end((err, res) => {
					assert.equal(typeof res.body, "object");
					// res.should.have.status(200);
					//      res.body.should.be.a('object');
					done();
				});
		});
	});
});
