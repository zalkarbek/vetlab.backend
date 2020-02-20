

module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('sRegions', {

    i18n: {
      type: DataTypes.STRING(255),
      defaultValue: null,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      defaultValue: null,
      allowNull: true
    },

    sRegionTypeId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    }

  }, {
    tableName: 's_regions',
    modelName: 'sRegions',
    timestamps: true
  });
  schema.associate = (models) => {
    // associations can be defined here

    schema.belongsTo(models.sRegionType, {
      foreignKey: 'sRegionTypeId'
    });

    schema.hasMany(models.otdely, {
      foreignKey: 'sRegionId'
    });

    schema.hasMany(models.personal, {
      foreignKey: 'sRegionId'
    });

    schema.hasMany(models.planRaboty, {
      foreignKey: 'sRegionId'
    });

    schema.hasMany(models.posMaterialy, {
      foreignKey: 'sRegionId'
    });
  };

  return schema;
};
