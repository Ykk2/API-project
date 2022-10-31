'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn('Users', 'firstName', {
      type: DataTypes.STRING
    })
    await queryInterface.addColumn('Users', 'lastName', {
      type: DataTypes.STRING
    })
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn('Users', 'firstName')
    await queryInterface.removeColumn('Users', 'lastName')
  }
};
