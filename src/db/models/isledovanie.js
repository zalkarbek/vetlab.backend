module.exports = (sequelize, DataTypes) => {
  const isledovanie = sequelize.define('isledovanie', {
    isledCount: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    positiveCount: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      allowNull: true
    },

  }, {
    tableName: 'isledovanie',
    modelName: 'isledovanie',
    timestamps: true
  });
  isledovanie.associate = (models) => {
    // associations can be defined here
    isledovanie.belongsTo(models.posMaterialy, {
      foreignKey: 'posMaterialId'
    });
    isledovanie.belongsTo(models.sMetodIsledovanie, {
      foreignKey: 'sMetodId'
    });
    isledovanie.belongsTo(models.sMera, {
      foreignKey: 'sMeraId'
    });
  };

  return isledovanie;
};
