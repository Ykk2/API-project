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
        startDate: new Date('2023-01-25'),
        endDate: new Date('2023-01-27')
      },
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('2023-02-01'),
        endDate: new Date('2023-02-09')
      },
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('2023-02-12'),
        endDate: new Date('2023-02-15')
      },
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('2023-02-18'),
        endDate: new Date('2023-02-21')
      },
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('2023-03-01'),
        endDate: new Date('2023-03-20')
      },
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('2023-03-22'),
        endDate: new Date('2023-03-24')
      },
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('2023-03-26'),
        endDate: new Date('2023-03-29')
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    return queryInterface.bulkDelete(options)
  }
};
