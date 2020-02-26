

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
      allowNull: true,
      defaultValue: null
    },

    sRegionId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
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
    }

  }, {
    tableName: 'departments',
    modelName: 'department',
    timestamps: true
  });

  schema.associate = (models) => {
    // associations can be defined here
    schema.belongsTo(models.sRegions, {
      foreignKey: 'sRegionId'
    });

    schema.hasMany(models.otdely, {
      foreignKey: 'departmentId'
    });

    schema.hasMany(models.napravlenie, {
      foreignKey: 'departmentId'
    });

    schema.hasMany(models.vnytNapravlenie, {
      foreignKey: 'departmentId'
    });

  };

  return schema;
};
