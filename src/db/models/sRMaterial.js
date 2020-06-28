const baseFields = require('./baseFields');
module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('sRMaterial', {
    ...baseFields(DataTypes)
  }, {
    tableName: 's_rmaterials',
    modelName: 'sRMaterial',
    timestamps: true
  });

  schema.associate = (models) => {
    // associations can be defined here

  };

  return schema;
};
