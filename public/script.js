// start the socket.io connection 
var socket = io.connect();

// output a message to the screen with the user's pseudo
function addMessage(msg, pseudo){
    $("#chatEntries").append('<div class="message"><p>'
                             + pseudo + ':' + msg + '</p></div>');
}

// function which sends a new message using addMessage()
function sentMessage() {
    if($("#messageInput").val() != "") {
        socket.emit('message', $('#messageInput').val());
        addMessage($("#messageInput").val(), "Me", 
                   new Date().toISOString(), true);
        $("#messageInput").val('');
    }
}

// function which sends the pseudo to the user 
function setPseudo() {
    if($("#pseudoInput").val() != "") {
        socket.emit('setPseudo', $("#pseudoInput").val());
        $('#chatControls').show();
        $('#pseudoInput').hide();
        $('#pseudoSet').hide();
    }
}

// have the socket use the addMessage() function on a 'message' event
socket.on('message', function(data){
    addMessage(data['message'], data['pseudo']);
});

// define this function which runs when the page loads
$(function(){
    $("#chatControls").hide();
    $("#pseudoSet").click(function() {setPseudo()});
    $("#submit").click(function() {sentMessage();});
});