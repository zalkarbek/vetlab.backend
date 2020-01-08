module.exports = (sequelize, DataTypes) => {
  const planRaboty = sequelize.define('planRaboty', {
    planCount: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null,
    },
    planKv: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    planYear: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      defaultValue: null,
      allowNull: true
    }
  }, {
    tableName: 'plan_raboty',
    modelName: 'planRaboty',
    timestamps: true
  });
  planRaboty.associate = (models) => {
    // associations can be defined here
    planRaboty.belongsTo(models.otdely, {
      foreignKey: 'otdelId'
    });
    planRaboty.belongsTo(models.sRegions, {
      foreignKey: 'sRegionId'
    });
  };

  return planRaboty;
};
