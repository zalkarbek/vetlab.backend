module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('otdely', {

    i18n: {
      type: DataTypes.STRING(300),
      allowNull: true,
      defaultValue: null
    },

    shortName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },

    name: {
      type: DataTypes.STRING(300),
      allowNull: true,
      defaultValue: null
    },

    departmentId: {
      type: DataTypes.INT(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    sOtdeleniaId: {
      type: DataTypes.INT(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    otdelData: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    }

  }, {
    tableName: 'otdely',
    modelName: 'otdely',
    timestamps: true
  });

  schema.associate = (models) => {
    // associations can be defined here

    schema.belongsTo(models.departments, {
      foreignKey: 'departmentId'
    });

    schema.belongsTo(models.sOtdelenia, {
      foreignKey: 'sOtdeleniaId'
    });

    schema.hasMany(models.subOtdely, {
      foreignKey: 'otdelId'
    });

    schema.hasMany(models.personal, {
      foreignKey: 'otdelId'
    });

    schema.hasMany(models.planRaboty, {
      foreignKey: 'otdelId'
    });

    schema.hasMany(models.napravlenie, {
      foreignKey: 'otdelId'
    });

    schema.hasMany(models.isledovanie, {
      foreignKey: 'otdelId'
    });

  };

  return schema;
};
