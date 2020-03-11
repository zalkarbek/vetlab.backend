module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('fileStorage', {

    link: {
      type: DataTypes.STRING(600),
      allowNull: true,
      defaultValue: null
    },

    name: {
      type: DataTypes.STRING(300),
      allowNull: false,
      defaultValue: null
    },

  }, {
    tableName: 'file_storage',
    modelName: 'fileStorage',
    timestamps: true
  });

  schema.associate = (models) => {

    schema.hasMany(models.personal, {
      foreignKey: 'imgFileId'
    });

  };

  return schema;
};
