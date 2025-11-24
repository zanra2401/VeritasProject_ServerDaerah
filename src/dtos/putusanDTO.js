
module.exports = {
    putusanDTO: (putusan) => {
        const {
            id,
            nomor,
            tingkat_proses,
            klasifikasi,
            hakim_ketua,
            panitera,
            penuntut_umum,
            kata_kunci,
            tanggal_putusan,
            tahun,
            tanggal_musyawarah,
            tanggal_upload,
            updated_at,
            created_at,
            amar_putusan,
            amar_lainya,
            catatan_amar,
            url_dokumen
        } = putusan;

        return {
            id,
            nomor,
            tingkat_proses,
            klasifikasi,
            hakim_ketua,
            panitera,
            penuntut_umum,
            kata_kunci,
            tanggal_putusan,
            tahun,
            tanggal_musyawarah,
            tanggal_upload,
            updated_at,
            created_at,
            amar_putusan,
            amar_lainya,
            catatan_amar,
            url_dokumen
        };
    }
}