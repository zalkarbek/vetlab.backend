const baseFields = require('./baseFields');
module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('sRMetod', {
    ...baseFields(DataTypes)
  }, {
    tableName: 's_rmetod',
    modelName: 'sRMetod',
    timestamps: true
  });

  schema.associate = (models) => {
    // associations can be defined here
  };

  return schema;
};
