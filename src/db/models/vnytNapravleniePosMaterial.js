module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('vnytNapravleniePosMaterial', {

    vnytNapravlenieId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    posMaterialId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

  }, {
    tableName: 'vnyt_napravlenie_pos_material',
    modelName: 'vnytNapravleniePosMaterial',
    timestamps: true
  });

  schema.associate = (models) => {
    // -- associations can be defined here
  };

  return schema;
};
