//Its the Subscriber

//This Class is used to send a request for Connection (front-end side connection)
//This class in Initialized in Home.ejs
class ChatEngine{
  constructor(chatBoxId,userEmail){
    this.chatBoxId=$(`#${chatBoxId}`);
    this.userEmail= userEmail;

    //to initiate the connection
    // the cdn file for socket ,at home.ejs in views gives us this object -'io'
    //this line fires an event to connect
    this.socket=io.connect('http://localhost:5000');

    if(this.userEmail){
      this.connectionHandler();
    }
  }

  // it handles the to-nd-fro interaction bw subcriber(user) and observer(server)
  connectionHandler(){
    // handling the event- 'connect', which checks if the connection has been established by server or not (connection established at config-> chat_sockets.js)
    this.socket.on('connect',function(){
      console.log('Connection established using Sockets..!');
    });
  }
}