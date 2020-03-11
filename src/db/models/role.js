module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('role', {

    role_i18n: {
      type: DataTypes.STRING(255),
      allowNull: true
    },

    role_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    role_key: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },

    role_desc: {
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
    },

    priority: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {
    tableName: 'roles',
    modelName: 'role',
    timestamps: true
  });

  schema.associate = (models) => {
    // -- associations can be defined here
    schema.belongsToMany(models.user, {
      through: 'user_in_roles',
      foreignKey: 'role_id',
      otherKey: 'user_id'
    });
  };

  return schema;
};
