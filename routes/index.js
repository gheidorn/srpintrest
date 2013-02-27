
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'n + 1 : SRPintrest', currentURL: '/' });
};