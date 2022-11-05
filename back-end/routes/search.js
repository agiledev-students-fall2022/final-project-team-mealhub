const express = require("express");
const router = express.Router();

router.get("/search", async (req, res) => {
	try {
        const q = req.query;
		res.json(q);
	} catch (err){
		res.json({
			success: false,
		});
	}
});

module.exports = router;