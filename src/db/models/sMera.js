module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('sMera', {

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
    tableName: 's_mera',
    modelName: 'sMera',
    timestamps: true
  });

  schema.associate = (models) => {
    // associations can be defined here
    schema.hasMany(models.posMaterialy, {
      foreignKey: 'sMeraId'
    });
  };

  return schema;
};
