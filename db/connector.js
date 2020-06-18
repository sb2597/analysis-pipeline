module.exports = {
  InitializeDatabaseConnectors :async function(configJson){ 

    console.log('Initializing connection to DB.')
    if (!configJson.dbuser) console.log('Warning : No value found for dbuser in config!');
    if (!configJson.dbhost) console.log('Warning : No value found for dbhost in config!');
    if (!configJson.dbdatabase) console.log('Warning : No value found for dbdatabase in config!');
    if (!configJson.dbpassword) console.log('Warning : No value found for dbpassword in config!');
    if (!configJson.dbport) console.log('Warning : No value found for dbport in config!');

    const { Pool, Client } = require('pg')
    const pool = new Pool({
      user: configJson.dbuser,
      host: configJson.dbhost,
      database: configJson.dbdatabase,
      password: configJson.dbpassword,
      port: configJson.dbport
    })
    //test connection
    console.log('Testing Connection to DB.');
    pool.query('SELECT NOW()', (err, res) => {
      console.log(err, res)
      pool.end()
    })

    console.log('Initializing ORM');
    //configure ORM
    const Sequelize = require('sequelize');
    const DataTypes = require('sequelize/lib/data-types');
    const sequelize = new Sequelize(configJson.dbdatabase, configJson.dbuser, configJson.dbpassword, {
      host: configJson.dbhost,
      port: configJson.dbport,
      dialect: 'postgres',
    
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },

    });
  /*  
    var testSequelize = sequelize.define('testSequelize', {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
      username: Sequelize.STRING
    });
  */ 
  /*
    model = require('./../model/testModel');
    sequelize.define(model.modelName , model.model);
  
    //require(__dirname+'/model/testModel');

    // this creates any missing tables creates a record and fetches it. we gotta break it up.
    
    sequelize.sync().then(function() {
      return testSequelize.create({
        username: 'test'
      });
    }).then(function(test) {
      console.log(test.get({
        plain: true
      }));
    });
  */

    return [sequelize, pool];
  }

/*
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})
*/

//To get a connection to the db
/*
pool
  .connect()
  .then(client => {
    return client
      .query('SELECT * FROM users WHERE id = $1', [1])
      .then(res => {
        client.release()
        console.log(res.rows[0])
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  })
*/
};