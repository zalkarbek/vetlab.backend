module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('sPokazatel', {

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
    tableName: 's_pokazately',
    modelName: 'sPokazatel',
    timestamps: true
  });

  schema.associate = (models) => {
    // associations can be defined here
  };

  return schema;
};
