var Fingerprint = require('express-fingerprint');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server)

// app.use(Fingerprint({
//     parameters:[
//         // Defaults 
//         Fingerprint.useragent,
//         Fingerprint.acceptHeaders,
//         Fingerprint.geoip
//     ]
// }))
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/index.html')
});
app.get('*',function(req,res,next) {
    // Fingerprint object 
    console.log(req.fingerprint)
})

io.on('connection', function (client) {
    client.on('join', function(handshake) {
        // console.log(handshake);
        console.log("Client connected");
    });
})
const port = process.env.PORT || 3000;

server.listen(port);
console.log(`Server listening on http://localhost:${port}`);

