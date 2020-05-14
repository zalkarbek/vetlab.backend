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

    fullName: {
      type: DataTypes.VIRTUAL,
      allowNull: true,
      get() {
        return this.lastName + ' ' + this.firstName;
      }
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

    addressLiveRegionJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },

    addressBirthRegionJSON: {
      type: DataTypes.JSON,
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

    schema.hasMany(models.vnytNapravlenie, {
      foreignKey: 'napravilPersonalId'
    });

    schema.hasMany(models.napravlenie, {
      foreignKey: 'zapolnilPersonalId'
    });

    schema.hasMany(models.napravlenie, {
      foreignKey: 'prinyalPersonalId'
    });

  };
  return schema;
};
