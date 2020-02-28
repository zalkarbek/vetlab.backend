

module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('sOtdelenia', {

    i18n: {
      type: DataTypes.STRING(300),
      allowNull: true,
      defaultValue: null
    },

    shortName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },

    name: {
      type: DataTypes.STRING(300),
      allowNull: true,
      defaultValue: null
    },

  }, {
    tableName: 's_otdelenia',
    modelName: 'sOtdelenia',
    timestamps: true
  });

  schema.associate = (models) => {
    // associations can be defined here

    schema.hasMany(models.otdel, {
      foreignKey: 'sOtdeleniaId',
      sourceKey: 'id'
    });

    schema.hasMany(models.subOtdel, {
      foreignKey: 'sOtdeleniaId',
      sourceKey: 'id'
    });

  };

  return schema;
};
