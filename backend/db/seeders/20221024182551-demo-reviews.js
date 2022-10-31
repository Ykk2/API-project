'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 2,
        review: 'Review for spot 1 by user 2',
        stars: 1
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Review for spot 2 by user 3',
        stars: 2
      },
      {
        spotId: 3,
        userId: 1,
        review: 'Review for spot 3 by user 1',
        stars: 3
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      spotId: { [Op.in]: [1, 2, 3]}
    }, {})
  }
};
