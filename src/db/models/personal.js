module.exports = (sequelize, DataTypes) => {
  const personal = sequelize.define('personal', {
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    pol: {
      type: DataTypes.STRING(100),
      defaultValue: null,
      allowNull: true
    },
    imgUrl: {
      type: DataTypes.STRING(255),
      defaultValue: null,
      allowNull: true
    }
  }, {
    tableName: 'personal',
    modelName: 'personal',
    timestamps: true
  });
  personal.associate = (models) => {
    personal.belongsTo(models.sRegions, {
      foreignKey: 'sRegionId'
    });
    personal.belongsTo(models.sDoljnosti, {
      foreignKey: 'sDoljnostId'
    });
    personal.belongsTo(models.otdely, {
      foreignKey: 'otdelId'
    });
    personal.belongsTo(models.subOtdely, {
      foreignKey: 'subOtdelId'
    });
    // associations can be defined here
  };

  return personal;
};
