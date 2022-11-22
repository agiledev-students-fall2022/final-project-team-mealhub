const express = require("express");
const router = express.Router();
const axios = require("axios");
const mongoose = require("mongoose");

const Group = require("../models/Group");

// Getting data at my group
router.get("/", async (req, res) => {
	try {
		// requesting resource from DB
		const groups = await Group.find({})
			.populate("user")
			.sort({ createdAt: "desc" })
			.lean();

		// console.log(groups);
		// const response = await axios.get(
		// 	`https://my.api.mockaroo.com/mealhub.json?key=2f898fd0`
		// );

		//console.log(response.data);
		// res.json([...groups]); // pass data along directly to client
    res.json([...groups]);
    
	} catch (err) {
		res.json({
			success: false,
		});
	}
})

// get axios delete request from Mycards and remove user ID from the members list of the group object
router.delete("/:id", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    const members = group.members;
    const index = members.indexOf(req.body.user);
    members.splice(index, 1);
    await group.save();
    res.json({
      success: true,
    });
  } catch (err) {
    res.json({
      success: false,
    });
  }
});


module.exports = router;
