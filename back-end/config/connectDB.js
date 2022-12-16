const mongoose = require("mongoose");

// connect the mongoDB with URI
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {});
		console.log(`MongoDB connected on host: ${conn.connection.host}`);
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
};

module.exports = connectDB;
