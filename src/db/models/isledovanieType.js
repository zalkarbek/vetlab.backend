module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('isledovanieType', {

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

    key: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },


  }, {
    tableName: 'isledovanie_types',
    modelName: 'isledovanieType',
    timestamps: true
  });

  schema.associate = (models) => {
    // associations can be defined here
  };

  return schema;
};
