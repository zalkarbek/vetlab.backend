module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('sDoljnost', {

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
      allowNull: false,
      defaultValue: null
    },

  }, {
    tableName: 's_doljnosti',
    modelName: 'sDoljnost',
    timestamps: true
  });

  schema.associate = (models) => {
    // associations can be defined here
    schema.hasMany(models.personal, {
      foreignKey: 'sDoljnostId'
    });
  };

  return schema;
};
