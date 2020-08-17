module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('napravlenie', {

    nomer: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    zapolnilPersonalId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    zapolnilDepartmentId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    zapolnilDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },

    prinyalPersonalId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    prinyalOtdelId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    regionJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },

    otdelId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    perenapravilPersonalId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    dataZapolnenia: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },

    opPokazatelJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },

    ownerJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },

    probyNapravilJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },

    probyDostavilJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },

    napravlenieDataJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },

    oldPrinyalPersonalId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    oldPrinyalOtdelId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    oldPrinyalDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },

    status: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    }

  }, {
    tableName: 'napravlenie',
    modelName: 'napravlenie',
    timestamps: true
  });
  schema.associate = (models) => {
    // associations can be defined here
    schema.belongsTo(models.personal, {
      foreignKey: 'zapolnilPersonalId',
      as: 'zapolnilPersonal'
    });

    schema.belongsTo(models.department, {
      foreignKey: 'zapolnilDepartmentId',
      as: 'zapolnilDepartment'
    });

    schema.belongsTo(models.personal, {
      foreignKey: 'prinyalPersonalId',
      as: 'prinyalPersonal'
    });

    schema.belongsTo(models.otdel, {
      foreignKey: 'prinyalOtdelId',
      as: 'prinyalOtdel'
    });

    schema.belongsTo(models.otdel, {
      foreignKey: 'otdelId',
      as: 'otdel'
    });

    schema.belongsTo(models.personal, {
      foreignKey: 'perenapravilPersonalId',
      as: 'perenapravilPersonal'
    });

    schema.belongsTo(models.personal, {
      foreignKey: 'oldPrinyalPersonalId',
      as: 'oldPrinyalPersonal'
    });

    schema.belongsTo(models.otdel, {
      foreignKey: 'oldPrinyalOtdelId',
      as: 'oldPrinyalOtdel'
    });

    schema.hasMany(models.posMaterial, {
      foreignKey: 'napravlenieId'
    });

    schema.hasMany(models.vnytNapravlenie, {
      foreignKey: 'napravlenieId'
    });

  };

  return schema;
};
