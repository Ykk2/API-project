'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('reviewImages', [
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
    ], {})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('reviewimages', {
      reviewId: {[Op.in]: [1, 2, 3]}
    }, {})
  }
};
