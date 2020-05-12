module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('otdel', {

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
      allowNull: false,
      defaultValue: null
    },

    departmentId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    sOtdeleniaId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    otdelDataJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    }

  }, {
    tableName: 'otdely',
    modelName: 'otdel',
    timestamps: true
  });

  schema.associate = (models) => {
    // associations can be defined here

    schema.belongsTo(models.department, {
      foreignKey: 'departmentId'
    });

    schema.belongsTo(models.sOtdelenia, {
      foreignKey: 'sOtdeleniaId',
      as: 'sOtdelenia'
    });

    schema.hasMany(models.subOtdel, {
      foreignKey: 'otdelId'
    });

    schema.hasMany(models.personal, {
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
