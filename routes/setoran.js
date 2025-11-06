const express = require("express");
const router = express.Router();
const mongoose=require('mongoose')
const Setoran = require("../models/setoran");
const {loadSetoranById, addSetoran}=require('../controllers/setoran_controller')
router
  .route("/")
  .get(loadSetoranById)
  .post(addSetoran);

module.exports = router;
