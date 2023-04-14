'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, { foreignKey: 'userId' });
      Booking.belongsTo(models.Spot, { foreignKey: 'spotId' });
    }

    // method to retrieve bookings with other data for trips page
    static async findAllCurrentBookingsByUserId(userId) {
      return this.findAll({
        where: { userId },
        include: [{
          model: sequelize.models.Spot,
          include: [{
            model: sequelize.models.SpotImage,
            where: { preview: true },
            attributes: ['url'],
            required: true,
          }],
        }],
      });
    }
  }

  Booking.init({

    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId:
    {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      }
    },

  }, {
    // defaultScope: {attributes: {exclude: ['createdAt', 'updatedAt']}},
    sequelize,
    modelName: 'Booking',
  });

  return Booking;
};
