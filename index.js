const express=require('express');
const cookieParser = require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for Session cookie
const session = require('express-session');
//Passport lib and Strategies
// if strategies r not required here, it will show 'Not Authorised'
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy'); 
// this lib is used to store the session cookie in a persistence storage(i.e, DB),as otherwise the cookie is erased after each server restart
const MongoStore = require('connect-mongo')(session);  //unlike other lib, it requires an argument,i.e., 
 //the session( express-session), as we have to store the session info in the DB
const sassMiddleware = require('node-sass-middleware');
// For flash messages
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');


// using SASS middleware to convert scss to css
app.use(sassMiddleware({
  src:'./assets/scss',   // from  where to pick up scss files
  dest:'./assets/css',    // where to put the converted css files
  debug: true,            // to display error when not able to convert the files, false when in Production mode
  outputStyle:'extended',  // to display the css code elaborately
  prefix:'/css'       // prefix is set as we r now using sass ,so we have to tell what to chk 4in the href of css link tag
}));
//middleware to read the data passed by the forms using req.body ,method-POST
app.use(express.urlencoded());

//using cookie-parser
app.use(cookieParser());


// To SETUP the ASSETS folder for CSS and other files, so that the view files can access them through root folder ASSETS
app.use(express.static('./assets'));

//make the uploads Path available to browser( for the Profile avatar)
// now the current directory+ /uploads path is available on /uploads 
app.use('/uploads',express.static(__dirname+'/uploads'));

// used to SETUP the LAYOUT that is used in Views, the filename is layout which is default names
// its placed before setting-up the views and view-engine coz the layout is to be set before as when it reaches views, the layout should be already set
app.use(expressLayouts);

//  extract STYLES and SCRIPTS from sub pages into the LAYOUT by SETTING the values in app object
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// Here we Setup the View i.e., The Html/Ejs pages
// set up the view engine and the views
app.set('view engine','ejs');  //app.set(name,value) here using set() we set the values in the 'app' object
app.set('views','./views');

// middleware used to encrypt the cookie(session cookie)
// MongoStore is used to store the session cookie in DB
app.use(session({
  name: 'codeial',                // name of the session-cookie
  // TODO change secret before deployment in production mode
  secret:'blahsomething',         // encryption key
  saveUninitialized:false,        //to prevent extra being stored in the cookie,when the user isnt logged-in
  resave: false,                  //not to save the user data again and again
  cookie:{
    maxAge:(1000*60*100)          // the amount of time this cookie should be stored in ms, after that session-time-out
  },
  store:new MongoStore(           // storing session cookie in DB
    {
    mongooseConnection: db,       // DB connection
    autoRemove: 'disabled'
    },
    function(err){
      console.log(err || 'connect-mongodb setup');   // if err display err ,else display the text within ''
    }
  )
}));

//middleware to use passport, and passport also controls the session
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// Using Flash for flash-msgs
app.use(flash());   // placed after Session ,coz it uses Session cookies to store flash-msgs
app.use(customMiddleware.setFlash);  // use the middleware to set the flash-msg in res (response)

// This is where the route (folder) is setup  using middleware
//use express router
app.use('/',require('./routes'));  // can also give path as - require('./routes/index') , but it by default takes index   file only, as the name of this file(entry file) nd route file is same



// Setting up express server
app.listen(port,function(err){
  if(err){console.log(`Error while setting up the server: ${err}`); return;}

  console.log('Server running on port:', port);
});

