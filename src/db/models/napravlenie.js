module.exports = (sequelize, DataTypes) => {
  const napravlenie = sequelize.define('napravlenie', {
    name: {
      type: DataTypes.STRING(255),
      defaultValue: null,
      allowNull: true
    }
  }, {
    tableName: 'napravlenie',
    modelName: 'napravlenie',
    timestamps: true
  });
  napravlenie.associate = (models) => {
    // associations can be defined here
  };

  return napravlenie;
};
