'use strict';

const { v4: uuidv4 } = require("uuid");

module.exports = {
  appendPutusan: (data, row, id, id_hakim_ketua, id_panitera, id_penuntut_umum, id_kata_kunci, id_klasifikasi) => {
    const parseTanggal = (str) => {
      if (!str) return null;
      const bulanMap = {
        Januari: 0, Februari: 1, Maret: 2, April: 3, Mei: 4, Juni: 5,
        Juli: 6, Agustus: 7, September: 8, Oktober: 9, November: 10, Desember: 11,
      };
      const match = str.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
      if (!match) return null;

      const [_, tgl, bulanNama, tahun] = match;
      const bulan = bulanMap[bulanNama];
      if (bulan === undefined) return null;

      return new Date(tahun, bulan, tgl);
    };

    const data_putusan = {
      id,
      nomor: row[2],
      tingkat_proses: row[3],
      id_klasifikasi: id_klasifikasi,
      id_kata_kunci: id_kata_kunci,
      tanggal_musyawarah: parseTanggal(row[16]),
      tahun: row[6],
      tanggal_putusan: parseTanggal(row[17]),
      tanggal_upload: new Date(),
      catatan_amar: row[15],
      amar_lainya: row[14],
      amar_putusan: row[13],
      url_dokumen: row[20],
      id_panitera,
      id_penuntut_umum,
      id_hakim_ketua,
      lembaga_id: "PN-BJN",
      created_at: new Date(),
      updated_at: new Date()
    };

    data.push(data_putusan);
    return data_putusan;
  },

  appendPanitera: (dataPanitera, id_panitera, row) => {
    const namaPanitera = row[12]?.replace(/"/g, "").trim().toLowerCase();
    if (!namaPanitera) return;

    if (!dataPanitera.has(namaPanitera)) {
      dataPanitera.set(namaPanitera, {
        id: id_panitera,
        nama: row[12]?.replace("Panitera Pengganti", "").replace(":", "").replace(/"/g, "").trim() || null,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
  },

  appendHakimKetua: (dataHakim, id_hakim, row) => {
    const namaHakim = row[10]
      ?.split(" ")
      .slice(2)
      .join(" ")
      .trim()
      .toLowerCase();

    if (!namaHakim) return;

    if (!dataHakim.has(namaHakim)) {
      dataHakim.set(namaHakim, {
        id: id_hakim,
        nama: row[10]?.split(" ").slice(2).join(" ").trim() || null,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
  },

  appendHakimAnggota: (dataHakim, dataPutusanHakim, id_putusan, row) => {
    const hakimAnggota = (row[11] || "").split(",");

    hakimAnggota.forEach((element) => {
      const namaHakim = element
        .replace("Br", "")
        .replace("Hakim Anggota")
        .trim()
        .split(" ")
        .slice(2)
        .join(" ")
        .trim()
        .toLowerCase();

      if (!namaHakim) return;

      let anggotaId = uuidv4();
      if (dataHakim.has(namaHakim)) {
        anggotaId = dataHakim.get(namaHakim).id;
      } else {
        dataHakim.set(namaHakim, {
          id: anggotaId,
          nama: namaHakim,
          created_at: new Date(),
          updated_at: new Date()
        });
      }

      module.exports.appendPutusanHakim(dataPutusanHakim, anggotaId, id_putusan);
    });
  },

  appendTerdakwa: (dataTerdakwa, dataPutusanTerdakwa, id_putusan, row) => {
    const namaList = row[0]
      ?.replace(/\d\.?/gm, ",")
      .split(",")
      .filter((item) => item.length)
      .map((item) => item.trim());

    namaList.forEach((nama) => {
      const key = nama.toLowerCase();
      let terdakwaId = uuidv4();

      if (dataTerdakwa.has(key)) {
        terdakwaId = dataTerdakwa.get(key).id;
      } else {
        dataTerdakwa.set(key, {
          id: terdakwaId,
          nama: nama || null,
          created_at: new Date(),
          updated_at: new Date()
        });
      }

      module.exports.appendPutusanTerdakwa(dataPutusanTerdakwa, terdakwaId, id_putusan);
    });
  },

  appendPenuntutUmum: (dataPenuntutUmum, id_penuntut_umum, row) => {
    const namaPenuntut = row[1]?.replace(/"/g, "").trim().toLowerCase();
    if (!namaPenuntut) return;

    if (!dataPenuntutUmum.has(namaPenuntut)) {
      dataPenuntutUmum.set(namaPenuntut, {
        id: id_penuntut_umum,
        nama: row[1]?.replace(/"/g, "").trim() || null,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
  },

  appendPutusanHakim: (dataPutusanHakim, id_hakim_anggota, id_putusan) => {
    dataPutusanHakim.push({
      id_putusan,
      id_hakim: id_hakim_anggota,
      created_at: new Date(),
      updated_at: new Date()
    });
  },

  appendPutusanTerdakwa: (dataPutusanTerdakwa, id_terdakwa, id_putusan) => {
    dataPutusanTerdakwa.push({
      id_terdakwa,
      id_putusan,
      created_at: new Date(),
      updated_at: new Date()
    });
  },

  appendKataKunci: (dataKataKunci, id_kata_kunci, row) => {
    if (!dataKataKunci.has(row[5].trim().toLowerCase())) {
      dataKataKunci.set(row[5].trim().toLowerCase(), {
        id: id_kata_kunci,
        nama: row[5],
        created_at: new Date(),
        updated_at: new Date()
      })
    }
  },

  appendKlasifikasi: (dataKlasifikasi, id_klasifikasi, row) => {
    if (!dataKlasifikasi.has(row[4]?.trim().toLowerCase())) {
      dataKlasifikasi.set(row[4].trim().toLowerCase(), {
        id: id_klasifikasi,
        nama: row[4],
        created_at: new Date(),
        updated_at: new Date()
      });
    }
  }
};
