module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('sMaterialType', {

    i18n: {
      type: DataTypes.STRING(300),
      allowNull: true,
      defaultValue: null
    },

    shortName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      set(val) {
        this.setDataValue('shortName', val.trim());
      }
    },

    name: {
      type: DataTypes.STRING(300),
      allowNull: false,
      defaultValue: null,
      set(val) {
        this.setDataValue('name', val.trim());
      }
    },

  }, {
    tableName: 's_material_type',
    modelName: 'sMaterialType',
    timestamps: true
  });
  schema.associate = (models) => {
    // associations can be defined here
    schema.hasMany(models.sMaterial, {
      foreignKey: 'sMaterialTypeId'
    });
  };

  return schema;
};
