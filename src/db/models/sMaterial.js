module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('sMaterial', {
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

    sMaterialTypeId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    sMaterialAnimalTypeId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    sMaterialColor: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null
    },

  }, {
    tableName: 's_materialy',
    modelName: 'sMaterial',
    timestamps: true
  });

  schema.associate = (models) => {
    // associations can be defined here
    schema.belongsTo(models.sMaterialType, {
      foreignKey: 'sMaterialTypeId'
    });

    schema.belongsTo(models.sMaterialAnimalType, {
      foreignKey: 'sMaterialAnimalTypeId'
    });

  };

  return schema;
};
