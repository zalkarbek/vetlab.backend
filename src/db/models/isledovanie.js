module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('isledovanie', {

    vnytNapravlenieId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    isOtdelId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    isSubOtdelId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    isPersonalId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    opPokazatelJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },

    metodJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },

    isResultJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null
    },

    status: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },

    dateStart: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },

    dateFinish: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    }

  }, {
    tableName: 'isledovanie',
    modelName: 'isledovanie',
    timestamps: true
  });
  schema.associate = (models) => {
    // associations can be defined here
    schema.belongsTo(models.vnytNapravlenie, {
      foreignKey: 'vnytNapravlenieId'
    });

    schema.belongsTo(models.otdel, {
      foreignKey: 'isOtdelId'
    });

    schema.belongsTo(models.subOtdel, {
      foreignKey: 'isSubOtdelId'
    });

    schema.belongsTo(models.personal, {
      foreignKey: 'isPersonalId'
    });

  };

  return schema;
};
