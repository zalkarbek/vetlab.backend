module.exports = (sequelize, DataTypes) => {
  const posMaterialy = sequelize.define('posMaterialy', {
    materialCount: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false
    }
  }, {
    tableName: 'pos_materialy',
    modelName: 'posMaterialy',
    timestamps: true
  });
  posMaterialy.associate = (models) => {
    // associations can be defined here
    posMaterialy.belongsTo(models.personal, {
      foreignKey: 'personalId'
    });
    posMaterialy.belongsTo(models.otdely, {
      foreignKey: 'otdelId'
    });
    posMaterialy.belongsTo(models.subOtdely, {
      foreignKey: 'subOtdelId'
    });
    posMaterialy.belongsTo(models.sRegions, {
      foreignKey: 'sRegionId'
    });
    posMaterialy.belongsTo(models.sMaterialy, {
      foreignKey: 'sMaterialId'
    });
    posMaterialy.belongsTo(models.sMera, {
      foreignKey: 'sMeraId'
    });
  };

  return posMaterialy;
};
