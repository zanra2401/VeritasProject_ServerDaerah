'use strict';

const Fs = require("fs");
const csvReader = require('csv-reader');
const { v4: uuidv4} = require("uuid");
let inputStream = Fs.createReadStream('metaCSV.csv', 'utf-8');  

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
    let data = [];

    await inputStream.pipe(new csvReader({
      parseNumbers: true,
      parseBooleans: true,
      trim: true,
      skipLines: 1
    })).on("data", row => {
        data.push({
            nama_hakim: row[10].split(" ").slice(2, row[10].split(" ").length).join(" ").trim()
        });

        const hakimAnggota = row[11].split(",");

        hakimAnggota.forEach(element => {
            data.push({
                nama_hakim: element.split(" ").slice(2, element.split(" ").length).join(" ").trim()
            })
        });

    }).on("end", () => {
        let data = [...new Map(data.map(item => [item.nama_hakim, {
            id: uuidv4(),
            nama_hakim: item.nama_hakim,
            created_at: new Date(),
            updated_at: new Date()
        }])).values()]
    });



    await queryInterface.bulkInsert('hakim', data, {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('hakim', null, {});
  }
};
