module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('isledovanie', {

    vnytNapravlenieId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    otdelId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    subOtdelId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    provelIsPersonalId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    isMaterialCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },

    positiveCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },

    metodId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    opPokazatelId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    dateStart: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },

    dateFinish: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },

    status: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },

  }, {
    tableName: 'isledovanie',
    modelName: 'isledovanie',
    timestamps: true
  });
  schema.associate = (models) => {
    // associations can be defined here
    schema.belongsTo(models.vnytNapravlenie, {
      foreignKey: 'vnytNapravlenieId'
    });

    schema.belongsTo(models.otdel, {
      foreignKey: 'otdelId'
    });

    schema.belongsTo(models.subOtdel, {
      foreignKey: 'subOtdelId'
    });

    schema.belongsTo(models.personal, {
      foreignKey: 'provelIsPersonalId'
    });

    schema.belongsTo(models.sMetod, {
      foreignKey: 'metodId'
    });

    schema.belongsTo(models.sPokazatel, {
      foreignKey: 'opPokazatelId'
    });

    schema.hasMany(models.protocol, {
      foreignKey: 'isledovanieId'
    });

  };

  return schema;
};
