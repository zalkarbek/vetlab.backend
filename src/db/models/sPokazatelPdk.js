module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('sPokazatelPdk', {

    sPokazatelId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: null
    },

    pdkJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },

    pdkType: {
      type: DataTypes.STRING(300),
      allowNull: true,
      defaultValue: null
    },

    pdkMera: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },

    materialTypeJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },

    sMaterialAnimalTypeJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },

    materialJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null
    },

  }, {
    tableName: 's_pokazatel_pdk',
    modelName: 'sPokazatelPdk',
    timestamps: true
  });

  schema.associate = (models) => {
    // associations can be defined here
    schema.belongsTo(models.sPokazatel, {
      foreignKey: 'sPokazatelId',
      as: 'sPokazatel'
    });
  };

  return schema;
};
