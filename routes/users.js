const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  db.query("SELECT nama FROM user", (err, results) => {
    if (err) {
      return res.status(500).send("Error retrieving user from database");
    }
    res.json(results);
  });
});

router.post("/new", (req, res) => {
  const isValid = false;
  if (isValid) {
    users.push({ firstName: req.body.name });
    res.redirect(`/users/${users.length - 1}`);
  } else {
    console.log("error");
    res.redirect(`/users/${users.length - 1}`);
  }
});

router
  .route("/:id")
  .get((req, res) => {
    res.send(`user get ${req.params.id}`);
  })
  .post((req, res) => {
    console.log(req.user);
    res.send(`user post ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`user update ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`user delete ${req.params.id}`);
  });

const users = [{ name: "kyle" }, { name: "selly" }];
router.param("id", (req, res, next, id) => {
  req.user = users[id];
  next();
});

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

module.exports = router;
