module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('subOtdel', {

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
      allowNull: true,
      defaultValue: null,
      set(val) {
        this.setDataValue('name', val.trim());
      }
    },

    otdelId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    sOtdeleniaId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    }

  }, {
    tableName: 'sub_otdely',
    modelName: 'subOtdel',
    timestamps: true
  });
  schema.associate = (models) => {
    // associations can be defined here
    schema.belongsTo(models.otdel, {
      foreignKey: 'otdelId'
    });

    schema.belongsTo(models.sOtdelenia, {
      foreignKey: 'sOtdeleniaId'
    });

    schema.hasMany(models.personal, {
      foreignKey: 'subOtdelId'
    });

    schema.hasMany(models.isledovanie, {
      foreignKey: 'isSubOtdelId'
    });
  };

  return schema;
};
