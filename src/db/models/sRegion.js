module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('sRegion', {

    i18n: {
      type: DataTypes.STRING(255),
      defaultValue: null,
      allowNull: true
    },

    name: {
      type: DataTypes.STRING(255),
      defaultValue: null,
      allowNull: true,
      set(val) {
        if(val) {
          this.setDataValue('name', val.trim());
        } else {
          this.setDataValue('name', val);
        }
      }
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

    parentId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: null
    },

    sRegionTypeId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: null
    }

  }, {
    tableName: 's_regions',
    modelName: 'sRegion',
    timestamps: true
  });
  schema.associate = (models) => {
    // associations can be defined here
    schema.belongsTo(models.sRegionType, {
      foreignKey: 'sRegionTypeId'
    });
  };

  return schema;
};
