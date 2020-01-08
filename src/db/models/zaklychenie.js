module.exports = (sequelize, DataTypes) => {
  const zaklychenie = sequelize.define('zaklychenie', {
    name: {
      type: DataTypes.STRING(255),
      defaultValue: null,
      allowNull: true
    }
  }, {
    tableName: 'zaklychenie',
    modelName: 'zaklychenie',
    timestamps: true
  });
  zaklychenie.associate = (models) => {
    // associations can be defined here
  };

  return zaklychenie;
};
