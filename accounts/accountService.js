module.exports = {
    getAccountInfo : function getAccountInfo(){ 
        

    },

    handleAllAccountServices: async function handleAllAccountServices(req, ret){
        await this.manageLoginAuthorities(req, ret);
        await this.handleAccount(req, ret);
    },

    manageLoginAuthorities: async function manageLoginAuthorities(req, ret){
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        ret['loginauthority'] = [{name: 'Breedbase', url:'http://localhost:7080/brapi/authorize?display_name=Image%20Analysis%20Pipeline&return_url='+fullUrl}];

        
    },

    handleAccount :async function handleAccount(req, ret){
        
        got = require('got');
        //try a call to get info
        token = req.query.token;
        
       if(token){
            try {
                response = await got('http://localhost:7080'+'/authenticate/check/token?cookie='+token);
                responseObject = JSON.parse(response.body);
                console.log(response.body);
            } catch (error) {
                console.log(error.message);
            }

            //add account info to ret

            if(responseObject&&responseObject.result[0]&&responseObject.result[0].first_name&&responseObject.result[0].last_name){
                ret['account'] = {
                    logged_in:true,
                    name: ''+responseObject.result[0].first_name + ' ' + responseObject.result[0].last_name,
                    authority: req.query.authority
                };
            }else{
                ret['account'] = {
                    logged_in:false
                };
            }
        }

    }
}