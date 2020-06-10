module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('posMaterial', {

    napravlenieId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    opPokazatelJSON: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: null
    },

    sMaterialJSON: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: null
    },

    ownerJSON: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },

    mestoOtboraRegionJSON: {
      type: DataTypes.JSON,
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

    materialCount: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
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

    dateVremyaOtbora: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },

    dateDostavki: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null
    }


  }, {
    tableName: 'pos_materialy',
    modelName: 'posMaterial',
    timestamps: true
  });

  schema.associate = (models) => {
    schema.belongsToMany(models.vnytNapravlenie, {
      through: 'vnytNapravlenie_posMaterial',
      foreignKey: 'posMaterialId',
      otherKey: 'vnytNapravlenieId'
    });

    // associations can be defined here
    schema.belongsTo(models.napravlenie, {
      foreignKey: 'napravlenieId'
    });

    schema.belongsTo(models.sMera, {
      foreignKey: 'sMeraId'
    });

    // schema.hasMany(models.vnytNapravlenie, {
    //   foreignKey: 'posMaterialId'
    // });
  };

  return schema;
};
