

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    password: {
      type:DataTypes.STRING(600),
      allowNull: false
    },
    tokenId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    lock: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    tableName: 'user',
    modelName: 'user',
    timestamps: true
  });
  user.associate = (models) => {
    // associations can be defined here
  };

  return user;
};
