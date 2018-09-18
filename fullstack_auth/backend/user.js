const { Router } = require("express");
const SHA256 = require("crypto-js/sha256");

const pool = require("./db");
const { APP_SECRET } = require("./secret");

const router = new Router();

const hash = str => {
  return SHA256(`${APP_SECRET}${str}${APP_SECRET}`).toString();
};

router.get("/all", (req, res, next) => {
  pool.query("SELECT * FROM users", (err, data) => {
    if (err) {
      return next(err);
    }

    res.json(data.rows);
  });
});

router.post("/new", (req, res, next) => {
  const { username, password } = req.body;
  const usernameHash = hash(username);

  pool.query(
    "SELECT * FROM users WHERE username_hash =$1",
    [usernameHash],
    (err, data) => {
      if (err) return next(err);

      if (data.rows.length === 0) {
        //insert a new user
        pool.query(
          "INSERT INTO users(username_hash, password_hash) VALUES($1, $2)",
          [usernameHash, hash(password)],
          (qErr, qRes) => {
            if (qErr) return next(qErr);

            res.status(200).json({ message: "Successfully created user!" });
          }
        );
      } else {
        res.status(409).json({ type: "error", messsage: "username taken" });
      }
    }
  );
});

module.exports = router;
