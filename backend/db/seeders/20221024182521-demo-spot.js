'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '111 ABC road',
        city: 'City 1',
        state: 'State 1',
        country: 'Country 1',
        lat: 11.123123,
        lng: -11.123123,
        name: 'Demo Spot 1',
        description: 'First Demo Spot',
        price: 111.11,
      },
      {
        ownerId: 2,
        address: '222 ABC road',
        city: 'City 2',
        state: 'State 2',
        country: 'Country 2',
        lat: 22.123123,
        lng: -22.123123,
        name: 'Demo Spot 2',
        description: 'Second Demo Spot',
        price: 222.22,
      },
      {
        ownerId: 3,
        address: '333 ABC road',
        city: 'City 3',
        state: 'State 3',
        country: 'Country 3',
        lat: 33.123123,
        lng: -33.123123,
        name: 'Demo Spot 3',
        description: 'Third Demo Spot',
        price: 333.33,
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
   const Op = Sequelize.Op;
   return queryInterface.bulkDelete('Users', {
    name: { [Op.in]: ['Demo Spot 1', 'Demo Spot 2', 'Demo Spot 3']}
   }, {})
  }
};
