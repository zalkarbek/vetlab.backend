

module.exports = (sequelize, DataTypes) => {
  const sOtdelenia = sequelize.define('sOtdelenia', {
    i18n: {
      type: DataTypes.STRING(255),
      defaultValue: null,
    },
    name: {
      type: DataTypes.STRING(255),
      defaultValue: null,
      allowNull: true
    }
  }, {
    tableName: 's_otdelenia',
    modelName: 'sOtdelenia',
    timestamps: true
  });
  sOtdelenia.associate = (models) => {
    // associations can be defined here
    sOtdelenia.hasMany(models.otdely, {
      foreignKey: 'sOtdeleniaId',
      sourceKey: 'id'
    });
    sOtdelenia.hasMany(models.subOtdely, {
      foreignKey: 'sOtdeleniaId',
      sourceKey: 'id'
    });
  };

  return sOtdelenia;
};
