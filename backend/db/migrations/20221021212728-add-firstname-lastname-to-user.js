'use strict';

let options = {};
options.tableName = 'Users';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn(options, 'firstName', {
      type: DataTypes.STRING
    })
    await queryInterface.addColumn(options, 'lastName', {
      type: DataTypes.STRING
    },)
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn(options, 'firstName')
    await queryInterface.removeColumn(options, 'lastName')
  }
};
