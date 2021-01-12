const express=require('express');
const app=express();
const port=8000;

// This is where the route (folder) is setup  using middleware
//use express router
app.use('/',require('./routes'));  // can also give path as - require('./routes/index') , but it by default takes index   file only, as the name of this file(entry file) nd route file is same


// set up the view engine
app.set('view engine','ejs');  //app.set(name,value) here using set() we set the values in the 'app' object
app.set('views','./views');

app.listen(port,function(err){
  if(err){console.log(`Error while setting up the server: ${err}`); return;}

  console.log('Server running on port:', port);
});