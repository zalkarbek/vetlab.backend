module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define('viewRegionFullPathKg', {
    regionFullPath: {
      type: DataTypes.STRING(900),
      defaultValue: null,
      allowNull: true
    },

    regionIds: {
      type: DataTypes.STRING(900),
      allowNull: false,
      defaultValue: null,
      get() {
        const ids = this.getDataValue('regionIds');
        if(ids && ids.length) {
          const idsArray = ids.split(',');
          return idsArray.map((regionId) => {
            return Number(regionId);
          });
        }
        return [];
      }
    },

    regionTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null
    },

    regionTypeName: {
      type: DataTypes.STRING(900),
      allowNull: false,
      defaultValue: null
    },

  }, {
    tableName: 'view_regions_full_path_kg',
    modelName: 'viewRegionFullPathKg',
    timestamps: false
  });
  schema.associate = (models) => {
    // associations can be defined here
  };

  return schema;
};
