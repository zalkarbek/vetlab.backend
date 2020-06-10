module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('sMetod', {

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
        if(val) {
          this.setDataValue('shortName', val.trim());
        } else {
          this.setDataValue('shortName', val);
        }
      }
    },

    name: {
      type: DataTypes.STRING(300),
      allowNull: false,
      defaultValue: null,
      set(val) {
        if(val) {
          this.setDataValue('name', val.trim());
        } else {
          this.setDataValue('name', val);
        }
      }
    },

    gosStandard: {
      type: DataTypes.STRING(300),
      allowNull: true,
      defaultValue: null
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
    tableName: 's_metod_isledovanie',
    modelName: 'sMetod',
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
