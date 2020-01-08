

module.exports = (sequelize, DataTypes) => {
  const sMetodIsledovanie = sequelize.define('sMetodIsledovanie', {
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
    tableName: 's_metod_isledovanie',
    modelName: 'sMetodIsledovanie',
    timestamps: true
  });
  sMetodIsledovanie.associate = (models) => {
    // associations can be defined here
    sMetodIsledovanie.hasMany(models.isledovanie, {
      foreignKey: 'sMetodId'
    });
  };

  return sMetodIsledovanie;
};
