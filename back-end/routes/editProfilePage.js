const express = require("express");

const router = express.Router();

router.post("/editInfo", (req, res) => {
	try {
		const dataRecieved = {
			status: "success!",
			your_data: {
				id: req.body.id,
				name: req.body.name,
				email: req.body.email,
				age: req.body.age,
				location: req.body.location,
				cuisinePreferences: req.body.cuisinePreferences,
			},
		};
		// ... then send a response of some kind to client
		res.json(dataRecieved);
	} catch (err) {
		res.json({
			success: false,
		});
	}
});

module.exports = router;
