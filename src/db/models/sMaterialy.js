

module.exports = (sequelize, DataTypes) => {
  const sMaterialy = sequelize.define('sMaterialy', {
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
    tableName: 's_materialy',
    modelName: 'sMaterialy',
    timestamps: true
  });
  sMaterialy.associate = (models) => {
    // associations can be defined here
    sMaterialy.hasMany(models.posMaterialy, {
      foreignKey: 'sMaterialId',
      sourceKey: 'id'
    });
  };

  return sMaterialy;
};
