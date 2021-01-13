const mongoose = require('mongoose');


// provid connection to DB, mongodb used as its the DB running in background, localhost becoz its running in the same system, codeial_development is the name of the DB in mongoDB
mongoose.connect('mongodb://localhost/codeial_development');

// acquire the connection (to check if it is successful), variable db is the way to interact with the DB
const db = mongoose.connection;

// error check
db.on('error',console.error.bind(console,"Error connecting to MongoDB"));

// up and running then print the msg
db.once('open',function(){
    console.log('Connect to Database :: MongoDB');
});

module.exports = db;