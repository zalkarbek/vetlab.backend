

module.exports = (sequelize, DataTypes) => {
  const sDoljnosti = sequelize.define('sDoljnosti', {
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
    tableName: 's_doljnosti',
    modelName: 'sDoljnosti',
    timestamps: true
  });
  sDoljnosti.associate = (models) => {
    // associations can be defined here
    sDoljnosti.hasMany(models.personal, {
      foreignKey: 'sDoljnostId',
      sourceKey: 'id'
    });
  };

  return sDoljnosti;
};
