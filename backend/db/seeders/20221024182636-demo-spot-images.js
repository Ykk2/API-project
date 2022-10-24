'use strict';

const { urlencoded } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('spotImages', [
      {
        spotId: 1,
        url: "this is the url for spot 1",
        preview: true
      },
      {
        spotId: 2,
        url: "this is the url for spot 2",
        preview: true
      },
      {
        spotId: 3,
        url: "this is the url for spot 3",
        preview: true
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('spotImages', {
      spotId: { [Op.in]: [1, 2, 3]}
    }, {})
  }
};
