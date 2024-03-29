module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('sRegionType', {

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
        if(val) {
          this.setDataValue('shortName', val.trim());
        } else {
          this.setDataValue('shortName', val);
        }
      }
    },

    name: {
      type: DataTypes.STRING(300),
      allowNull: false,
      defaultValue: null,
      set(val) {
        if(val) {
          this.setDataValue('name', val.trim());
        } else {
          this.setDataValue('name', val);
        }
      }
    },


  }, {
    tableName: 's_region_type',
    modelName: 'sRegionType',
    timestamps: true
  });

  schema.associate = (models) => {
    // associations can be defined here
    schema.hasMany(models.sRegion, {
      foreignKey: 'sRegionTypeId'
    });
  };

  return schema;
};
