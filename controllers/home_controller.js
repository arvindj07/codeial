// for every action in the controller u have to setup the route, controllers are collections of actions

module.exports.home = function(req,res){
  // to display the cookie passed in req using Inspect tool in browser
  // console.log(req.cookies);

  //to access the cookie and reset it while sending back response to browser
  res.cookie('user_id',25);

  return res.render('home',{
    title:'Home'
  });
}

// module.exports.actionName= function(req,res){}