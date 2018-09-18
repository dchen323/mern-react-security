const express = require("express");
const bodyParser = require("body-parser");

const pool = require("./db");

const app = express();

app.use(bodyParser.json());

/* Moved functionality to bash script
const port = 3000;
app.listen(port, () => console.log(`Listening on port: ${port}`));
*/

app.get("/user/all", (req, res, next) => {
  pool.query("SELECT * FROM users", (err, data) => {
    if (err) {
      return next(err);
    }

    res.json(data.rows);
  });
});

app.post("/user/new", (req, res, next) => {
  const { username, password } = req.body;

  pool.query(
    "SELECT * FROM users WHERE username =$1",
    [username],
    (err, data) => {
      if (err) return next(err);

      if (data.rows.length === 0) {
        //insert a new user
        pool.query(
          "INSERT INTO users(username, password) VALUES($1, $2)",
          [username, password],
          (q_err, q_res) => {
            if (q_err) return next(q_err);

            res.status(200).json({ message: "Successfully created user!" });
          }
        );
      } else {
        res.status(409).json({ type: "error", messsage: "username taken" });
      }
    }
  );
});

app.use((err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 404;

  res.status(err.statusCode).json({ type: "error", message: err.message });
});

module.exports = app;
