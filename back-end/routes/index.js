const express = require("express");

const router = express.Router();

// include root directory just redirecting to explore
router.get("/", (req, res) => {
	res.redirect("/explore");
});
// explore pages
// route /explore

router.get("/explore", async (req, res) => {
	try {
		// requesting resource
		const response = await axios.get(
			`https://my.api.mockaroo.com/mealhub.json?key=2f898fd0`
		);
		res.json(response.data[0]); // pass data along directly to client
	} catch (err) {
		res.json({
			success: false,
		});
	}
});

module.exports = router;
