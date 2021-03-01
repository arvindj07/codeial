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
    this.socket=io.connect('http://localhost:5000'); // if we r running in our own local machine server
    // this.socket=io.connect('http://52.90.135.234:5000');  // if we r running on AWS cloud

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

    //SENDING MESSAGE
    // CHANGE :: send a message on clicking the send message button
    $('#send-message').click(function(){
      let msg = $('#chat-message-input').val(); // val() to get the content of msg sent

      if (msg != ''){
        //EMIT
          self.socket.emit('send_message', {
              message: msg,           // message contains the msg sent
              user_email: self.userEmail,
              chatroom: 'codeial'
          });
      }
    });

    //RECEIVE MSG
    self.socket.on('receive_message',function(data){
      console.log('message received',data.message);

      let newMessage= $('<li>'); // creating a list-item

      let messageType = 'other-message'; // setting it to a classname in chat_box.scss

      // to check if the same user receives the msg, then chng messageType to self-message(another class)
      //These classes r used to set the alignment of msgs differently for the dending nd receiving user,ie., left aligned and right aligned
      if(data.user_email == self.userEmail){
        messageType= 'self-message';
      }

      // appending span element to list item 
      newMessage.append($('<span>',{
        'html':data.message     // setting the content
      }));

      newMessage.append($('<sub>',{
        'html':data.user_email
      }));

      newMessage.addClass(messageType); // adding the class

      $('#chat-messages-list').append(newMessage); // Append the 'newMessage' list to the 
                                                   //unordered list  'chat-messages-list' in _chat_box.ejs in views

    });

  }
}