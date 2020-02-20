module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('personal', {

    firstName: {
      type: DataTypes.STRING(300),
      allowNull: false
    },

    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },

    personalDataJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },

    pol: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },

    imgFileId: {
      type: DataTypes.INT(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    addressLiveSRegionId: {
      type: DataTypes.INT(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    addressBirthSRegionId: {
      type: DataTypes.INT(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    userId: {
      type: DataTypes.INT(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    sDoljnostId: {
      type: DataTypes.INT(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    otdelId: {
      type: DataTypes.INT(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    subOtdelId: {
      type: DataTypes.INT(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },


  }, {
    tableName: 'personal',
    modelName: 'personal',
    timestamps: true
  });

  schema.associate = (models) => {
    // associations can be defined here
    schema.belongsTo(models.fileStorage, {
      foreignKey: 'imFileId'
    });

    schema.belongsTo(models.sRegions, {
      foreignKey: 'addressLiveSRegionId'
    });

    schema.belongsTo(models.sRegions, {
      foreignKey: 'addressBirthSRegionId'
    });

    schema.belongsTo(models.user, {
      foreignKey: 'userId'
    });

    schema.belongsTo(models.sRegions, {
      foreignKey: 'sRegionId'
    });

    schema.belongsTo(models.sDoljnosti, {
      foreignKey: 'sDoljnostId'
    });

    schema.belongsTo(models.otdely, {
      foreignKey: 'otdelId'
    });

    schema.belongsTo(models.subOtdely, {
      foreignKey: 'subOtdelId'
    });

  };

  return schema;
};
