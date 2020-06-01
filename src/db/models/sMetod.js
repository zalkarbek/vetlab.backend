module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('sMetod', {

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

    gosStandard: {
      type: DataTypes.STRING(300),
      allowNull: true,
      defaultValue: null
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null
    }

  }, {
    tableName: 's_metod_isledovanie',
    modelName: 'sMetod',
    timestamps: true
  });
  schema.associate = (models) => {
    // associations can be defined here
  };

  return schema;
};
