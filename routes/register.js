const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");

router.post("/", (req, res) => {
  let { email, password, nama, level } = req.body;

  password = bcrypt.hash(password, 10, (err, encrypted) => {
    if (err) {
      return res.status(500).send("Error hashing password");
    }

    db.query(
      "insert ignore into user(email,password,nama,level) values (?,?,?,?)",
      [email, encrypted, nama, level],
      (err, result) => {
        if (err) {
          return res.status(500).send("Error inserting user into database");
        }

        return res.sendStatus(201)
      }
    );
  });
});

module.exports=router
