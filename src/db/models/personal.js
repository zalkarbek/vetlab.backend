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
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    addressLiveSRegionId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    addressBirthSRegionId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    userId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    sDoljnostId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    otdelId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    subOtdelId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
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
      foreignKey: 'imgFileId'
    });

    schema.belongsTo(models.sRegion, {
      foreignKey: 'addressLiveSRegionId'
    });

    schema.belongsTo(models.sRegion, {
      foreignKey: 'addressBirthSRegionId'
    });

    schema.belongsTo(models.user, {
      foreignKey: 'userId'
    });

    schema.belongsTo(models.sDoljnost, {
      foreignKey: 'sDoljnostId'
    });

    schema.belongsTo(models.otdel, {
      foreignKey: 'otdelId'
    });

    schema.belongsTo(models.subOtdel, {
      foreignKey: 'subOtdelId'
    });

  };

  return schema;
};
