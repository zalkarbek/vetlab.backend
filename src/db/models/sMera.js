module.exports = (sequelize, DataTypes) => {
  const sMera = sequelize.define('sMera', {
    shortName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(300),
      allowNull: true
    },

  }, {
    tableName: 's_mera',
    modelName: 'sMera',
    timestamps: true
  });
  sMera.associate = (models) => {
    // associations can be defined here
  };

  return sMera;
};
