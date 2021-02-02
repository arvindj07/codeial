// it will contain both DEVELOPMENT and  PRODUCTION Environment

const development={
  name:'development',
  asset_path:'./assets',          // here './' is required, not just '/'
  session_cookie_key:'blahsomething',
  db:'codeial_development',
  smtp: {
      service:'gmail',
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {   // The gmail- account details of user to Establish their identity with gmail
        user: 'tommycruise1997', // user
        pass: 'Ron@ldo07', // password 
      },
    },
  google_client_id: "393761501294-q8cslu8hojllcibaln70varvopr5pdjf.apps.googleusercontent.com",
  google_client_secret: "NQ3iRjtKoN5b4pPA-Ge_dXST",
  google_call_back_url: "http://localhost:8000/users/auth/google/callback",
  jwt_secret:'codeial',
}

const production={
  name:'production',
  asset_path:process.env.CODEIAL_ASSET_PATH,          // here './' is required, not just '/'
  session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
  db:process.env.CODEIAL_DB,
  smtp: {
      service:'gmail',
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {   // The gmail- account details of user to Establish their identity with gmail
        user: process.env.CODEIAL_GOOGLE_USERNAME, 
        pass: process.env.CODEIAL_GOOGLE_PASSWORD,
      },
    },
  google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
  google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL, 
  jwt_secret: process.env.CODEIAL_JWT_SECRET,
}
// eval is used to convert the string stored in process.env.... to a variable i.e, to use production object
// we can also use 'NODE_ENV' instead of 'CODEIAL_ENVIRONMENT'
module.exports = eval(process.env.CODEIAL_ENVIRONMENT)== undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);