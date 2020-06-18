module.exports = {
  register: async function (app) {
	  path = '/editImage';
	  console.log('Registering GET: '+path);
	  app.get(path, async function(req, res) {
			var appDir = require('path').dirname(require.main.filename);
			var accountService = require(appDir+'/accounts/accountService');
			
			var ret = {
				index: {
					  message: 'welcome!!'

				}
			};

			await accountService.handleAllAccountServices(req, ret);
			res.render('editImage', ret);
		    });
  }
}