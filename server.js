var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = 8080;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/admin/api/message', function(req, res) {
    console.log("/admin/api/message");
    io.sockets.emit("chat message", req.query.data || "api message!" );

    res.json({
        status: 200
    });
});

io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        io.emit('chat message', "port:" + port + " user:" + socket.id + " msg:" + msg);
    });
});

http.listen(port, function() {
    console.log('listening on *:' + port);
});
