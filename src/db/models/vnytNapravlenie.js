module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('vnytNapravlenie', {
    napravlenieId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    napravilPersonalId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    napravlenDepartmentId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    napravlenOtdelId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    napravlenSubOtdelId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
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

    prinyalSubOtdelId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    prinyalDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },

    rejectPersonalId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    rejectOtdelId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    rejectSubOtdelId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    rejectDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },

    rejectionDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null
    },

    opPokazatelIdJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },

    posMaterialId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    postMaterialCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },

    posMaterialCheckVid: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },

    postMaterialCheck: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },

    status: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },

    dateVremyaOtpravki: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Date.now()
    },

    dateDeworming: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    dateVaccination: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    dateObrabotki: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    dateLechenia: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },

    anthelminticTypeJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },
    antibioticTypeJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },
    disinfectantTypeJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },
    vaccineTypeJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },
    isledovanieProvoditsaJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    }


  }, {
    tableName: 'vnyt_napravlenie',
    modelName: 'vnytNapravlenie',
    timestamps: true
  });
  schema.associate = (models) => {
    // associations can be defined here
    schema.belongsTo(models.napravlenie, {
      foreignKey: 'napravlenieId'
    });

    schema.belongsTo(models.personal, {
      foreignKey: 'napravilPersonalId',
      as: 'napravilPersonal'
    });

    schema.belongsTo(models.department, {
      foreignKey: 'napravlenDepartmentId',
      as: 'napravlenDepartment'
    });

    schema.belongsTo(models.otdel, {
      foreignKey: 'napravlenOtdelId',
      as: 'napravlenOtdel'
    });

    schema.belongsTo(models.subOtdel, {
      foreignKey: 'napravlenSubOtdelId',
      as: 'napravlenSubOtdel'
    });

    schema.belongsTo(models.personal, {
      foreignKey: 'prinyalPersonalId',
      as: 'prinyalPersonal'
    });

    schema.belongsTo(models.otdel, {
      foreignKey: 'prinyalOtdelId',
      as: 'prinyalOtdel'
    });

    schema.belongsTo(models.subOtdel, {
      foreignKey: 'prinyalSubOtdelId',
      as: 'prinyalSubOtdel'
    });

    schema.belongsTo(models.personal, {
      foreignKey: 'rejectPersonalId',
      as: 'rejectPersonal'
    });

    schema.belongsTo(models.otdel, {
      foreignKey: 'rejectOtdelId',
      as: 'rejectOtdel'
    });

    schema.belongsTo(models.subOtdel, {
      foreignKey: 'rejectSubOtdelId',
      as: 'rejectSubOtdel'
    });

    schema.belongsTo(models.posMaterial, {
      foreignKey: 'posMaterialId'
    });

    schema.hasMany(models.isledovanie, {
      foreignKey: 'vnytNapravlenieId',
      as: 'isledovanies'
    });

  };

  return schema;
};
