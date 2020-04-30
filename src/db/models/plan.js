module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('plan', {

    departmentId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null,
    },

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
  }, {
    tableName: 'plan_raboty',
    modelName: 'plan',
    timestamps: true
  });
  schema.associate = (models) => {
    // associations can be defined here
    schema.belongsTo(models.department, {
      foreignKey: 'departmentId'
    });
  };

  return schema;
};
