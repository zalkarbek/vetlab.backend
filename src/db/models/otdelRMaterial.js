module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('otdelRMaterial', {
    otdelId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    sRMaterialId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    sMeraId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    count: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null
    },

  }, {
    tableName: 'otdel_rmaterials',
    modelName: 'otdelRMaterial',
    timestamps: true
  });

  schema.associate = (models) => {
    // associations can be defined here
    schema.belongsTo(models.otdel, {
      foreignKey: 'otdelId'
    });

    schema.belongsTo(models.sRMaterial, {
      foreignKey: 'sRMaterialId'
    });

    schema.belongsTo(models.sMera, {
      foreignKey: 'sMeraId'
    });
  };

  return schema;
};
