

module.exports = (sequelize, DataTypes) => {
  const sRegions = sequelize.define('sRegions', {
    i18n: {
      type: DataTypes.STRING(255),
      defaultValue: null,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      defaultValue: null,
      allowNull: true
    }
  }, {
    tableName: 's_regions',
    modelName: 'sRegions',
    timestamps: true
  });
  sRegions.associate = (models) => {
    // associations can be defined here
    sRegions.hasMany(models.otdely, {
      foreignKey: 'sRegionId',
      sourceKey: 'id'
    });
    sRegions.hasMany(models.personal, {
      foreignKey: 'sRegionId',
      sourceKey: 'id'
    });
    sRegions.hasMany(models.planRaboty, {
      foreignKey: 'sRegionId',
      sourceKey: 'id'
    });
    sRegions.hasMany(models.posMaterialy, {
      foreignKey: 'sRegionId',
      sourceKey: 'id'
    });
  };

  return sRegions;
};