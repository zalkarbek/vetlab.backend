module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('roles', {

    role_i18n: {
      type: DataTypes.STRING(255),
      allowNull: true
    },

    role_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
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
    modelName: 'roles',
    timestamps: false
  });

  schema.associate = (models) => {
    // -- associations can be defined here
  };

  return schema;
};
