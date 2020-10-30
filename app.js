/**
 * 
 */
async function start(){

    const path = require('path'); 
    const fs = require('fs');

    // require ================================================================

    var express = require("express"),                   // web development framework
    mustacheExpress = require('mustache-express');  // Logic-less {{mustache}} templates
 

    // express ===============================================================

    var app = express();

    // parse config ==========================================================
    let configRaw = fs.readFileSync('config.json');
    let configJson = JSON.parse(configRaw);

    global.appConfig = JSON.parse(configRaw);
    
    console.log(configJson);

    const databaseModule = require(__dirname+'/db/connector');

    const connectors = await databaseModule.InitializeDatabaseConnectors(configJson);
    const sequelize = connectors[0];
    const pool = connectors [1];

    // initialize all ORM models ============================================

    // Register all files found in the routes directory

    //joining path of directory 
    const directoryPathForModels = path.join(__dirname, 'model');
    //passing directoryPath and callback function
    fs.readdir(directoryPathForModels, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            console.log('Initializing Model: '+directoryPathForModels+'/'+file); 
            model = require(directoryPathForModels+'/'+file);
            if(model.modelName== null || model.model == null || model.modelOptions == null){
                console.error('Missing required information in model: '+file)
            }else{
                sequelize.define(model.modelName , model.model, model.modelOptions);
            }
        });
    
    });
    /*
    sequelize.sync()
        .then(response => {
        //simple smoke check
            services = require(__dirname+'/db/services/baseServices');
            testModel = require(__dirname+'/model/testmodel');
            services.insert(sequelize, testModel, {username: "two"});
            response = await services.select(sequelize, testModel, {username: "two"});
            console.log("SELECT ="+ response);
        }
    );
    */

    await sequelize.sync();
    services = require(__dirname+'/db/services/baseServices');
    testModel = require(__dirname+'/model/testmodel');
    services.insert(sequelize, testModel, {username: "two"});
    
    accountModel = require(__dirname+'/model/loginAuthority');
    services.insert(sequelize, accountModel, {authorityName: "Breedbase", authorityURL: "http://localhost:7080/brapi/authorize?display_name=Image%20Analysis%20Pipeline&return_url="});

    response = await services.select(sequelize, testModel, {username: "two"});
    console.log("Test select ="+ JSON.stringify(response));
    await services.truncate(sequelize,testModel);

    // configure =============================================================
    app.engine('html', mustacheExpress());          // register file extension mustache

    app.set('view engine', 'html');                 // register file extension for partials
    app.set('views', __dirname + '/html');

    app.use(express.static(__dirname + '/public')); // set static folder

    // routes =================================================================
    // Register all files found in the routes directory

    //joining path of directory 
    const directoryPathForRoutes = path.join(__dirname, 'routes');
    //passing directoryPath and callback function
    fs.readdir(directoryPathForRoutes, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
            files.forEach(function (file) {
        	console.log('Parsing Route: '+directoryPathForRoutes+'/'+file); 
    	require(directoryPathForRoutes+'/'+file).register(app);
        });
        
    });

    //Example of how to register one file:

    //require('./routes/index').register(app);
    //var index = require('./routes/index');
    //index.register(app);

    app.listen(process.env.PORT || 3000);

}
start();