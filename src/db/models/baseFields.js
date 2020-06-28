module.exports = (DataTypes) => {
  return {
    shortName: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null
    }
  };
};
