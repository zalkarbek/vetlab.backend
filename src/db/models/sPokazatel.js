module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('sPokazatel', {

    i18n: {
      type: DataTypes.STRING(300),
      allowNull: true,
      defaultValue: null
    },

    shortName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      set(val) {
        this.setDataValue('shortName', val.trim());
      }
    },

    name: {
      type: DataTypes.STRING(300),
      allowNull: false,
      defaultValue: null,
      set(val) {
        this.setDataValue('name', val.trim());
      }
    },

    pokazatel: {
      type: DataTypes.STRING(300),
      allowNull: true,
      defaultValue: null,
      set(val) {
        this.setDataValue('pokazatel', val.trim());
      }
    },

    sOtdeleniaId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null
    }

  }, {
    tableName: 's_pokazately',
    modelName: 'sPokazatel',
    timestamps: true
  });

  schema.associate = (models) => {
    // associations can be defined here
    schema.belongsTo(models.sOtdelenia, {
      foreignKey: 'sOtdeleniaId',
      as: 'sOtdelenia'
    });
  };

  return schema;
};
