const express = require("express");
const authController = require(__dirname + "/../controllers/authController.js");
const terdakwaController = require(__dirname + "/../controllers/terdakwaController.js");
const authorizationMiddleware = require(__dirname + "/../middlewares/authorizationMiddleware.js");
// const requestMiddleware = require(__dirname + "/../middlewares/requestMiddleware.js");
const putusanController = require(__dirname + "/../controllers/putusanController.js");
const router = express.Router();

const url_start = `/api/v1/${process.env.LEMBAGA_ID}`;

// console.log(url_start);
// Putusan Route API
router.get(url_start + "/putusan/:id", 
    authorizationMiddleware.apiKeyMiddleware, 
    putusanController.getPutusanById);

router.post(url_start + "/putusan", 
    authorizationMiddleware.apiKeyMiddleware, 
    authorizationMiddleware.jwtMiddleware,
    putusanController.createPutusan);

router.put(url_start + "/putusan/:id",
    authorizationMiddleware.apiKeyMiddleware, 
    putusanController.updatePutusan);

router.delete(url_start + "/putusan/:id",
    authorizationMiddleware.apiKeyMiddleware, 
    putusanController.deletePutusan);

// Auth Route API
router.post(url_start + "/admin/login",
    authorizationMiddleware.apiKeyMiddleware, 
    authController.adminLogin);

// // Terdakwa Route
router.post(url_start + "/terdakwa",
    authorizationMiddleware.apiKeyMiddleware,
    terdakwaController.createTerdakwa
);

module.exports = router