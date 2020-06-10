module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('sBolezn', {

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
    tableName: 's_bolezni',
    modelName: 'sBolezn',
    timestamps: true
  });

  schema.associate = (models) => {
    // associations can be defined here
  };

  return schema;
};
