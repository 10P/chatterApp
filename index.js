// Express initializes 'app' to be a function handler to which
// an HTTP server can be supplied
var app = require('express')();
var http = require('http').Server(app);
var express = require('express')

// initialize a new socket.io instance by passing the HTTP server object
var io = require('socket.io')(http);

// declare a static directory to access our CSS
app.use(express.static(__dirname + '/styles'));

// Define a route handler that gets called
// We're gonna pass in our index.html to res
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

// listen on the connection event for incoming sockets
io.on('connection', function(socket){
    socket.on('send message', function(data){
        io.emit('send message', data);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});