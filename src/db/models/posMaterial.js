module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('posMaterial', {

    napravlenieId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    opPokazatelId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    ownerJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },

    mestoOtboraSRegionId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    kemOtobranJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },

    lechenieInfo: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null
    },

    sMaterialId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    materialCount: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    sMeraId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    vozrast: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },

    dateZabolivanie: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },

    dateZaboya: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },

    dateOtbora: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },

    dateDostavki: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },


  }, {
    tableName: 'pos_materialy',
    modelName: 'posMaterial',
    timestamps: true
  });

  schema.associate = (models) => {
    // associations can be defined here
    schema.belongsTo(models.napravlenie, {
      foreignKey: 'napravlenieId'
    });

    schema.belongsTo(models.sPokazately, {
      foreignKey: 'opPokazatelId'
    });

    schema.belongsTo(models.sRegions, {
      foreignKey: 'mestoOtboraSRegionId'
    });

    schema.belongsTo(models.sMaterialy, {
      foreignKey: 'sMaterialId'
    });

    schema.belongsTo(models.sMera, {
      foreignKey: 'sMeraId'
    });
  };

  return schema;
};