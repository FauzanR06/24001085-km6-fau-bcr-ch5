"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class manufacture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      manufacture.hasMany(models.car, { foreignKey: "manufacture_id" });
    }
  }
  manufacture.init(
    {
      name: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "manufacture",
      paranoid: true,
    }
  );
  return manufacture;
};
