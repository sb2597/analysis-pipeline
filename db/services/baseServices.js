module.exports = {
    
    insert : async function insert(sequelize, model, values){ 
    
      let createdObject = false;
      let tempModel = sequelize.define(model.modelName, model.model, model.modelOptions);

      try {  
        createdObject = await tempModel.create(values);
      } catch (error) {
        console.error(error);
      }

      return createdObject instanceof tempModel;

    },

    select : function (sequelize, model, criteria){
        let tempModel = sequelize.define(model.modelName, model.model, model.modelOptions);

        //example criteria:
        //{
        // [sequelize.and]: [
        //    { authorId: 12 },
        //    { status: 'active' }
        //  ]
        //}
        //This roughly does this:
        // SELECT * FROM model WHERE authorId = 12 AND status = 'active';

        //another example criteria:
        //{
        //authorId: 12
        //status: 'active'
        //}
        //this does the same as above

        return tempModel.findAll({where: criteria});
    },

    update : async function (sequelize, model, criteria, values){
        let tempModel = sequelize.define(model.modelName, model.model, model.modelOptions);

        // Example: Change everyone without a last name to "Doe"
        //await User.update({ lastName: "Doe" }, {
        //    where: {
        //    lastName: null
        //}
        //});
  
        // Change everyone without a last name to "Doe"
        await tempModel.update(values, {
            where: criteria
        });

    },

    delete : async function (sequelize, model, criteria){
        let tempModel = sequelize.define(model.modelName, model.model, model.modelOptions);

        await tempModel.destroy({
            where: criteria
        });
    },

    truncate : async function (sequelize, model){
        let tempModel = sequelize.define(model.modelName, model.model, model.modelOptions);

        await tempModel.destroy({
            truncate: true
        });
    },

/*
const { Op } = require("sequelize");
Post.findAll({
  where: {
    [Op.and]: [{ a: 5 }, { b: 6 }],            // (a = 5) AND (b = 6)
    [Op.or]: [{ a: 5 }, { b: 6 }],             // (a = 5) OR (b = 6)
    someAttribute: {
      // Basics
      [Op.eq]: 3,                              // = 3
      [Op.ne]: 20,                             // != 20
      [Op.is]: null,                           // IS NULL
      [Op.not]: true,                          // IS NOT TRUE
      [Op.or]: [5, 6],                         // (someAttribute = 5) OR (someAttribute = 6)

      // Using dialect specific column identifiers (PG in the following example):
      [Op.col]: 'user.organization_id',        // = "user"."organization_id"

      // Number comparisons
      [Op.gt]: 6,                              // > 6
      [Op.gte]: 6,                             // >= 6
      [Op.lt]: 10,                             // < 10
      [Op.lte]: 10,                            // <= 10
      [Op.between]: [6, 10],                   // BETWEEN 6 AND 10
      [Op.notBetween]: [11, 15],               // NOT BETWEEN 11 AND 15

      // Other operators

      [Op.all]: sequelize.literal('SELECT 1'), // > ALL (SELECT 1)

      [Op.in]: [1, 2],                         // IN [1, 2]
      [Op.notIn]: [1, 2],                      // NOT IN [1, 2]

      [Op.like]: '%hat',                       // LIKE '%hat'
      [Op.notLike]: '%hat',                    // NOT LIKE '%hat'
      [Op.startsWith]: 'hat',                  // LIKE 'hat%'
      [Op.endsWith]: 'hat',                    // LIKE '%hat'
      [Op.substring]: 'hat',                   // LIKE '%hat%'
      [Op.iLike]: '%hat',                      // ILIKE '%hat' (case insensitive) (PG only)
      [Op.notILike]: '%hat',                   // NOT ILIKE '%hat'  (PG only)
      [Op.regexp]: '^[h|a|t]',                 // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
      [Op.notRegexp]: '^[h|a|t]',              // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
      [Op.iRegexp]: '^[h|a|t]',                // ~* '^[h|a|t]' (PG only)
      [Op.notIRegexp]: '^[h|a|t]',             // !~* '^[h|a|t]' (PG only)

      [Op.any]: [2, 3],                        // ANY ARRAY[2, 3]::INTEGER (PG only)

      // In Postgres, Op.like/Op.iLike/Op.notLike can be combined to Op.any:
      [Op.like]: { [Op.any]: ['cat', 'hat'] }  // LIKE ANY ARRAY['cat', 'hat']

      // There are more postgres-only range operators, see below
    }
  }
});
*/
}