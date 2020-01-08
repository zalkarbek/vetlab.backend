module.exports = (sequelize, DataTypes) => {
  const subOtdely = sequelize.define('subOtdely', {
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
    tableName: 'sub_otdely',
    modelName: 'subOtdely',
    timestamps: true
  });
  subOtdely.associate = (models) => {
    subOtdely.belongsTo(models.otdely, {
      foreignKey: 'otdelId'
    });
    subOtdely.belongsTo(models.sOtdelenia, {
      foreignKey: 'sOtdeleniaId'
    });
    // associations can be defined here
  };

  return subOtdely;
};
