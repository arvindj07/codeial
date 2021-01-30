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

                               //CHAT-ROOM
    // RECEIVE
    // .on() detects the event send by the client/user
    // used to receive the event join-room from user
    socket.on('join_room',function(data){
      console.log('Joining req received',data);

      //Connect to CHAT-ROOM,
      //If chat-room exists, then user is connected directly. If it doesnt exists, then it first creates the chatroom nd then connects the user into it
      socket.join(data.chatroom);
 
      //EMIT
      //To notify others in the chat-room that, the user has joined this chat-room
      // Server emits an event 'user_joined' to notify other users
      // This event is then received back in the front-end
      //io.in(data.chatroom) is used to emit within the chat-room, otherwise we could have used just emit()
      io.in(data.chatroom).emit('user_joined',data);
    })

    // RECEIVE MSG 
    // CHANGE :: detect send_message and broadcast to everyone in the room
    socket.on('send_message', function(data){
      //EMIT
      io.in(data.chatroom).emit('receive_message', data);
    });

  });
}