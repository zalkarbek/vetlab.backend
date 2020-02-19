module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('vnytNapravlenie', {

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

    opPokazatelId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
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
      type: DataTypes.VARCHAR(100),
      allowNull: true,
      defaultValue: null
    },


  }, {
    tableName: 'vnyt_napravlenie',
    modelName: 'vnytNapravlenie',
    timestamps: true
  });
  schema.associate = (models) => {
    // associations can be defined here
    schema.belongsTo(models.personal, {
      foreignKey: 'napravilPersonalId'
    });

    schema.belongsTo(models.departments, {
      foreignKey: 'napravlenDepartmentId'
    });

    schema.belongsTo(models.otdely, {
      foreignKey: 'napravlenOtdelId'
    });

    schema.belongsTo(models.subOtdely, {
      foreignKey: 'napravlenSubOtdelId'
    });

    schema.belongsTo(models.personal, {
      foreignKey: 'prinyalPersonalId'
    });

    schema.belongsTo(models.personal, {
      foreignKey: 'prinyalOtdelId'
    });

    schema.belongsTo(models.subOtdely, {
      foreignKey: 'prinyalSubOtdelId'
    });

    schema.belongsTo(models.sPokazately, {
      foreignKey: 'opPokazatelId'
    });

    schema.belongsTo(models.posMaterialy, {
      foreignKey: 'posMaterialId'
    });
  };

  return schema;
};
