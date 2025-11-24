'use strict';

const {v4:uuidv4} = require("uuid");
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

   await queryInterface.bulkInsert('Admin', [
    {
      id: uuidv4(),
      nama_lengkap: "Zanuar Rikza Aditiya",
      email: 'zanuar@example.com',
      password: await bcrypt.hash("zanuar2401", 10),
      role: "super admin",
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Admin', null, {});
  }
};
