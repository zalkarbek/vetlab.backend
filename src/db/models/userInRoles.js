module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('userInRoles', {

    user_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    role_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

  }, {
    tableName: 'user_in_roles',
    modelName: 'userInRoles',
    timestamps: true
  });

  schema.associate = (models) => {
    // -- associations can be defined here
  };

  return schema;
};
