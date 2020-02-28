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
      allowNull: true,
      defaultValue: null
    },

  }, {
    tableName: 's_pokazately',
    modelName: 'sPokazatel',
    timestamps: true
  });

  schema.associate = (models) => {
    // associations can be defined here
    schema.hasMany(models.napravlenie, {
      foreignKey: 'opPokazatelId'
    });

    schema.hasMany(models.vnytNapravlenie, {
      foreignKey: 'opPokazatelId'
    });

    schema.hasMany(models.posMaterial, {
      foreignKey: 'opPokazatelId'
    });

    schema.hasMany(models.isledovanie, {
      foreignKey: 'opPokazatelId'
    });

  };

  return schema;
};
