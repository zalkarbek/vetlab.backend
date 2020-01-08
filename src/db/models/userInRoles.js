module.exports = (sequelize, DataTypes) => {
  const userInRoles = sequelize.define('userInRoles', {
    role_i18n: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'user_in_roles',
    modelName: 'userInRoles',
    timestamps: false
  });
  userInRoles.associate = (models) => {
    // associations can be defined here
  };

  return userInRoles;
};
