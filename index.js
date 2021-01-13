const express=require('express');
const app=express();
const port=8000;
const expressLayouts = require('express-ejs-layouts');

// To SETUP the ASSETS folder for CSS and other files, so that the view files can access them through root folder ASSETS
app.use(express.static('./assets'));

// used to SETUP the LAYOUT that is used in Views
// its placed before setting-up the views and view-engine coz the layoutis to be set before as when it reaches views, the layout should be already set
app.use(expressLayouts);

// This is where the route (folder) is setup  using middleware
//use express router
app.use('/',require('./routes'));  // can also give path as - require('./routes/index') , but it by default takes index   file only, as the name of this file(entry file) nd route file is same


// Here we Setup the View i.e., The Html/Ejs pages
// set up the view engine and the views
app.set('view engine','ejs');  //app.set(name,value) here using set() we set the values in the 'app' object
app.set('views','./views');

app.listen(port,function(err){
  if(err){console.log(`Error while setting up the server: ${err}`); return;}

  console.log('Server running on port:', port);
});