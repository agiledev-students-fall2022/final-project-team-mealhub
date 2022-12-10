const server = require("./app"); // load up the web server

const fs = require("fs");
//const sorter = require("./utils/sort");
const path = require("path");
const http = require('http');
const https = require('https')


require("dotenv").config();

// Start listening to the port

const PORT = process.env.PORT || 8080;
// call express's listen function to start listening to the port
// const listener = server.listen(PORT, function () {
// 	console.log(`Server running on port: ${PORT}`);
// });


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../front-end/build')));
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

if (process.env.NODE_ENV === "production") {
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/mealhub.tk/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/mealhub.tk/cert.pem', 'utf8');
    const ca = fs.readFileSync('/etc/letsencrypt/live/mealhub.tk/chain.pem', 'utf8');
    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
    };

    https.createServer(credentials, server).listen(443, () => {
        console.log('HTTPS Server running on port 443');
    });
    http.createServer(function (req, res) {
        res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
        res.end();
    }).listen(80);
} else if (process.env.NODE_ENV === "development") {
    server.listen(PORT);
} else {
    server.listen(PORT);
}

// Stop listening to the port
const close = () => {
	listener.close();
};
module.exports = {
	close: close,
};
