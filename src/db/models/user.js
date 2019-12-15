

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING(300),
    email: DataTypes.STRING(300),
    password: DataTypes.STRING(600),
    tokenId: DataTypes.TEXT,
    active: DataTypes.BOOLEAN,
    lock: DataTypes.BOOLEAN
  }, {
    tableName: 'user'
  });
  User.associate = (models) => {
    // associations can be defined here
  };

  return User;
};
