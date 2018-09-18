const express = require("express");
const pool = require("./db");

const app = express();

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

module.exports = app;
