

module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('sRegion', {

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
      allowNull: false,
      defaultValue: null
    }

  }, {
    tableName: 's_regions',
    modelName: 'sRegion',
    timestamps: true
  });
  schema.associate = (models) => {
    // associations can be defined here

    schema.belongsTo(models.sRegionType, {
      foreignKey: 'sRegionTypeId'
    });

    schema.hasMany(models.otdel, {
      foreignKey: 'sRegionId'
    });

    schema.hasMany(models.plan, {
      foreignKey: 'sRegionId'
    });

    schema.hasMany(models.posMaterial, {
      foreignKey: 'sRegionId'
    });
  };

  return schema;
};
