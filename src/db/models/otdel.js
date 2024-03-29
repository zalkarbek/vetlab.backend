module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('otdel', {
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

    departmentId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    sOtdeleniaId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    headPersonalId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    otdelDataJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },

    nonSpecOtdel: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      set(val) {
        if(val) {
          this.setDataValue('nonSpecOtdel', val);
        } else {
          this.setDataValue('nonSpecOtdel', 0);
        }
      }
    }

  }, {
    tableName: 'otdely',
    modelName: 'otdel',
    timestamps: true
  });

  schema.associate = (models) => {
    // associations can be defined here
    schema.belongsTo(models.department, {
      foreignKey: 'departmentId'
    });

    schema.belongsTo(models.sOtdelenia, {
      foreignKey: 'sOtdeleniaId',
      as: 'sOtdelenia'
    });

    schema.belongsTo(models.personal, {
      foreignKey: 'headPersonalId',
      as: 'headPersonal'
    });

    schema.hasMany(models.subOtdel, {
      foreignKey: 'otdelId'
    });

    schema.hasMany(models.personal, {
      foreignKey: 'otdelId'
    });

    schema.hasMany(models.napravlenie, {
      foreignKey: 'otdelId'
    });

    schema.hasMany(models.isledovanie, {
      foreignKey: 'isOtdelId'
    });
  };

  return schema;
};
