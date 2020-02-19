

module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('sMaterialy', {

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

    sMaterialTypeId: {
      type: DataTypes.INT(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    sMaterialAnimalTypeId: {
      type: DataTypes.INT(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    sMaterialColor: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null
    },


  }, {
    tableName: 's_materialy',
    modelName: 'sMaterialy',
    timestamps: true
  });

  schema.associate = (models) => {
    // associations can be defined here
    schema.belongsTo(models.sMaterialType, {
      foreignKey: 'sMaterialTypeId'
    });

    schema.belongsTo(models.sMaterialAnimalType, {
      foreignKey: 'sMaterialAnimalTypeId'
    });

    schema.hasMany(models.posMaterialy, {
      foreignKey: 'sMaterialId',
      sourceKey: 'id'
    });
  };

  return schema;
};
