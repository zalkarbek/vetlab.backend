const _ = require('lodash');
module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('sMera', {
    i18n: {
      type: DataTypes.STRING(300),
      allowNull: true,
      defaultValue: null,
      set(val) {
        this.setDataValue('i18n', val && _.toLower(val));
      }
    },

    shortName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      set(val) {
        this.setDataValue('shortName', _.toLower(val));
      }
    },

    name: {
      type: DataTypes.STRING(300),
      allowNull: false,
      defaultValue: null,
      set(val) {
        this.setDataValue('name', _.toLower(val));
      }
    },

  }, {
    tableName: 's_mera',
    modelName: 'sMera',
    timestamps: true
  });

  schema.associate = (models) => {
    // associations can be defined here
    schema.hasMany(models.posMaterial, {
      foreignKey: 'sMeraId'
    });
  };

  return schema;
};
