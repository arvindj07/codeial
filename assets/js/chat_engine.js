//Its the Subscriber

//This Class is used to send a request for Connection (front-end side connection)
//This class in Initialized in Home.ejs
class ChatEngine{
  constructor(chatBoxId,userEmail){
    this.chatBoxId=$(`#${chatBoxId}`);
    this.userEmail= userEmail;

    //to initiate the connection
    // the cdn file for socket ,at home.ejs in views gives us this object -'io'
    //this line fires an event-connect to establish connection
    this.socket=io.connect('http://localhost:5000');

    if(this.userEmail){
      this.connectionHandler();
    }
  }

  // it handles the to-nd-fro interaction bw subcriber(user) and observer(server)
  connectionHandler(){
    let self= this;  //since this will be changed on on('connect')


    // handling the event- 'connect', which checks if the connection has been established by server or not (connection established at config-> chat_sockets.js)
    this.socket.on('connect',function(){
      console.log('Connection established using Sockets..!');

                                //CHAT-ROOM
      //EMIT
      //emiting an event named 'join_room' to the server
      // used by the user to join a chat-room
      self.socket.emit('join_room',{
        user_email: self.userEmail,
        chatroom:'codeial' 
      });

      //RECEIVE
      //Receiving the notification/event from server when any user has joined the Chat-room
      self.socket.on('user_joined',function(data){
        console.log('User joined',data);
      });
    });
  }
}