Sequelize = require('sequelize');
DataTypes = require('sequelize/lib/data-types');

module.exports = { 

    modelName : 'testSequelize',

    model :  {
        uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1,
          primaryKey: true
        },
        username: Sequelize.STRING
    },

    modelOptions : {
        tableName: 'testSequelize'
    }
    

    

};