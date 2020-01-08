module.exports = (sequelize, DataTypes) => {
  const otdely = sequelize.define('otdely', {
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
    tableName: 'otdely',
    modelName: 'otdely',
    timestamps: true
  });
  otdely.associate = (models) => {
    otdely.belongsTo(models.sRegions, {
      foreignKey: 'sRegionId'
    });
    otdely.belongsTo(models.sOtdelenia, {
      foreignKey: 'sOtdeleniaId'
    });
    // associations can be defined here
  };

  return otdely;
};
