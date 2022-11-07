const assert = require("assert");
const express = require("express");
const request = require("supertest");

describe("Filter", function () {
	describe("POST /filter", () => {
		it("should filter database query", function (done) {
			request(express())
				.post("/filter")
				.expect("Content-Type", /json/)
				.end((err, res) => {
					assert.equal(typeof res.body, "object");
					done();
				});
		});
	});
});
