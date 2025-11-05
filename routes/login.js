const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");

router.post("/", (req, res) => {
  const { email, password } = req.body;

  db.query(
    `SELECT id_user,email,nama,password,level from user where email=?`,
    [email],
    (err, result) => {
      if (err) {
        return res.status(500).send("Error retrieving user from database");
      }

      if (result.length === 0) {
        return res.status(404).send("User not found");
      }

      const user = result[0];
      bcrypt.compare(password, user.password, (err, same) => {
        if (err) {
          return res.status(500).send("Error comparing password");
        }

        if (!same) {
          return res.status(401).send("Incorrect passowrd");
        }

        return res.sendStatus(200)
      });
    }
  );
});

module.exports = router;
//nanti ganti paka bcrypt buat hash password kalo udah selesai fitur ganti password
