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
		await accountService.handleAllAccountServices(req, ret);

		res.render('index', ret);
	});
  }
}