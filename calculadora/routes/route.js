const express = require("express");
const routerApp = express.Router();

const appCalc = require("../controller/ctlcalculadora");

routerApp.post("/", appCalc.fCalculo);

module.exports = routerApp;
