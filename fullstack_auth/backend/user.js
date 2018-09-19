const { Router } = require("express");

const pool = require("./db");
const { hash, Session } = require("./helper");

const router = new Router();

router.get("/all", (req, res, next) => {
  pool.query("SELECT * FROM users", (err, data) => {
    if (err) {
      return next(err);
    }

    res.json(data.rows);
  });
});

const setSession = (username, res) => {
  const session = new Session(username);
  const sessionStr = session.toString();

  return new Promise((resolve, reject) =>
    pool.query(
      "UPDATE users SET session_id = $1 WHERE username_hash = $2",
      [session.id, hash(username)],
      (err, data) => {
        if (err) return reject(err);

        res.cookie("session_str", sessionStr, {
          expire: Date.now() + 3600000,
          httpOnly: true
          // secure: true //use with https during production;
        });

        resolve();
      }
    )
  );
};

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

            setSession(username, res)
              .then(() => {
                res.status(200).json({ message: "Successfully created user!" });
              })
              .catch(error => next(error));
          }
        );
      } else {
        res.status(409).json({ type: "error", messsage: "username taken" });
      }
    }
  );
});

module.exports = router;
