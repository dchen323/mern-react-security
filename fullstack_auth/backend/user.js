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

const setSessionCookie = (sessionStr, res) => {
  res.cookie("session_str", sessionStr, {
    expire: Date.now() + 3600000,
    httpOnly: true
    // secure: true //use with https during production;
  });
};

const setSession = (username, res, sessionId) => {
  let session, sessionStr;
  if (sessionId) {
    sessionStr = Session.dataToString(username, sessionId);
  } else {
    session = new Session(username);
    sessionStr = session.toString();
  }

  return new Promise((resolve, reject) => {
    if (sessionId) {
      setSessionCookie(sessionStr, res);
      resolve();
    } else {
      pool.query(
        "UPDATE users SET session_id = $1 WHERE username_hash = $2",
        [session.id, hash(username)],
        (err, data) => {
          if (err) return reject(err);

          setSessionCookie(sessionStr, res);
          resolve();
        }
      );
    }
  });
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

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  pool.query(
    "SELECT * FROM users WHERE username_hash = $1",
    [hash(username)],
    (err, data) => {
      if (err) return next(err);

      const user = data.rows[0];
      if (user && user.password_hash === hash(password)) {
        setSession(username, res, user.session_id)
          .then(() => {
            res.json({ message: "Successful Login!" });
          })
          .catch(error => next(error));
      } else {
        res
          .status(400)
          .json({ type: "error", message: "Incorrect username/password" });
      }
    }
  );
});

router.get("/logout", (req, res, next) => {
  const { username, id } = Session.parse(req.cookies.session_str);

  pool.query(
    "UPDATE users SET session_id = NULL WHERE username_hash =$1",
    [hash(username)],
    (err, data) => {
      if (err) return next(err);

      res.clearCookie("session_str");

      res.json({ message: "Successful logout" });
    }
  );
});

router.get("/authenticated", (req, res, next) => {
  const { username, id } = Session.parse(req.cookies.session_str);

  pool.query(
    "SELECT * FROM users WHERE username_hash = $1",
    [hash(username)],
    (err, data) => {
      if (err) return next(err);

      res.json({
        authenticated:
          Session.verify(req.cookies.session_str) &&
          data.rows[0].session_id === id
      });
    }
  );
});

module.exports = router;
