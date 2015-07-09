// configure Jade so Express can use it
var jade = require('jade');

// let's serce a single static page using Express
var express = require('express');
app = express.createServer();


// have Express serve a static repertory
// send a 'public' directory which contains JS, CSS, and images
app.set('views', _dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", {layout: false});
app.configure(function(){
    app.use(express.static(_dirname + '/public'));
});

// configure Express to use the 'home.jade' file
app.get('/', function(req, res){
    res.render('home.jade');
});
app.listen(4000); // listen to specific port

// initialize the Socket.io module 
// chain it to listen to connections from the same address & port as Express
var io = require('socket.io').listen(app);

// intialize connection
io.sockets.on('connection', function(socket){
    
    // set the pseudo event
    socket.on('setPseudo', function(data){
        
        // set the data from the client to the pseudo event
        socket.set('pseudo', data);
        
        // get the user's pseudo and relay it to all the clients
        socket.on('message', function(message) {
            socket.get('pseudo', function(error, name) {
                var data = {'message': message, pseudo:name};
                socket.broadcast.emit('message', data);
                console.log("user" + name + "send this : " + message);
            });
        });
    });
    
});

