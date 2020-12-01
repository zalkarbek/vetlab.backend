module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('isledovanieRMetod', {
    isledovanieId: {
      type: DataTypes.STRING(300),
      allowNull: false,
      defaultValue: null
    },

    rmetodId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: null
    },

  }, {
    tableName: 'isledovanie_rmetods',
    modelName: 'isledovanieRMetod',
    timestamps: true
  });
  schema.associate = (models) => {

  };

  return schema;
};
