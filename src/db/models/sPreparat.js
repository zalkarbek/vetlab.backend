module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('sPreparat', {

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
    tableName: 's_preparat',
    modelName: 'sPreparat',
    timestamps: true
  });
  schema.associate = (models) => {
    // associations can be defined here
  };

  return schema;
};
