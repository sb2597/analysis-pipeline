Sequelize = require('sequelize');
DataTypes = require('sequelize/lib/data-types');

module.exports = { 

    modelName : 'loginAuthority',

    model :  {
        uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1,
          primaryKey: true
        },
        authorityName: Sequelize.STRING,
        authorityURL: Sequelize.STRING,

        
    },

    modelOptions : {
        tableName: 'loginAuthority'
    }
    

    

};