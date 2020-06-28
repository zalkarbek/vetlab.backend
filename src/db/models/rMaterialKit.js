module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('rMaterialKit', {
    otdelId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    sRMetodId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    sBoleznId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    opPokazatelJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },

    sMaterialTypeJSON: {
      type: DataTypes.JSON,
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

    costOneIsledovanie: {
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
    tableName: 'rmaterial_kits',
    modelName: 'rMaterialKit',
    timestamps: true
  });

  schema.associate = (models) => {
    // associations can be defined here
    schema.belongsTo(models.otdel, {
      foreignKey: 'otdelId'
    });

    schema.belongsTo(models.sRMetod, {
      foreignKey: 'sRMetodId'
    });

    schema.belongsTo(models.sBolezn, {
      foreignKey: 'sBoleznId'
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
