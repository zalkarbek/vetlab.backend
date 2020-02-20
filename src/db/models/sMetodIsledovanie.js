

module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('sMetodIsledovanie', {

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
    tableName: 's_metod_isledovanie',
    modelName: 'sMetodIsledovanie',
    timestamps: true
  });
  schema.associate = (models) => {
    // associations can be defined here
    schema.hasMany(models.isledovanie, {
      foreignKey: 'metodId'
    });
  };

  return schema;
};
