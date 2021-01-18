// used to set msgs into res, so that it can be used in the Template(View)
module.exports.setFlash = function(req,res,next){
  // defining flash as an object in locals
  res.locals.flash = {
    'success': req.flash('success'),
    'error': req.flash('error')
  }

  next();
};
