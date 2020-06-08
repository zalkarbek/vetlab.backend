module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('sMaterialAnimalType', {

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

    sMaterialAnimalClassId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    }

  }, {
    tableName: 's_material_animal_type',
    modelName: 'sMaterialAnimalType',
    timestamps: true
  });
  schema.associate = (models) => {
    // associations can be defined here
    schema.belongsTo(models.sMaterialAnimalClass, {
      foreignKey: 'sMaterialAnimalClassId'
    });

    schema.hasMany(models.sMaterial, {
      foreignKey: 'sMaterialAnimalTypeId'
    });
  };

  return schema;
};
