module.exports = {
  register: async function (app) {
	  path = '/';
	  console.log('Registering GET: '+path);
	  app.get(path, function(req, res) {
		    
			res.render('index', {
		            index: {
		                  message: 'Welcome message!'

		            }
			
		        });
		    });
  }
}