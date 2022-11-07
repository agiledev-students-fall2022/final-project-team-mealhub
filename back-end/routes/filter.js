const express = require("express");

const router = express.Router();

const axios = require("axios");

const devURL = "https://my.api.mockaroo.com/mealhub.json?key=2f898fd0";

router.post("/", async (req, res) => {
	try {
		const dataRecieved = {
			status: "success!",
			data: {
				...req.body,
			},
		};

		const response = await axios.get(devURL);
		// console.log(response.data);
		res.json(response.data);

		// query the data base for the response
		// console.log(response);
	} catch (err) {
		res.json({
			success: false,
		});
	}
});

module.exports = router;
