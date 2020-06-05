module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('isledovanieResultName', {

    name: {
      type: DataTypes.STRING(300),
      allowNull: false,
      defaultValue: null
    },

    shortName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },

    sOtdeleniaId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null
    }

  }, {
    tableName: 'isledovanie_result_names',
    modelName: 'isledovanieResultName',
    timestamps: true
  });
  schema.associate = (models) => {
    schema.belongsTo(models.sOtdelenia, {
      foreignKey: 'sOtdeleniaId',
      as: 'sOtdelenia'
    });
  };

  return schema;
};
