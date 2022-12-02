const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	restaurant: {
		type: String,
		required: true,
		trim: true,
	},
	location: {
		type: String,
		required: true,
		trim: true,
	},
	capacity: {
		type: Number,
		required: true,
	},
	budget: {
		type: Number,
		required: true,
	},
	members: [{ type: mongoose.Schema.Types.ObjectID, ref: "User" }],
	image: {
		type: String,
		required: true,
	},

	dress_code: {
		type: String,
		required: true,
		trim: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectID,
		ref: "User",
	},
	date: {
		type: Date,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
	cuisine: {
		type: String,
		enum: [
			"american",
			"indian",
			"chinese",
			"italian",
			"korean",
			"mediterranean",
			"japanese",
		],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});
module.exports = mongoose.model("Group", GroupSchema);
