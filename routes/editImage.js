module.exports = {
  register: async function (app) {
	  path = '/editImage';
	  console.log('Registering GET: '+path);
	  app.get(path, function(req, res) {
		    
			res.render('editImage', {
		            index: {
		                  message: 'welcome!!'

		            }
			
		        });
		    });
  }
}