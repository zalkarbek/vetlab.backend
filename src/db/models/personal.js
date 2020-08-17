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

    patronymicName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null
    },

    fullName: {
      type: DataTypes.VIRTUAL,
      allowNull: true,
      get() {
        return this.lastName + ' ' + this.firstName + ' ' + this.patronymicName;
      }
    },

    fullShortName: {
      type: DataTypes.VIRTUAL,
      allowNull: true,
      get() {
        const firstLetterFirstName = this.firstName ? this.firstName[0] : '';
        const firstLetterPatronymicName = this.patronymicName ? this.patronymicName[0] : '';

        return this.lastName
          + '.' +
          firstLetterFirstName
          + '.' +
          firstLetterPatronymicName;
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

    departmentId: {
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

    schema.hasOne(models.otdel, {
      foreignKey: 'headPersonalId',
      as: 'headedOtdel'
    });

    schema.belongsTo(models.subOtdel, {
      foreignKey: 'subOtdelId'
    });

    schema.belongsTo(models.department, {
      foreignKey: 'departmentId'
    });

    schema.hasMany(models.vnytNapravlenie, {
      foreignKey: 'napravilPersonalId',
      as: 'napravilPersonals'
    });

    schema.hasMany(models.napravlenie, {
      foreignKey: 'zapolnilPersonalId',
      as: 'zapolnilPersonals'
    });

    schema.hasMany(models.napravlenie, {
      foreignKey: 'prinyalPersonalId',
      as: 'prinyalPersonals'
    });

  };
  return schema;
};
