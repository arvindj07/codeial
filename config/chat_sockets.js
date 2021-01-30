// Its the Observer/Server

//Receive the request for connection
module.exports.chatSockets = function(socketServer){
  let io = require('socket.io')(socketServer, {
    cors: {                                     // NOTE: This is an extra bit that came up after searching for the error 
                                                // in StackOverflow, as the connection wasnt established
      origin: "http://localhost:8000",
      credentials: true
    }
  });

  //This event is called 'connection' over here nd 'connect' at user/front-end side,But usually the event occurring over there and here has same name
  // here we r handling the event connect that has been triggered at user side and establish the connection
  io.sockets.on('connection',function(socket){
    console.log('New Connection received',socket.id);

    socket.on('disconnect',function(){
      console.log('socket Disconnected');
    });
  });
}