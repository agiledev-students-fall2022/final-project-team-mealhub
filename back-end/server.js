const server = require("./app"); // load up the web server

require("dotenv").config();

const PORT = process.env.PORT || 8080;
// call express's listen function to start listening to the port
const listener = server.listen(PORT, function () {
	console.log(`Server running on port: ${port}`);
});
// Stop listening to the port
const close = () => {
	listener.close();
};
module.exports = {
	close: close,
};
