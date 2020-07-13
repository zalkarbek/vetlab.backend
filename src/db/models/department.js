module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('department', {

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

    regionJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },

    departmentDataJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },

    isCenter: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },

    reportTitleName: {
      type: DataTypes.STRING(300),
      allowNull: false,
      defaultValue: null
    },

    reportFooterName: {
      type: DataTypes.STRING(300),
      allowNull: false,
      defaultValue: null
    },

  }, {
    tableName: 'departments',
    modelName: 'department',
    timestamps: true
  });

  schema.associate = (models) => {
    // associations can be defined here
    schema.hasMany(models.otdel, {
      foreignKey: 'departmentId'
    });

    schema.hasMany(models.napravlenie, {
      foreignKey: 'zapolnilDepartmentId'
    });

    schema.hasMany(models.vnytNapravlenie, {
      foreignKey: 'napravlenDepartmentId'
    });
  };

  return schema;
};
