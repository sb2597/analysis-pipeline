module.exports = {
  register: async function (app) {
	  path = '/';
	  console.log('Registering GET: '+path);
	  app.get(path, async function(req, res) {
		var appDir = require('path').dirname(require.main.filename);
		var accountService = require(appDir+'/accounts/accountService');
		
		var ret = {
			index: {
				  message: 'Welcome Message!'

			}
		};

		var redirected = await accountService.handleAllAccountServices(req, ret, res);
		if(!redirected){
			res.render('index', ret);
		}
	});
  }
}