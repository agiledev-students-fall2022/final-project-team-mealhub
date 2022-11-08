const express = require("express");
const router = express.Router();
const axios = require("axios");

const devURL = "https://my.api.mockaroo.com/mealhub.json?key=2f898fd0";

router.get("/", async (req, res) => {
	try {
        const q = req.query;

		const response = await axios.get(devURL);
		res.json(response.data);
	} catch (err){
		res.json({
			success: false,
		});
	}
});

module.exports = router;