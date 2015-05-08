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
    });

    socket.on('connected', function(message) {
        socket.broadcast.emit('connected', message);
    });

    socket.on('disconnected', function(message) {
        socket.broadcast.emit('disconnected');
    });

    socket.on('deleteitem', function(message) {
    	console.log('======');
        socket.broadcast.emit('deleteitem', message);
    });

});
