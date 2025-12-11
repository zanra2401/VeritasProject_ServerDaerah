'use strict';

const csvReader = require("csv-reader");
const fs = require("fs");
const { v4: uuidv4, v5: uuidv5 } = require("uuid");
const helper = require("./module/helper.js");

const inputStreamPath = __dirname + "/metaPidanaUmum.csv";

// Namespace untuk UUID v5 agar konsisten dengan ServerPusat
const PUTUSAN_NAMESPACE = "6f42f5f2-7d4c-4a9c-b3d0-91f4b3c2e9aa";

const uuidFromNomor = (nomor) => uuidv5((nomor || "").trim().toLowerCase(), PUTUSAN_NAMESPACE);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const dataPutusan = [];
    const dataPanitera = new Map();
    const dataPutusanHakim = [];
    const dataKataKunci = new Map();
    const dataTerdakwaPutusan = [];
    const dataTerdakwa = new Map();
    const dataPenuntutUmum = new Map();
    const dataHakim = new Map();

    await new Promise((resolve, reject) => {
      const inputStream = fs.createReadStream(inputStreamPath, "utf-8");

      inputStream
        .pipe(
          new csvReader({
            parseNumbers: true,
            parseBooleans: true,
            trim: true,
            skipLines: 1,
          })
        )
        .on("data", (item) => {
          try {
            const namaHakim = item[10]?.split(" ").slice(2).join(" ").trim().toLowerCase();
            const namaPenuntut = item[1]?.replace(/"/g, "").trim().toLowerCase();
            const namaPanitera = item[12]?.replace(/"/g, "").trim().toLowerCase();
            const kataKunci = item[5]?.trim().toLowerCase();
            const klasifikasi = item[4]?.trim().toLowerCase();

            // Gunakan UUID deterministik berbasis nomor putusan supaya id sama dengan ServerPusat
            const putusanId = uuidFromNomor(item[2]);
            const penuntutId = dataPenuntutUmum.get(namaPenuntut)?.id || uuidv4();
            const hakimId = dataHakim.get(namaHakim)?.id || uuidv4();
            const paniteraId = dataPanitera.get(namaPanitera)?.id || uuidv4();
            const kataKunciId = dataKataKunci.get(kataKunci)?.id || uuidv4();

            helper.appendHakimKetua(dataHakim, hakimId, item);
            helper.appendKataKunci(dataKataKunci, kataKunciId, item);
            helper.appendPanitera(dataPanitera, paniteraId, item);
            helper.appendPenuntutUmum(dataPenuntutUmum, penuntutId, item);
            helper.appendPutusan(
              dataPutusan,
              item,
              putusanId,
              hakimId,
              paniteraId,
              penuntutId,
              kataKunciId,
              klasifikasi
            );
            helper.appendTerdakwa(dataTerdakwa, dataTerdakwaPutusan, putusanId, item);
            helper.appendHakimAnggota(
              dataHakim,
              dataPutusanHakim,
              putusanId,
              item
            );
          } catch (err) {
            console.error("Error parsing row:", err);
          }
        })
        .on("end", async () => {
          try {
            console.log("CSV dibaca, mulai insert data...");
            console.log(dataKataKunci);
            const dataHakimArr = Array.from(dataHakim.values());
            const dataKataKunciArr = Array.from(dataKataKunci.values());
            const dataPaniteraArr = Array.from(dataPanitera.values());
            const dataPenuntutUmumArr = Array.from(dataPenuntutUmum.values());
            const dataTerdakwaArr = Array.from(dataTerdakwa.values());

            await queryInterface.bulkInsert("Hakim", dataHakimArr);
            console.log("Hakim inserted");

            await queryInterface.bulkInsert("KataKunci", dataKataKunciArr);
            console.log("Kata Kunci inserted");

            await queryInterface.bulkInsert("Panitera", dataPaniteraArr);
            console.log("Panitera inserted");

            await queryInterface.bulkInsert("Terdakwa", dataTerdakwaArr);
            console.log("Terdakwa inserted");

            await queryInterface.bulkInsert("PenuntutUmum", dataPenuntutUmumArr);
            console.log("Penuntut Umum inserted");

            await queryInterface.bulkInsert("Putusan", dataPutusan);
            console.log("Putusan inserted");

            await queryInterface.bulkInsert("PutusanHakim", dataPutusanHakim);
            console.log("PutusanHakim inserted");

            await queryInterface.bulkInsert("PutusanTerdakwa", dataTerdakwaPutusan);
            console.log("PutusanTerdakwa inserted");

            console.log("Semua data berhasil diinsert!");
            resolve();
          } catch (err) {
            console.error("❌ Error saat insert ke database:", err);
            reject(err);
          }
        })
        .on("error", (err) => {
          console.error("❌ Error saat membaca CSV:", err);
          reject(err);
        });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TerdakwaPutusan", null, {});
    await queryInterface.bulkDelete("PutusanHakim", null, {});
    await queryInterface.bulkDelete("Putusan", null, {});
    await queryInterface.bulkDelete("PenuntutUmum", null, {});
    await queryInterface.bulkDelete("Terdakwa", null, {});
    await queryInterface.bulkDelete("Panitera", null, {});
    await queryInterface.bulkDelete("Hakim", null, {});
  },
};
