var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = 8080;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/admin/api/message', function(req, res) {
    console.log("/admin/api/message");
    io.sockets.emit("chat message", {data:req.params.data});

    res.json({
        status: 200
    });
});

io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        io.emit('chat message', "port:" + port + " user:" + socket.id + " msg:" + msg);
    });
});

io.on('hogehoge', function() {
  console.dir(arguments);
});

http.listen(port, function() {
    console.log('listening on *:' + port);
});
