const express = require("express");
const authController = require(__dirname + "/../controllers/authController.js");
const terdakwaController = require(__dirname + "/../controllers/terdakwaController.js");
const hakimController = require(__dirname + "/../controllers/hakimController.js");
const paniteraController = require(__dirname + "/../controllers/paniteraController.js");
const penuntutUmumController = require(__dirname + "/../controllers/penuntutUmumController.js");
const putusanController = require(__dirname + "/../controllers/putusanController.js");
const kataKunciController = require(__dirname + "/../controllers/kataKunciController.js");
const klasifikasiController = require(__dirname + "/../controllers/klasifikasiController.js");
const authorizationMiddleware = require(__dirname + "/../middlewares/authorizationMiddleware.js");
const { uploadPutusan } = require(__dirname + "/../middlewares/uploadMiddleware.js");

const router = express.Router();

const url_start = `/api/v1/${process.env.LEMBAGA_ID}`;

// ==================== ADMIN/AUTH ROUTES ====================

/**
 * @route POST /admin/login
 * @description Login admin dengan email dan password
 * @param {string} email - Email admin
 * @param {string} password - Password admin
 * @returns {object} JWT token dan user info
 */
router.post(url_start + "/admin/login",
    authorizationMiddleware.apiKeyMiddleware, 
    authController.adminLogin);

/**
 * @route GET /admin
 * @description Retrieve all admin dengan pagination dan search
 * @query {number} page - Nomor halaman (default: 1)
 * @query {number} limit - Jumlah data per halaman (default: 10)
 * @query {string} search - Pencarian berdasarkan nama atau email
 * @requires JWT Token
 * @returns {object} List admin dengan pagination info
 */
router.get(url_start + "/admin",
    authorizationMiddleware.apiKeyMiddleware, 
    authorizationMiddleware.jwtMiddleware,
    authController.getAllAdmin);

/**
 * @route GET /admin/:id
 * @description Retrieve admin by ID
 * @param {string} id - Admin ID (UUID)
 * @requires JWT Token
 * @returns {object} Admin data
 */
router.get(url_start + "/admin/:id",
    authorizationMiddleware.apiKeyMiddleware, 
    authorizationMiddleware.jwtMiddleware,
    authController.getAdminById);

/**
 * @route POST /admin
 * @description Create new admin
 * @param {string} email - Email admin (unique)
 * @param {string} password - Password admin (akan di-hash)
 * @param {string} nama_lengkap - Nama lengkap admin
 * @param {string} role - Role admin (super admin / admin)
 * @requires JWT Token
 * @returns {object} Admin baru yang dibuat
 */
router.post(url_start + "/admin",
    authorizationMiddleware.apiKeyMiddleware, 
    authorizationMiddleware.jwtMiddleware,
    authController.createAdmin);

/**
 * @route PUT /admin/:id
 * @description Update admin data
 * @param {string} id - Admin ID (UUID)
 * @body {string} email - Email baru (optional)
 * @body {string} nama_lengkap - Nama baru (optional)
 * @body {string} role - Role baru (optional)
 * @body {string} password - Password baru (optional, akan di-hash)
 * @requires JWT Token
 * @returns {object} Admin data yang diupdate
 */
router.put(url_start + "/admin/:id",
    authorizationMiddleware.apiKeyMiddleware, 
    authorizationMiddleware.jwtMiddleware,
    authController.updateAdmin);

/**
 * @route DELETE /admin/:id
 * @description Delete admin by ID
 * @param {string} id - Admin ID (UUID)
 * @requires JWT Token
 * @returns {object} Success message
 */
router.delete(url_start + "/admin/:id",
    authorizationMiddleware.apiKeyMiddleware, 
    authorizationMiddleware.jwtMiddleware,
    authController.deleteAdmin);

// ==================== TERDAKWA ROUTES ====================

/**
 * @route GET /terdakwa
 * @description Retrieve all terdakwa dengan pagination dan search
 * @query {number} page - Nomor halaman (default: 1)
 * @query {number} limit - Jumlah data per halaman (default: 10)
 * @query {string} search - Pencarian berdasarkan nama
 * @returns {object} List terdakwa dengan pagination info
 */
router.get(url_start + "/terdakwa",
    authorizationMiddleware.apiKeyMiddleware,
    terdakwaController.getAllTerdakwa);

/**
 * @route GET /terdakwa/:id
 * @description Retrieve terdakwa by ID
 * @param {string} id - Terdakwa ID (UUID)
 * @returns {object} Terdakwa data
 */
router.get(url_start + "/terdakwa/:id",
    authorizationMiddleware.apiKeyMiddleware,
    terdakwaController.getTerdakwaById);

/**
 * @route POST /terdakwa
 * @description Create new terdakwa
 * @param {string} nama - Nama terdakwa
 * @requires JWT Token
 * @returns {object} Terdakwa baru yang dibuat
 */
router.post(url_start + "/terdakwa",
    authorizationMiddleware.apiKeyMiddleware,
    authorizationMiddleware.jwtMiddleware,
    terdakwaController.createTerdakwa);

/**
 * @route PUT /terdakwa/:id
 * @description Update terdakwa data
 * @param {string} id - Terdakwa ID (UUID)
 * @body {string} nama - Nama terdakwa baru
 * @requires JWT Token
 * @returns {object} Terdakwa data yang diupdate
 */
router.put(url_start + "/terdakwa/:id",
    authorizationMiddleware.apiKeyMiddleware,
    authorizationMiddleware.jwtMiddleware,
    terdakwaController.updateTerdakwa);

/**
 * @route DELETE /terdakwa/:id
 * @description Delete terdakwa by ID
 * @param {string} id - Terdakwa ID (UUID)
 * @requires JWT Token
 * @returns {object} Success message
 */
router.delete(url_start + "/terdakwa/:id",
    authorizationMiddleware.apiKeyMiddleware,
    authorizationMiddleware.jwtMiddleware,
    terdakwaController.deleteTerdakwa);

// ==================== HAKIM ROUTES ====================

/**
 * @route GET /hakim
 * @description Retrieve all hakim dengan pagination dan search
 * @query {number} page - Nomor halaman (default: 1)
 * @query {number} limit - Jumlah data per halaman (default: 10)
 * @query {string} search - Pencarian berdasarkan nama
 * @returns {object} List hakim dengan pagination info
 */
router.get(url_start + "/hakim",
    authorizationMiddleware.apiKeyMiddleware,
    hakimController.getAllHakim);

/**
 * @route GET /hakim/:id
 * @description Retrieve hakim by ID
 * @param {string} id - Hakim ID (UUID)
 * @returns {object} Hakim data
 */
router.get(url_start + "/hakim/:id",
    authorizationMiddleware.apiKeyMiddleware,
    hakimController.getHakimById);

/**
 * @route POST /hakim
 * @description Create new hakim
 * @param {string} nama - Nama hakim
 * @requires JWT Token
 * @returns {object} Hakim baru yang dibuat
 */
router.post(url_start + "/hakim",
    authorizationMiddleware.apiKeyMiddleware,
    authorizationMiddleware.jwtMiddleware,
    hakimController.createHakim);

/**
 * @route PUT /hakim/:id
 * @description Update hakim data
 * @param {string} id - Hakim ID (UUID)
 * @body {string} nama - Nama hakim baru
 * @requires JWT Token
 * @returns {object} Hakim data yang diupdate
 */
router.put(url_start + "/hakim/:id",
    authorizationMiddleware.apiKeyMiddleware,
    authorizationMiddleware.jwtMiddleware,
    hakimController.updateHakim);

/**
 * @route DELETE /hakim/:id
 * @description Delete hakim by ID
 * @param {string} id - Hakim ID (UUID)
 * @requires JWT Token
 * @returns {object} Success message
 */
router.delete(url_start + "/hakim/:id",
    authorizationMiddleware.apiKeyMiddleware,
    authorizationMiddleware.jwtMiddleware,
    hakimController.deleteHakim);

// ==================== PANITERA ROUTES ====================

/**
 * @route GET /panitera
 * @description Retrieve all panitera dengan pagination dan search
 * @query {number} page - Nomor halaman (default: 1)
 * @query {number} limit - Jumlah data per halaman (default: 10)
 * @query {string} search - Pencarian berdasarkan nama
 * @returns {object} List panitera dengan pagination info
 */
router.get(url_start + "/panitera",
    authorizationMiddleware.apiKeyMiddleware,
    paniteraController.getAllPanitera);

/**
 * @route GET /panitera/:id
 * @description Retrieve panitera by ID
 * @param {string} id - Panitera ID (UUID)
 * @returns {object} Panitera data
 */
router.get(url_start + "/panitera/:id",
    authorizationMiddleware.apiKeyMiddleware,
    paniteraController.getPaniteraById);

/**
 * @route POST /panitera
 * @description Create new panitera
 * @param {string} nama - Nama panitera
 * @requires JWT Token
 * @returns {object} Panitera baru yang dibuat
 */
router.post(url_start + "/panitera",
    authorizationMiddleware.apiKeyMiddleware,
    authorizationMiddleware.jwtMiddleware,
    paniteraController.createPanitera);

/**
 * @route PUT /panitera/:id
 * @description Update panitera data
 * @param {string} id - Panitera ID (UUID)
 * @body {string} nama - Nama panitera baru
 * @requires JWT Token
 * @returns {object} Panitera data yang diupdate
 */
router.put(url_start + "/panitera/:id",
    authorizationMiddleware.apiKeyMiddleware,
    authorizationMiddleware.jwtMiddleware,
    paniteraController.updatePanitera);

/**
 * @route DELETE /panitera/:id
 * @description Delete panitera by ID
 * @param {string} id - Panitera ID (UUID)
 * @requires JWT Token
 * @returns {object} Success message
 */
router.delete(url_start + "/panitera/:id",
    authorizationMiddleware.apiKeyMiddleware,
    authorizationMiddleware.jwtMiddleware,
    paniteraController.deletePanitera);

// ==================== PENUNTUT UMUM ROUTES ====================

/**
 * @route GET /penuntut-umum
 * @description Retrieve all penuntut umum dengan pagination dan search
 * @query {number} page - Nomor halaman (default: 1)
 * @query {number} limit - Jumlah data per halaman (default: 10)
 * @query {string} search - Pencarian berdasarkan nama
 * @returns {object} List penuntut umum dengan pagination info
 */
router.get(url_start + "/penuntut-umum",
    authorizationMiddleware.apiKeyMiddleware,
    penuntutUmumController.getAllPenuntutUmum);

/**
 * @route GET /penuntut-umum/:id
 * @description Retrieve penuntut umum by ID
 * @param {string} id - Penuntut Umum ID (UUID)
 * @returns {object} Penuntut Umum data
 */
router.get(url_start + "/penuntut-umum/:id",
    authorizationMiddleware.apiKeyMiddleware,
    penuntutUmumController.getPenuntutUmumById);

/**
 * @route POST /penuntut-umum
 * @description Create new penuntut umum
 * @param {string} nama - Nama penuntut umum
 * @requires JWT Token
 * @returns {object} Penuntut Umum baru yang dibuat
 */
router.post(url_start + "/penuntut-umum",
    authorizationMiddleware.apiKeyMiddleware,
    authorizationMiddleware.jwtMiddleware,
    penuntutUmumController.createPenuntutUmum);

/**
 * @route PUT /penuntut-umum/:id
 * @description Update penuntut umum data
 * @param {string} id - Penuntut Umum ID (UUID)
 * @body {string} nama - Nama penuntut umum baru
 * @requires JWT Token
 * @returns {object} Penuntut Umum data yang diupdate
 */
router.put(url_start + "/penuntut-umum/:id",
    authorizationMiddleware.apiKeyMiddleware,
    authorizationMiddleware.jwtMiddleware,
    penuntutUmumController.updatePenuntutUmum);

/**
 * @route DELETE /penuntut-umum/:id
 * @description Delete penuntut umum by ID
 * @param {string} id - Penuntut Umum ID (UUID)
 * @requires JWT Token
 * @returns {object} Success message
 */
router.delete(url_start + "/penuntut-umum/:id",
    authorizationMiddleware.apiKeyMiddleware,
    authorizationMiddleware.jwtMiddleware,
    penuntutUmumController.deletePenuntutUmum);

// ==================== KATA KUNCI ROUTES ====================

/**
 * @route GET /kata-kunci
 * @description Retrieve all kata kunci dengan pagination dan search
 * @query {number} page - Nomor halaman (default: 1)
 * @query {number} limit - Jumlah data per halaman (default: 10)
 * @query {string} search - Pencarian berdasarkan nama
 * @returns {object} List kata kunci dengan pagination info
 */
router.get(url_start + "/kata-kunci",
    authorizationMiddleware.apiKeyMiddleware,
    kataKunciController.getAllKataKunci);

/**
 * @route GET /kata-kunci/:id
 * @description Retrieve kata kunci by ID
 * @param {string} id - Kata Kunci ID (UUID)
 * @returns {object} Kata Kunci data
 */
router.get(url_start + "/kata-kunci/:id",
    authorizationMiddleware.apiKeyMiddleware,
    kataKunciController.getKataKunciById);

/**
 * @route POST /kata-kunci
 * @description Create new kata kunci
 * @param {string} nama - Nama kata kunci
 * @requires JWT Token
 * @returns {object} Kata Kunci baru yang dibuat
 */
router.post(url_start + "/kata-kunci",
    authorizationMiddleware.apiKeyMiddleware,
    authorizationMiddleware.jwtMiddleware,
    kataKunciController.createKataKunci);

/**
 * @route PUT /kata-kunci/:id
 * @description Update kata kunci data
 * @param {string} id - Kata Kunci ID (UUID)
 * @body {string} nama - Nama kata kunci baru
 * @requires JWT Token
 * @returns {object} Kata Kunci data yang diupdate
 */
router.put(url_start + "/kata-kunci/:id",
    authorizationMiddleware.apiKeyMiddleware,
    authorizationMiddleware.jwtMiddleware,
    kataKunciController.updateKataKunci);

/**
 * @route DELETE /kata-kunci/:id
 * @description Delete kata kunci by ID
 * @param {string} id - Kata Kunci ID (UUID)
 * @requires JWT Token
 * @returns {object} Success message
 */
router.delete(url_start + "/kata-kunci/:id",
    authorizationMiddleware.apiKeyMiddleware,
    authorizationMiddleware.jwtMiddleware,
    kataKunciController.deleteKataKunci);

// ==================== KLASIFIKASI ROUTES ====================

/**
 * @route GET /klasifikasi
 * @description Retrieve all klasifikasi dengan pagination dan search
 * @query {number} page - Nomor halaman (default: 1)
 * @query {number} limit - Jumlah data per halaman (default: 10)
 * @query {string} search - Pencarian berdasarkan nama
 * @returns {object} List klasifikasi dengan pagination info
 */
router.get(url_start + "/klasifikasi",
    authorizationMiddleware.apiKeyMiddleware,
    klasifikasiController.getAllKlasifikasi);

/**
 * @route GET /klasifikasi/:id
 * @description Retrieve klasifikasi by ID
 * @param {string} id - Klasifikasi ID (UUID)
 * @returns {object} Klasifikasi data
 */
router.get(url_start + "/klasifikasi/:id",
    authorizationMiddleware.apiKeyMiddleware,
    klasifikasiController.getKlasifikasiById);

/**
 * @route POST /klasifikasi
 * @description Create new klasifikasi
 * @param {string} nama - Nama klasifikasi
 * @requires JWT Token
 * @returns {object} Klasifikasi baru yang dibuat
 */
router.post(url_start + "/klasifikasi",
    authorizationMiddleware.apiKeyMiddleware,
    authorizationMiddleware.jwtMiddleware,
    klasifikasiController.createKlasifikasi);

/**
 * @route PUT /klasifikasi/:id
 * @description Update klasifikasi data
 * @param {string} id - Klasifikasi ID (UUID)
 * @body {string} nama - Nama klasifikasi baru
 * @requires JWT Token
 * @returns {object} Klasifikasi data yang diupdate
 */
router.put(url_start + "/klasifikasi/:id",
    authorizationMiddleware.apiKeyMiddleware,
    authorizationMiddleware.jwtMiddleware,
    klasifikasiController.updateKlasifikasi);

/**
 * @route DELETE /klasifikasi/:id
 * @description Delete klasifikasi by ID
 * @param {string} id - Klasifikasi ID (UUID)
 * @requires JWT Token
 * @returns {object} Success message
 */
router.delete(url_start + "/klasifikasi/:id",
    authorizationMiddleware.apiKeyMiddleware,
    authorizationMiddleware.jwtMiddleware,
    klasifikasiController.deleteKlasifikasi);

// ==================== PUTUSAN ROUTES ====================

/**
 * @route GET /putusan
 * @description Retrieve all putusan dengan pagination, search, dan filter by year
 * @query {number} page - Nomor halaman (default: 1)
 * @query {number} limit - Jumlah data per halaman (default: 10)
 * @query {string} search - Pencarian berdasarkan nomor atau amar putusan
 * @query {number} year - Filter berdasarkan tahun putusan (optional)
 * @returns {object} List putusan dengan relasi data dan pagination info
 */
router.get(url_start + "/putusan",
    authorizationMiddleware.apiKeyMiddleware,
    putusanController.getAllPutusan);

/**
 * @route GET /putusan/:id
 * @description Retrieve putusan by ID dengan semua relasi terkait
 * @param {string} id - Putusan ID (UUID)
 * @returns {object} Putusan data lengkap dengan hakim, panitera, terdakwa, dll
 */
router.get(url_start + "/putusan/:id",
    authorizationMiddleware.apiKeyMiddleware,
    putusanController.getPutusanById);

/**
 * @route POST /putusan
 * @description Create new putusan
 * @body {string} nomor - Nomor putusan
 * @body {string} tingkat_proses - Tingkat proses (default: first level)
 * @body {string} id_klasifikasi - ID klasifikasi (FK)
 * @body {string} id_kata_kunci - ID kata kunci (FK)
 * @body {date} tanggal_putusan - Tanggal putusan
 * @body {number} tahun - Tahun putusan
 * @body {date} tanggal_musyawarah - Tanggal musyawarah
 * @body {string} amar_putusan - Isi amar putusan (text)
 * @body {string} id_hakim_ketua - ID hakim ketua (FK)
 * @body {string} id_panitera - ID panitera (FK)
 * @body {string} id_penuntut_umum - ID penuntut umum (FK, optional)
 * @body {string} url_dokumen - URL dokumen putusan (optional)
 * @body {string} lembaga_id - ID lembaga
 * @requires JWT Token
 * @returns {object} Putusan baru yang dibuat
 */
router.post(url_start + "/putusan",
    authorizationMiddleware.apiKeyMiddleware,
    authorizationMiddleware.jwtMiddleware,
    putusanController.createPutusan);

/**
 * @route PUT /putusan/:id
 * @description Update putusan data
 * @param {string} id - Putusan ID (UUID)
 * @body {string} nomor - Nomor putusan (optional)
 * @body {string} tingkat_proses - Tingkat proses (optional)
 * @body {string} id_klasifikasi - ID klasifikasi (optional)
 * @body {string} id_kata_kunci - ID kata kunci (optional)
 * @body {date} tanggal_putusan - Tanggal putusan (optional)
 * @body {number} tahun - Tahun putusan (optional)
 * @body {date} tanggal_musyawarah - Tanggal musyawarah (optional)
 * @body {string} amar_putusan - Isi amar putusan (optional)
 * @body {string} id_hakim_ketua - ID hakim ketua (optional)
 * @body {string} id_panitera - ID panitera (optional)
 * @body {string} id_penuntut_umum - ID penuntut umum (optional)
 * @body {string} url_dokumen - URL dokumen putusan (optional)
 * @requires JWT Token
 * @returns {object} Putusan data yang diupdate
 */
router.put(url_start + "/putusan/:id",
    authorizationMiddleware.apiKeyMiddleware,
    authorizationMiddleware.jwtMiddleware,
    putusanController.updatePutusan);

/**
 * @route DELETE /putusan/:id
 * @description Delete putusan by ID
 * @param {string} id - Putusan ID (UUID)
 * @requires JWT Token
 * @returns {object} Success message
 */
router.delete(url_start + "/putusan/:id",
    authorizationMiddleware.apiKeyMiddleware,
    authorizationMiddleware.jwtMiddleware,
    putusanController.deletePutusan);

/**
 * @route POST /putusan/:id/upload
 * @description Upload dokumen putusan (PDF/DOC)
 * @param {string} id - Putusan ID (UUID)
 * @body {file} dokumen - File dokumen putusan (PDF/DOC/DOCX, max 10MB)
 * @requires JWT Token
 * @returns {object} Upload info dengan file path
 */
router.post(url_start + "/putusan/:id/upload",
    authorizationMiddleware.apiKeyMiddleware,
    authorizationMiddleware.jwtMiddleware,
    uploadPutusan.single('dokumen'),
    putusanController.uploadDokumen);

/**
 * @route GET /putusan/:id/download
 * @description Download dokumen putusan
 * @param {string} id - Putusan ID (UUID)
 * @returns {file} File dokumen putusan
 */
router.get(url_start + "/putusan/:id/download",
    authorizationMiddleware.apiKeyMiddleware,
    putusanController.downloadDokumen);

module.exports = router