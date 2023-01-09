'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages'
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'url for reviewimage 1'
      },
      {
        reviewId: 2,
        url: 'url for reviewimage 2'
      },
      {
        reviewId: 3,
        url: 'url for reviewimage 3'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages'
    return queryInterface.bulkDelete(options)
  }
};
