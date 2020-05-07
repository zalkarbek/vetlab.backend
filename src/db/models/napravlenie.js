module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('napravlenie', {

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

    opPokazatelId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
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
      foreignKey: 'zapolnilPersonalId'
    });

    schema.belongsTo(models.department, {
      foreignKey: 'zapolnilDepartmentId'
    });

    schema.belongsTo(models.personal, {
      foreignKey: 'prinyalPersonalId'
    });

    schema.belongsTo(models.otdel, {
      foreignKey: 'prinyalOtdelId'
    });

    schema.belongsTo(models.otdel, {
      foreignKey: 'otdelId'
    });

    schema.belongsTo(models.personal, {
      foreignKey: 'perenapravilPersonalId'
    });

    schema.belongsTo(models.sPokazatel, {
      foreignKey: 'opPokazatelId'
    });

    schema.belongsTo(models.personal, {
      foreignKey: 'oldPrinyalPersonalId'
    });

    schema.belongsTo(models.otdel, {
      foreignKey: 'oldPrinyalOtdelId'
    });

    schema.hasMany(models.posMaterial, {
      foreignKey: 'napravlenieId'
    });

  };

  return schema;
};
