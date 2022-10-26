'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {

    static associate(models) {
      Booking.belongsTo(models.User, {foreignKey: 'userId'})
      Booking.belongsTo(models.Spot, {foreignKey: 'spotId'})
    }
  }
  Booking.init({

    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    userID:
    {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

  }, {
    defaultScope: {attributes: {exclude: ['createdAt', 'updatedAt']}},
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
