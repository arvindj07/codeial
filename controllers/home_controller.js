// for every action in the controller u have to setup the route, controllers are collections of actions

module.exports.home = function(req,res){
  return res.render('home',{
    title:'Home'
  });
}

// module.exports.actionName= function(req,res){}