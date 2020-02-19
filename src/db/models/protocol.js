module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('protocol', {

    vnytNapravlenieId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    isledovanieId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    protocolPersonalId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },

    protocolDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    }

  }, {
    tableName: 'protocol_isledovanie',
    modelName: 'protocol',
    timestamps: true
  });

  schema.associate = (models) => {
    // associations can be defined here
    schema.belongsTo(models.vnytNapravlenie, {
      foreignKey: 'vnytNapravlenieId'
    });

    schema.belongsTo(models.isledovanie, {
      foreignKey: 'isledovanieId'
    });

    schema.belongsTo(models.personal, {
      foreignKey: 'protocolPersonalId'
    });

  };

  return schema;
};
