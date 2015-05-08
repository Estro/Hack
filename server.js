var static = require('node-static');
var http = require('http');
var file = new(static.Server)();
var app = http.createServer(function(req, res) {
    file.serve(req, res);
}).listen(process.env.PORT || 3000);

var io = require('socket.io').listen(app);
io.sockets.on('connection', function(socket) {

    socket.on('message', function(message) {
        socket.broadcast.emit('message', message);
        console.log(message);
    });

    socket.on('connected', function(message) {
        socket.broadcast.emit('connected', message);

    });

});
