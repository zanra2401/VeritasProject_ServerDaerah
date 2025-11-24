
const express = require("express");
require("dotenv").config();
const router = require(__dirname + "/src/routes/router.js");

const app = express();


app.use(express.json());
app.use(router);


app.listen(process.env.PORT, () => {
    console.log("Server is starting on port " + process.env.PORT);
});

module.exports = app;