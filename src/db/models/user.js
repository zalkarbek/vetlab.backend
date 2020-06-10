module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('user', {

    email: {
      type: DataTypes.STRING(300),
      allowNull: false
    },

    name: {
      type: DataTypes.STRING(300),
      allowNull: true
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

  schema.associate = (models) => {
    // associations can be defined here
    schema.belongsToMany(models.role, {
      through: 'user_in_roles',
      foreignKey: 'user_id',
      otherKey: 'role_id'
    });

    schema.hasOne(models.personal, {
      foreignKey: 'userId'
    });
  };

  return schema;
};
