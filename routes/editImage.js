module.exports = {
  	register: async function (app) {
		console.log(global);
	  	if(global.appConfig.pageAccess.editImage){
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

					var redirected = await accountService.handleAllAccountServices(req, ret, res);
					if(!redirected){
						res.render('editImage', ret);
					}
				});
		} else {
			console.log("editImage not listed in config, Skipping register.");
		}
	}
	  

}