module.exports = {
    getAccountInfo : function getAccountInfo(){ 
        

    },
    // TODO: Not working. Unsure why
    // swapTokens: function swapTokens(stringToSwap){
    //     let temp = stringToSwap;
    //     temp = temp.replaceAll('<RETURN_URL>', req.protocol + '://' + req.get('host') + req.originalUrl);

    //     return temp;
    // },

    getLoginAuthorities: function getLoginAuthorities(req, ret){
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        var ret = [];
        global.appConfig.loginAuthorities.forEach(function(authority){
            var newAuth = {};
            for( var key in authority ) {
                var value = authority[key];
                newAuth[key] = value.toString().replace('<RETURN_URL>', req.protocol + '://' + req.get('host') + req.originalUrl);
            }

            ret.push(newAuth);
        });
        return ret;
        // return [{name: 'Breedbase', loginUrl:'http://localhost:7080/brapi/authorize?display_name=Image%20Analysis%20Pipeline&return_url='+fullUrl+'?authority=Breedbase',accountInfoUrl:'http://localhost:7080/authenticate/check/token?cookie=', confirmUrl:'http://localhost:7080/brapi/v2/search/people'},]
    },

    handleAllAccountServices: async function handleAllAccountServices(req, ret, res){
        var redirected = false
        await this.manageLoginAuthorities(req, ret, res);
        redirected = await this.handleAccount(req, ret, res);
        return redirected;
    },

    manageLoginAuthorities: async function manageLoginAuthorities(req, ret, res){
        
        ret['loginauthority'] = this.getLoginAuthorities(req, ret);

        
    },

    handleAccount :async function handleAccount(req, ret, res){
        var redirected = false;
        got = require('got');
        //try a call to get info
        token = req.query.token;
        authority = req.query.authority;
        loginAuthorities = this.getLoginAuthorities(req, ret);
        responseObject = undefined;
        if(token){
            try {
                for(var i = 0; i < loginAuthorities.length; i++){
                    if(loginAuthorities[i].name == authority){
                        accountInfoUrl = loginAuthorities[i].accountInfoUrl;
                        confirmUrl = loginAuthorities[i].confirmUrl;

                    }
                }
                response = await got(accountInfoUrl+token);
                responseObject = JSON.parse(response.body);
                console.log(response.body);

                //workaround to confirm login in breedbase
                
                var response2 = await got.post(confirmUrl, {
                    headers: {
                        Authorization: 'Bearer '+token
                    },
//                    json: {
//                    },
                    responseType: 'json'
                });

            } catch (error) {
                console.log(error.message);
                responseObject = undefined;
                
            }

            //add account info to ret

            if(responseObject&&responseObject.result[0]&&responseObject.result[0].first_name&&responseObject.result[0].last_name){
                //get the authority from the settings.
                for(var i = 0; i < global.appConfig.loginAuthorities.length; i++){
                    if(global.appConfig.loginAuthorities[i].name ==req.query.authority){
                        ret['api'] = global.appConfig.loginAuthorities[i].apiEndpoints;
                    }
                }

                ret['account'] = {
                    logged_in:true,
                    name: ''+responseObject.result[0].first_name + ' ' + responseObject.result[0].last_name,
                    authority: req.query.authority
                };
            }else{
                //if there is a token remove it
                if(req.query.token){
                    res.redirect(req.path);
                    redirected = true;
                }
                ret['account'] = {
                    logged_in:false
                };
            }
        }
        return redirected;

    }
}