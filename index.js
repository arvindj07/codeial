const express=require('express');
const app=express();
const port=8000;

//use express router
app.use('/',require('./routes'));  // can also give path as - require('./routes/index') , but it by default takes index   file only, as the name of this file(entry file) nd route file is same

app.listen(port,function(err){
  if(err){console.log(`Error while setting up the server: ${err}`); return;}

  console.log('Server running on port:', port);
});