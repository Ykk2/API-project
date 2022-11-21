'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('2023-01-01'),
        endDate: new Date('2024-01-01')
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date('2023-02-02'),
        endDate: new Date('2024-02-02')
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bookings', {
      spotId: { [Op.in]: [1, 2] }
    }, {})
  }
};
