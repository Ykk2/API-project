'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    return queryInterface.bulkInsert(options, [
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
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    return queryInterface.bulkDelete(options)
  }
};
